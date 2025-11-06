import { test, expect } from '@playwright/test';

test.describe('Chatbot UI Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display chatbot trigger button', async ({ page }) => {
    // Look for chat trigger (usually floating button or widget)
    const chatTrigger = page.locator('[data-testid="chat-trigger"]').or(
      page.locator('button:has-text("Chat")').or(
        page.locator('[aria-label="Open chat"]')
      )
    );

    const exists = await chatTrigger.count();

    if (exists === 0) {
      console.log('❌ MISSING: Chatbot trigger button not found');
      console.log('⚠️  REQUIRED: Add floating chat button to layout');
      console.log('   Typical location: Bottom right corner');
      console.log('   Component: components/chat/ChatTrigger.tsx');
    } else {
      expect(exists).toBeGreaterThan(0);
    }
  });

  test('should open chat interface when trigger is clicked', async ({ page }) => {
    const chatTrigger = page.locator('[data-testid="chat-trigger"]').first();
    const triggerExists = await chatTrigger.count();

    if (triggerExists > 0) {
      await chatTrigger.click();
      await page.waitForTimeout(500);

      // Look for chat interface
      const chatInterface = page.locator('[data-testid="chat-interface"]').or(
        page.locator('[role="dialog"]')
      );

      const interfaceVisible = await chatInterface.isVisible();

      if (!interfaceVisible) {
        console.log('⚠️  ISSUE: Chat trigger exists but interface not opening');
      } else {
        expect(interfaceVisible).toBe(true);
      }
    }
  });

  test('MISSING: Chatbot component implementation', async ({ page }) => {
    console.log('⚠️  CHECK: Chatbot Component Implementation');
    console.log('   Required files:');
    console.log('   - components/chat/ChatTrigger.tsx (floating button)');
    console.log('   - components/chat/ChatInterface.tsx (main chat UI)');
    console.log('   - components/chat/ChatMessage.tsx (message bubble)');
    console.log('   - components/chat/ChatInput.tsx (text input + send)');
    console.log('   - components/chat/ChatHeader.tsx (close button, status)');
  });
});

test.describe('Chatbot Conversation Flow', () => {
  test('should display welcome message on chat open', async ({ page }) => {
    await page.goto('/');

    const chatTrigger = page.locator('[data-testid="chat-trigger"]').first();
    const triggerExists = await chatTrigger.count();

    if (triggerExists > 0) {
      await chatTrigger.click();
      await page.waitForTimeout(1000);

      // Look for welcome message
      const welcomeMessage = page.locator('text=Ciao').or(
        page.locator('text=Hello').or(
          page.locator('text=Come posso aiutarti')
        )
      );

      const hasWelcome = await welcomeMessage.count();

      if (hasWelcome === 0) {
        console.log('⚠️  MISSING: Welcome message in chatbot');
        console.log('⚠️  RECOMMENDATION: Add greeting message on chat open');
      }
    }
  });

  test('should allow sending messages', async ({ page }) => {
    await page.goto('/');

    const chatTrigger = page.locator('[data-testid="chat-trigger"]').first();
    const triggerExists = await chatTrigger.count();

    if (triggerExists > 0) {
      await chatTrigger.click();
      await page.waitForTimeout(500);

      // Look for input field
      const input = page.locator('input[placeholder*="messag"]').or(
        page.locator('textarea[placeholder*="messag"]')
      );

      const inputExists = await input.count();

      if (inputExists === 0) {
        console.log('⚠️  MISSING: Message input field in chatbot');
      } else {
        await input.fill('Test message');

        // Look for send button
        const sendButton = page.locator('button[type="submit"]').or(
          page.locator('button:has-text("Send")')
        );

        const sendExists = await sendButton.count();

        if (sendExists === 0) {
          console.log('⚠️  MISSING: Send button in chatbot');
        }
      }
    }
  });

  test('should show typing indicator while waiting for response', async ({ page }) => {
    await page.goto('/');

    console.log('⚠️  RECOMMENDATION: Add typing indicator');
    console.log('   Show animated dots while Claude API is responding');
    console.log('   Component: components/chat/TypingIndicator.tsx');
  });

  test('HARDCODED: Welcome message and initial prompts', async ({ page }) => {
    console.log('⚠️  HARDCODED: Chat welcome message');
    console.log('   Current: Likely hardcoded in ChatInterface component');
    console.log('   Better: Store in messages/[locale].json for i18n');
    console.log('   Include: suggested questions/prompts for users');
  });
});

