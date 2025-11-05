import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/auth/admin';

const CLAUDE_API_KEY = process.env.ANTHROPIC_API_KEY;
const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';

// Mattia's brand voice and content guidelines
const CONTENT_GUIDELINES = `
You are a content creator for Mattia Cintura's portfolio blog. Follow these guidelines:

**Tone of Voice:**
- Pragmatic and direct (Romei's approach)
- Conversational and accessible (Toon's style)
- Purpose-driven storytelling (Sinek's "start with why")

**Writing Rules:**
1. Start with the problem, not the solution
2. Use everyday metaphors for complex concepts
3. Employ constructive irony to highlight issues
4. Create mental scenes instead of abstractions
5. Use sentence case (only initial capital)
6. Keep paragraphs to 3-4 lines max
7. Use "we" instead of "you should"

**Content Principles:**
- Focus on real problems and practical solutions
- Share failures and learnings, not just successes
- Avoid marketing buzzwords and empty superlatives
- Be honest about trade-offs and limitations
- Use specific examples and concrete metrics

**Examples:**
❌ "Implement robust authentication with JWT tokens"
✅ "We're solving the '3am password reset' problem - when users are locked out and frustrated"

❌ "Optimized performance metrics achieved excellence"
✅ "Cut payment times by 12%. How? Reduced clicks from 7 to 3. Sometimes the answer isn't complex."
`;

export async function POST(request: NextRequest) {
  try {
    // Check admin authentication
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      );
    }

    if (!CLAUDE_API_KEY) {
      return NextResponse.json(
        { error: 'Claude API key not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { prompt, context } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Build system prompt with context
    const systemPrompt = `${CONTENT_GUIDELINES}

**Article Context:**
- Title: ${context?.title || 'Not specified'}
- Category: ${context?.category || 'Not specified'}
- Language: ${context?.locale === 'it' ? 'Italian' : 'English'}

Generate content that fits this context and follows Mattia's brand voice.`;

    // Call Claude API
    const response = await fetch(CLAUDE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 2048,
        temperature: 0.7,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Claude API error:', error);
      return NextResponse.json(
        { error: 'AI generation failed' },
        { status: 500 }
      );
    }

    const data = await response.json();
    const generatedContent = data.content[0].text;

    return NextResponse.json({
      success: true,
      content: generatedContent,
      usage: {
        inputTokens: data.usage.input_tokens,
        outputTokens: data.usage.output_tokens,
      },
    });
  } catch (error) {
    console.error('AI generation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
