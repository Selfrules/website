/**
 * Chat Streaming API Route - FIREBASE VERSION
 * Handles streaming responses from Claude AI
 * Migrated from Prisma to Firestore
 */

import { NextRequest } from 'next/server';
import {
  COLLECTIONS,
  ChatConversation,
  queryDocumentsAdmin,
  createDocumentAdmin,
  updateDocumentAdmin,
} from '@/lib/firebase';
import { createChatMessageSchema, chatRateLimiter } from '@/lib/security';
import { RateLimitError } from '@/lib/utils/errors';
import { Timestamp } from 'firebase-admin/firestore';

// Lazy-load Anthropic SDK to reduce bundle size
async function getAnthropicClient() {
  const { default: Anthropic } = await import('@anthropic-ai/sdk');
  return new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });
}

const SYSTEM_PROMPT = `You are the digital twin of Mattia, a Product Manager with a unique background:
- 6 years in design: "Design without strategy is just decoration"
- 5 years in development: "Perfect code that nobody uses is useless"
- 4+ years in product: "I unify design, tech, and business"

PERSONALITY:
- Pragmatic like Romei: get straight to the point
- Accessible like Toon: zero unnecessary jargon
- Purpose-driven like Sinek: always start with why

RESPOND:
- With concrete examples from the background
- Using constructive irony for common problems
- Always proposing practical solutions
- Max 3-4 sentences per concept

TONE:
- Like an experienced colleague who has made your mistakes
- Never condescending, always helpful
- Focus on immediate practical value

DO NOT:
- Use empty buzzwords
- Give generic advice
- Be overly formal
- Reply with bullet lists (use prose)`;

/**
 * POST /api/chat/stream
 * Stream AI responses using Server-Sent Events
 */
export async function POST(req: NextRequest) {
  try {
    // Check rate limit
    const rateLimitResult = await chatRateLimiter.checkLimit(req);
    if (!rateLimitResult.success) {
      throw new RateLimitError('Rate limit exceeded');
    }

    const body = await req.json();
    const validatedData = createChatMessageSchema.parse(body);

    // Retrieve or create conversation
    const conversations = await queryDocumentsAdmin<ChatConversation>(
      COLLECTIONS.CHAT_CONVERSATIONS,
      [{ field: 'sessionId', operator: '==', value: validatedData.sessionId }],
      'createdAt',
      'desc',
      1
    );
    const conversation = conversations.length > 0 ? conversations[0] : null;

    const messages = conversation?.messages || [];

    // Add user message
    const userMessage = {
      role: 'user' as const,
      content: validatedData.message,
      timestamp: Timestamp.now(),
    };
    messages.push(userMessage);

    // Prepare messages for Claude API
    const claudeMessages = messages
      .filter((m: any) => m.role === 'user' || m.role === 'assistant')
      .map((m: any) => ({
        role: m.role,
        content: m.content,
      }));

    // Lazy-load Anthropic SDK
    const anthropic = await getAnthropicClient();

    // Create streaming response
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();

        try {
          const aiStream = await anthropic.messages.stream({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 1024,
            system: SYSTEM_PROMPT,
            messages: claudeMessages,
          });

          let fullResponse = '';

          aiStream.on('text', (text) => {
            fullResponse += text;
            // Send text chunk to client
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'text', content: text })}\n\n`));
          });

          aiStream.on('end', async () => {
            // Add assistant message to conversation
            const assistantMessage = {
              role: 'assistant' as const,
              content: fullResponse,
              timestamp: Timestamp.now(),
            };
            messages.push(assistantMessage);

            // Auto-categorize conversation
            const category = categorizeChatConversation(messages);

            // Update or create conversation
            if (conversation) {
              await updateDocumentAdmin<ChatConversation>(
                COLLECTIONS.CHAT_CONVERSATIONS,
                conversation.id,
                {
                  messages,
                  category,
                }
              );
            } else {
              await createDocumentAdmin<ChatConversation>(
                COLLECTIONS.CHAT_CONVERSATIONS,
                {
                  sessionId: validatedData.sessionId,
                  userId: validatedData.userId,
                  messages,
                  category,
                  metadata: validatedData.metadata,
                }
              );
            }

            // Send completion event
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ type: 'done', category })}\n\n`)
            );
            controller.close();
          });

          aiStream.on('error', (error) => {
            console.error('Stream error:', error);
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ type: 'error', message: 'Streaming failed' })}\n\n`)
            );
            controller.close();
          });
        } catch (error) {
          console.error('AI streaming error:', error);
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ type: 'error', message: 'AI service error' })}\n\n`)
          );
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      {
        status: error instanceof RateLimitError ? 429 : 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

/**
 * Categorize conversation based on content
 */
function categorizeChatConversation(messages: any[]): string {
  const allContent = messages.map((m: any) => m.content.toLowerCase()).join(' ');

  const leadKeywords = ['hire', 'project', 'consultation', 'collaborate', 'work together', 'proposal'];
  const networkingKeywords = ['connect', 'network', 'coffee', 'meet', 'introduction', 'event'];

  const hasLeadIntent = leadKeywords.some(keyword => allContent.includes(keyword));
  const hasNetworkingIntent = networkingKeywords.some(keyword => allContent.includes(keyword));

  if (hasLeadIntent) return 'lead';
  if (hasNetworkingIntent) return 'networking';
  return 'curious';
}

export async function OPTIONS(req: NextRequest) {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