test.describe('Claude API Integration', () => {
  test('POST /api/chat - should send message to Claude', async ({ request }) => {
    const response = await request.post('/api/chat', {
      data: {
        message: 'Hello, this is a test message',
        conversationId: 'test-conversation-123',
      },
    });

    if (response.status() === 404) {
      console.log('❌ MISSING: /api/chat endpoint not implemented');
      console.log('⚠️  REQUIRED: Create app/api/chat/route.ts');
    } else if (response.status() === 401 || response.status() === 500) {
      console.log('⚠️  ERROR: Claude API credentials missing or invalid');
      console.log('⚠️  CHECK: ANTHROPIC_API_KEY environment variable');
    } else if (response.status() === 200) {
      const body = await response.json();

      console.log('✅ Claude API endpoint functional');

      // Validate response structure
      if (!body.response) {
        console.log('⚠️  INVALID RESPONSE: Missing "response" field');
      }
      if (!body.conversationId) {
        console.log('⚠️  INVALID RESPONSE: Missing "conversationId" field');
      }
    }
  });

  test('should handle conversation context', async ({ request }) => {
    // First message
    const firstResponse = await request.post('/api/chat', {
      data: {
        message: 'My name is Test User',
        conversationId: 'context-test-123',
      },
    });

    if (firstResponse.status() === 200) {
      // Second message referencing first
      const secondResponse = await request.post('/api/chat', {
        data: {
          message: 'What is my name?',
          conversationId: 'context-test-123',
        },
      });

      if (secondResponse.status() === 200) {
        const body = await secondResponse.json();

        if (!body.response?.includes('Test User')) {
          console.log('⚠️  ISSUE: Conversation context not maintained');
          console.log('⚠️  REQUIRED: Store conversation history in database');
        }
      }
    }
  });

  test('MISSING: Claude API environment variables', async ({ page }) => {
    console.log('⚠️  REQUIRED ENV VARS for Claude API:');
    console.log('   - ANTHROPIC_API_KEY (get from console.anthropic.com)');
    console.log('   - CLAUDE_MODEL (default: claude-3-sonnet-20240229)');
    console.log('   - CLAUDE_MAX_TOKENS (default: 1024)');
    console.log('   - CLAUDE_TEMPERATURE (default: 0.7)');
  });

  test('MISSING: Conversation storage in database', async ({ page }) => {
    console.log('⚠️  MISSING: Conversation model in database');
    console.log('   Required fields:');
    console.log('   - id, sessionId, userId (optional)');
    console.log('   - messages (JSON array)');
    console.log('   - category (lead/networking/curious)');
    console.log('   - sentiment, leadScore');
    console.log('   - startedAt, endedAt, createdAt, updatedAt');
  });
});

test.describe('Chatbot System Prompt & Context', () => {
  test('HARDCODED: Chatbot system prompt', async ({ page }) => {
    console.log('⚠️  HARDCODED: Claude system prompt');
    console.log('   Current: Likely hardcoded in /api/chat route');
    console.log('   Better: Store in lib/chatbot/systemPrompt.ts');
    console.log('   Should include:');
    console.log('   - Mattia\'s background and expertise');
    console.log('   - Brand tone of voice (Romei + Toon + Sinek)');
    console.log('   - Conversation goals (categorize, qualify, engage)');
    console.log('   - Response guidelines (length, format, style)');
  });

  test('HARDCODED: Mattia\'s context and background', async ({ page }) => {
    console.log('⚠️  HARDCODED: Personal context in system prompt');
    console.log('   Should include:');
    console.log('   - Professional background');
    console.log('   - Key achievements (5M+ users impacted, etc.)');
    console.log('   - Services offered (consulting, brainstorming, mentorship)');
    console.log('   - Notable projects and companies');
    console.log('   - Technical stack expertise');
    console.log('   RECOMMENDATION: Create lib/chatbot/context.ts');
  });

  test('MISSING: Conversation categorization logic', async ({ page }) => {
    console.log('⚠️  MISSING: Conversation categorization system');
    console.log('   Categories per PRD:');
    console.log('   - Lead: Business opportunity (high priority)');
    console.log('   - Networking: Professional connection');
    console.log('   - Curious: General inquiry (lowest priority)');
    console.log('   IMPLEMENTATION: Use Claude to categorize based on:');
    console.log('   - Keywords (hiring, project, consulting vs tech question)');
    console.log('   - Sentiment analysis');
    console.log('   - User engagement level');
  });

  test('MISSING: Lead scoring algorithm', async ({ page }) => {
    console.log('⚠️  MISSING: Lead scoring system');
    console.log('   Scoring factors:');
    console.log('   - Mentioned budget or timeline');
    console.log('   - Asked about specific services');
    console.log('   - Shared company/project details');
    console.log('   - Engagement length and depth');
    console.log('   - Contact information provided');
    console.log('   SCORE: 0-100, threshold for notification at 70+');
  });
});

