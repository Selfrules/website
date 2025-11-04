/**
 * Chat API Routes
 * Handles AI chatbot conversations
 */

import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import prisma from '@/lib/db/prisma';
import { createChatMessageSchema, getChatConversationsSchema } from '@/lib/validations/schemas';
import { handleApiError, formatSuccessResponse } from '@/lib/utils/errors';
import { chatRateLimiter } from '@/lib/middleware/rate-limit';
import { addCorsHeaders } from '@/lib/middleware/cors';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

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
 * GET /api/chat
 * Retrieve chat conversations
 */
export async function GET(req: NextRequest) {
  try {
    await chatRateLimiter.checkLimit(req);

    const { searchParams } = new URL(req.url);
    const params = {
      sessionId: searchParams.get('sessionId') || undefined,
      category: searchParams.get('category') || undefined,
      limit: parseInt(searchParams.get('limit') || '20'),
      offset: parseInt(searchParams.get('offset') || '0'),
    };

    const validatedParams = getChatConversationsSchema.parse(params);

    const where: any = {};
    if (validatedParams.sessionId) where.sessionId = validatedParams.sessionId;
    if (validatedParams.category) where.category = validatedParams.category;

    const [conversations, total] = await Promise.all([
      prisma.chatConversation.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: validatedParams.limit,
        skip: validatedParams.offset,
      }),
      prisma.chatConversation.count({ where }),
    ]);

    const response = NextResponse.json(
      formatSuccessResponse(conversations, undefined, {
        total,
        limit: validatedParams.limit,
        offset: validatedParams.offset,
      }),
      { status: 200 }
    );

    return addCorsHeaders(response, req);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * POST /api/chat
 * Send a message and get AI response
 */
export async function POST(req: NextRequest) {
  try {
    await chatRateLimiter.checkLimit(req);

    const body = await req.json();
    const validatedData = createChatMessageSchema.parse(body);

    // Retrieve or create conversation
    let conversation = await prisma.chatConversation.findFirst({
      where: { sessionId: validatedData.sessionId },
    });

    const messages = conversation?.messages as any[] || [];

    // Add user message
    const userMessage = {
      role: 'user',
      content: validatedData.message,
      timestamp: new Date().toISOString(),
    };
    messages.push(userMessage);

    // Prepare messages for Claude API
    const claudeMessages = messages
      .filter((m: any) => m.role === 'user' || m.role === 'assistant')
      .map((m: any) => ({
        role: m.role,
        content: m.content,
      }));

    // Get AI response
    const aiResponse = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: claudeMessages,
    });

    const assistantMessage = {
      role: 'assistant',
      content: aiResponse.content[0].type === 'text' ? aiResponse.content[0].text : '',
      timestamp: new Date().toISOString(),
    };
    messages.push(assistantMessage);

    // Auto-categorize conversation based on content
    const category = categorizeChatConversation(messages);

    // Update or create conversation
    if (conversation) {
      conversation = await prisma.chatConversation.update({
        where: { id: conversation.id },
        data: {
          messages,
          category,
          updatedAt: new Date(),
        },
      });
    } else {
      conversation = await prisma.chatConversation.create({
        data: {
          sessionId: validatedData.sessionId,
          userId: validatedData.userId,
          messages,
          category,
          metadata: validatedData.metadata,
        },
      });
    }

    const response = NextResponse.json(
      formatSuccessResponse({
        conversationId: conversation.id,
        message: assistantMessage,
      }),
      { status: 200 }
    );

    return addCorsHeaders(response, req);
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * Categorize conversation based on content
 */
function categorizeChatConversation(messages: any[]): string {
  const allContent = messages.map((m: any) => m.content.toLowerCase()).join(' ');

  // Simple keyword-based categorization
  const leadKeywords = ['hire', 'project', 'consultation', 'collaborate', 'work together'];
  const networkingKeywords = ['connect', 'network', 'coffee', 'meet', 'introduction'];

  const hasLeadIntent = leadKeywords.some(keyword => allContent.includes(keyword));
  const hasNetworkingIntent = networkingKeywords.some(keyword => allContent.includes(keyword));

  if (hasLeadIntent) return 'lead';
  if (hasNetworkingIntent) return 'networking';
  return 'curious';
}

export async function OPTIONS(req: NextRequest) {
  const response = new NextResponse(null, { status: 204 });
  return addCorsHeaders(response, req);
}
