/**
 * Chat API Tests
 */

import { NextRequest } from 'next/server';
import { POST, GET } from '../route';
import prisma from '@/lib/db/prisma';

// Mock dependencies
jest.mock('@/lib/db/prisma', () => ({
  __esModule: true,
  default: {
    chatConversation: {
      findFirst: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      count: jest.fn(),
    },
  },
}));

jest.mock('@anthropic-ai/sdk', () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
      messages: {
        create: jest.fn().mockResolvedValue({
          content: [{ type: 'text', text: 'Hello! How can I help you today?' }],
        }),
      },
    })),
  };
});

jest.mock('@/lib/middleware/rate-limit', () => ({
  chatRateLimiter: {
    checkLimit: jest.fn().mockResolvedValue({ allowed: true, remaining: 9, resetTime: Date.now() + 60000 }),
  },
}));

describe('Chat API - POST /api/chat', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new conversation and return AI response', async () => {
    const mockPrismaFindFirst = prisma.chatConversation.findFirst as jest.Mock;
    const mockPrismaCreate = prisma.chatConversation.create as jest.Mock;

    mockPrismaFindFirst.mockResolvedValue(null);
    mockPrismaCreate.mockResolvedValue({
      id: 'conv_123',
      sessionId: 'session_123',
      messages: JSON.stringify([
        { role: 'user', content: 'Hello', timestamp: new Date().toISOString() },
        { role: 'assistant', content: 'Hello! How can I help you today?', timestamp: new Date().toISOString() },
      ]),
      category: 'curious',
    });

    const request = new NextRequest('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        sessionId: 'session_123',
        message: 'Hello',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.data.message.content).toBeDefined();
    expect(mockPrismaCreate).toHaveBeenCalled();
  });

  it('should update existing conversation', async () => {
    const mockPrismaFindFirst = prisma.chatConversation.findFirst as jest.Mock;
    const mockPrismaUpdate = prisma.chatConversation.update as jest.Mock;

    mockPrismaFindFirst.mockResolvedValue({
      id: 'conv_123',
      sessionId: 'session_123',
      messages: JSON.stringify([
        { role: 'user', content: 'Hello', timestamp: new Date().toISOString() },
      ]),
    });

    mockPrismaUpdate.mockResolvedValue({
      id: 'conv_123',
      messages: JSON.stringify([
        { role: 'user', content: 'Hello', timestamp: new Date().toISOString() },
        { role: 'user', content: 'How are you?', timestamp: new Date().toISOString() },
        { role: 'assistant', content: 'I am doing well!', timestamp: new Date().toISOString() },
      ]),
    });

    const request = new NextRequest('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        sessionId: 'session_123',
        message: 'How are you?',
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(200);
    expect(mockPrismaUpdate).toHaveBeenCalled();
  });

  it('should categorize lead conversations', async () => {
    const mockPrismaFindFirst = prisma.chatConversation.findFirst as jest.Mock;
    const mockPrismaCreate = prisma.chatConversation.create as jest.Mock;

    mockPrismaFindFirst.mockResolvedValue(null);
    mockPrismaCreate.mockResolvedValue({
      id: 'conv_123',
      category: 'lead',
    });

    const request = new NextRequest('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        sessionId: 'session_123',
        message: 'I want to hire you for a project',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(mockPrismaCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          category: 'lead',
        }),
      })
    );
  });

  it('should validate input schema', async () => {
    const request = new NextRequest('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({
        // Missing required fields
        message: '',
      }),
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
  });
});

describe('Chat API - GET /api/chat', () => {
  it('should retrieve conversations by session ID', async () => {
    const mockPrismaFindMany = prisma.chatConversation.findMany as jest.Mock;
    const mockPrismaCount = prisma.chatConversation.count as jest.Mock;

    mockPrismaFindMany.mockResolvedValue([
      { id: 'conv_1', sessionId: 'session_123', category: 'curious' },
    ]);
    mockPrismaCount.mockResolvedValue(1);

    const request = new NextRequest('http://localhost:3000/api/chat?sessionId=session_123');

    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.data).toHaveLength(1);
    expect(data.meta.total).toBe(1);
  });

  it('should filter by category', async () => {
    const mockPrismaFindMany = prisma.chatConversation.findMany as jest.Mock;
    const mockPrismaCount = prisma.chatConversation.count as jest.Mock;

    mockPrismaFindMany.mockResolvedValue([
      { id: 'conv_1', category: 'lead' },
    ]);
    mockPrismaCount.mockResolvedValue(1);

    const request = new NextRequest('http://localhost:3000/api/chat?category=lead');

    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(mockPrismaFindMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ category: 'lead' }),
      })
    );
  });
});