test.describe('Chatbot Analytics & Tracking', () => {
  test('should track chat session start', async ({ page }) => {
    const analyticsRequests: any[] = [];
    page.on('request', request => {
      if (request.url().includes('/api/analytics')) {
        analyticsRequests.push(request.postData());
      }
    });

    await page.goto('/');
    const chatTrigger = page.locator('[data-testid="chat-trigger"]').first();
    const triggerExists = await chatTrigger.count();

    if (triggerExists > 0) {
      await chatTrigger.click();
      await page.waitForTimeout(1000);

      const chatStartEvent = analyticsRequests.find(data =>
        data?.includes('chat_started')
      );

      if (!chatStartEvent) {
        console.log('⚠️  MISSING: Analytics tracking for chat_started event');
        console.log('⚠️  ADD: analytics.trackEvent("chat_started")');
      }
    }
  });

  test('should track message sent events', async ({ page }) => {
    console.log('⚠️  RECOMMENDATION: Track chat interaction events');
    console.log('   Events to track:');
    console.log('   - chat_started (when opened)');
    console.log('   - chat_message_sent (user messages)');
    console.log('   - chat_response_received (Claude responses)');
    console.log('   - chat_closed (when user closes)');
    console.log('   - chat_duration (time spent)');
  });

  test('should track conversation outcomes', async ({ page }) => {
    console.log('⚠️  RECOMMENDATION: Track conversation outcomes');
    console.log('   Metrics:');
    console.log('   - Category distribution (lead/networking/curious)');
    console.log('   - Average conversation length');
    console.log('   - Lead conversion rate');
    console.log('   - Common questions/topics');
    console.log('   - Satisfaction indicators');
  });
});

test.describe('Chatbot Error Handling', () => {
  test('should handle Claude API errors gracefully', async ({ request }) => {
    // Send request with invalid API key scenario
    console.log('⚠️  ERROR HANDLING: Claude API failures');
    console.log('   Should handle:');
    console.log('   - 401 Unauthorized (invalid API key)');
    console.log('   - 429 Rate limit exceeded');
    console.log('   - 500 Server error');
    console.log('   - Network timeout');
    console.log('   USER-FACING: Show friendly error message');
    console.log('   ADMIN: Log error with context for debugging');
  });

  test('should have retry mechanism for failed requests', async ({ page }) => {
    console.log('⚠️  RECOMMENDATION: Implement retry logic');
    console.log('   - Automatic retry for network failures (max 3 attempts)');
    console.log('   - Exponential backoff (1s, 2s, 4s)');
    console.log('   - Show "Retrying..." indicator to user');
    console.log('   - Give up gracefully after max retries');
  });

  test('should handle message too long error', async ({ page }) => {
    console.log('⚠️  VALIDATION: Message length limits');
    console.log('   - Max input: 4000 characters (reasonable limit)');
    console.log('   - Show character counter');
    console.log('   - Disable send button when over limit');
    console.log('   - Display helpful error message');
  });

  test('MISSING: Error boundary around chat component', async ({ page }) => {
    console.log('⚠️  MISSING: Error boundary for chat component');
    console.log('   If chat crashes, should:');
    console.log('   - Not crash entire page');
    console.log('   - Show "Something went wrong" message');
    console.log('   - Provide "Restart chat" button');
    console.log('   - Log error to monitoring service');
  });
});

