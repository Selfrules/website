/**
 * Chat API Routes - FIREBASE VERSION
 * Migrated from Prisma to Firestore
 *
 * MIGRATION GUIDE:
 * 1. Replace prisma imports with Firebase Admin
 * 2. Replace prisma.chatConversation.findMany with queryDocumentsAdmin
 * 3. Replace prisma.chatConversation.create with createDocumentAdmin
 * 4. Replace prisma.chatConversation.update with updateDocumentAdmin
 * 5. JSON.stringify no longer needed - Firestore handles objects natively
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  COLLECTIONS,
  ChatConversation,
  ChatMessage,
  queryDocumentsAdmin,
  createDocumentAdmin,
  updateDocumentAdmin,
  countDocumentsAdmin
} from '@/lib/firebase';
import { createChatMessageSchema, getChatConversationsSchema, chatRateLimiter } from '@/lib/security';
import { handleApiError, formatSuccessResponse } from '@/lib/utils/errors';
import { addCorsHeaders } from '@/lib/middleware/cors';
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
 * GET /api/chat
 * Retrieve chat conversations
 *
 * MIGRATION CHANGES:
 * - prisma.chatConversation.findMany → queryDocumentsAdmin
 * - prisma.chatConversation.count → countDocumentsAdmin
 * - Filters now use array format for Firestore
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

    // Build Firestore filters
    const filters: Array<{ field: string; operator: FirebaseFirestore.WhereFilterOp; value: any }> = [];
    if (validatedParams.sessionId) {
      filters.push({ field: 'sessionId', operator: '==', value: validatedParams.sessionId });
    }
    if (validatedParams.category) {
      filters.push({ field: 'category', operator: '==', value: validatedParams.category });
    }

    // Execute queries in parallel
    const [conversations, total] = await Promise.all([
      queryDocumentsAdmin<ChatConversation>(
        COLLECTIONS.CHAT_CONVERSATIONS,
        filters,
        'createdAt',
        'desc',
        validatedParams.limit
      ),
      countDocumentsAdmin(COLLECTIONS.CHAT_CONVERSATIONS, filters),
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
 *
 * MIGRATION CHANGES:
 * - prisma.chatConversation.findFirst → queryDocumentsAdmin with limit 1
 * - prisma.chatConversation.create → createDocumentAdmin
 * - prisma.chatConversation.update → updateDocumentAdmin
 * - JSON.stringify/parse removed: Firestore handles arrays natively
 * - Date objects → Timestamp for Firestore compatibility
 */
export async function POST(req: NextRequest) {
  try {
    await chatRateLimiter.checkLimit(req);

    const body = await req.json();
    const validatedData = createChatMessageSchema.parse(body);

    // Retrieve existing conversation
    const existingConversations = await queryDocumentsAdmin<ChatConversation>(
      COLLECTIONS.CHAT_CONVERSATIONS,
      [{ field: 'sessionId', operator: '==', value: validatedData.sessionId }],
      undefined,
      'desc',
      1
    );

    const conversation = existingConversations[0] || null;

    // Get existing messages (no JSON.parse needed - Firestore returns arrays)
    const messages: ChatMessage[] = conversation?.messages || [];

    // Add user message
    const userMessage: ChatMessage = {
      role: 'user',
      content: validatedData.message,
      timestamp: Timestamp.now(),
    };
    messages.push(userMessage);

    // Prepare messages for Claude API
    const claudeMessages = messages
      .filter((m) => m.role === 'user' || m.role === 'assistant')
      .map((m) => ({
        role: m.role,
        content: m.content,
      }));

    // Get AI response (lazy-load Anthropic SDK)
    const anthropic = await getAnthropicClient();
    const aiResponse = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: claudeMessages,
    });

    const assistantMessage: ChatMessage = {
      role: 'assistant',
      content: aiResponse.content[0].type === 'text' ? aiResponse.content[0].text : '',
      timestamp: Timestamp.now(),
    };
    messages.push(assistantMessage);

    // Auto-categorize conversation
    const category = categorizeChatConversation(messages);

    let updatedConversation: ChatConversation;

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
      updatedConversation = {
        ...conversation,
        messages,
        category,
        updatedAt: Timestamp.now(),
      };
    } else {
      updatedConversation = await createDocumentAdmin<ChatConversation>(
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

    const response = NextResponse.json(
      formatSuccessResponse({
        conversationId: updatedConversation.id,
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
function categorizeChatConversation(messages: ChatMessage[]): string {
  const allContent = messages.map((m) => m.content.toLowerCase()).join(' ');

  // Simple keyword-based categorization
  const leadKeywords = ['hire', 'project', 'consultation', 'collaborate', 'work together'];
  const networkingKeywords = ['connect', 'network', 'coffee', 'meet', 'introduction'];

  const hasLeadIntent = leadKeywords.some((keyword) => allContent.includes(keyword));
  const hasNetworkingIntent = networkingKeywords.some((keyword) => allContent.includes(keyword));

  if (hasLeadIntent) return 'lead';
  if (hasNetworkingIntent) return 'networking';
  return 'curious';
}

export async function OPTIONS(req: NextRequest) {
  const response = new NextResponse(null, { status: 204 });
  return addCorsHeaders(response, req);
}
