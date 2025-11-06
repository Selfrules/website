import { useMutation } from '@tanstack/react-query';
import { useChatStore } from '@/lib/stores/chatStore';
import type { Message, ChatStreamResponse } from '@/types/integrations';

interface SendMessageOptions {
  message: string;
  sessionId?: string;
}

export function useChatStream() {
  const { addMessage, updateLastMessage, setStreaming } = useChatStore();

  return useMutation({
    mutationFn: async ({ message, sessionId }: SendMessageOptions) => {
      // Add user message immediately
      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: 'user',
        content: message,
        timestamp: new Date(),
      };
      addMessage(userMessage);

      // Initialize assistant message
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: '',
        timestamp: new Date(),
      };
      addMessage(assistantMessage);

      setStreaming(true);

      // Call streaming API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, sessionId }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('No response stream');
      }

      let fullContent = '';

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter((line) => line.trim());

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data: ChatStreamResponse = JSON.parse(line.slice(6));

              if (data.error) {
                throw new Error(data.error);
              }

              fullContent += data.content;
              updateLastMessage(fullContent);

              if (data.done) {
                setStreaming(false);
                return fullContent;
              }
            } catch (e) {
              console.error('Failed to parse stream chunk:', e);
            }
          }
        }
      }

      setStreaming(false);
      return fullContent;
    },
    onError: (error) => {
      setStreaming(false);
      console.error('Chat error:', error);
    },
  });
}