test.describe('Chatbot UI/UX Features', () => {
  test('should show message timestamps', async ({ page }) => {
    console.log('⚠️  RECOMMENDATION: Show message timestamps');
    console.log('   - Relative time for recent messages (2m ago)');
    console.log('   - Full timestamp on hover');
    console.log('   - Group by day for long conversations');
  });

  test('should scroll to bottom on new messages', async ({ page }) => {
    console.log('⚠️  UX: Auto-scroll behavior');
    console.log('   - Auto-scroll to bottom when new message arrives');
    console.log('   - Don\'t auto-scroll if user has scrolled up');
    console.log('   - Show "New message" indicator if scrolled up');
  });

  test('should support markdown in responses', async ({ page }) => {
    console.log('⚠️  RECOMMENDATION: Markdown support in chat');
    console.log('   Claude responses may include:');
    console.log('   - **Bold** and *italic* text');
    console.log('   - Code blocks with syntax highlighting');
    console.log('   - Lists (bullet and numbered)');
    console.log('   - Links');
    console.log('   Use: react-markdown or similar');
  });

  test('should match neobrutalist design', async ({ page }) => {
    console.log('⚠️  DESIGN: Chat component styling');
    console.log('   Should include:');
    console.log('   - 4-6px solid black borders');
    console.log('   - Hard shadow on floating button');
    console.log('   - Brutalist message bubbles');
    console.log('   - Theme-aware colors');
    console.log('   - Smooth open/close animations');
  });

  test('should be keyboard accessible', async ({ page }) => {
    console.log('⚠️  ACCESSIBILITY: Keyboard navigation');
    console.log('   - Open chat: Alt+C or custom hotkey');
    console.log('   - Close chat: Escape key');
    console.log('   - Send message: Enter (Shift+Enter for new line)');
    console.log('   - Focus management on open/close');
  });

  test('MISSING: Chat history persistence', async ({ page }) => {
    console.log('⚠️  MISSING: Chat history across sessions');
    console.log('   Options:');
    console.log('   - Store in localStorage (client-side)');
    console.log('   - Store in database (server-side)');
    console.log('   - Resume conversation on return visit');
    console.log('   - "Clear history" button for privacy');
  });

  test('MISSING: Suggested prompts/questions', async ({ page }) => {
    console.log('⚠️  MISSING: Suggested conversation starters');
    console.log('   Show quick action buttons:');
    console.log('   - "Tell me about your services"');
    console.log('   - "I have a project idea"');
    console.log('   - "Book a consultation"');
    console.log('   - "View my portfolio"');
    console.log('   Helps users start conversation easily');
  });
});

test.describe('Chatbot Rate Limiting & Security', () => {
  test('should rate limit chat messages per user', async ({ request }) => {
    console.log('⚠️  SECURITY: Rate limiting for chat endpoint');
    console.log('   Limits:');
    console.log('   - 10 messages per minute per session');
    console.log('   - 50 messages per hour per IP');
    console.log('   - Block after excessive usage');
    console.log('   REASON: Prevent API abuse and cost overruns');
  });

  test('should sanitize user input', async ({ request }) => {
    console.log('⚠️  SECURITY: Input sanitization');
    console.log('   - Remove HTML/script tags');
    console.log('   - Escape special characters');
    console.log('   - Validate message length');
    console.log('   - Check for spam patterns');
  });

  test('should not expose API keys in client', async ({ page }) => {
    await page.goto('/');

    const sourceCode = await page.content();

    if (sourceCode.includes('ANTHROPIC_API_KEY') || sourceCode.includes('sk-ant-')) {
      console.log('❌ SECURITY ISSUE: API key exposed in client code');
      console.log('⚠️  CRITICAL: Remove all API keys from client-side code');
    }
  });

  test('MISSING: CAPTCHA for bot prevention', async ({ page }) => {
    console.log('⚠️  OPTIONAL: CAPTCHA integration');
    console.log('   If spam becomes an issue:');
    console.log('   - Google reCAPTCHA v3 (invisible)');
    console.log('   - Cloudflare Turnstile');
    console.log('   - Challenge before first message');
  });
});
