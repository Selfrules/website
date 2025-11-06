import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Message, ChatSession } from '@/types/integrations';

interface ChatStore {
  // State
  isOpen: boolean;
  currentSession: ChatSession | null;
  isStreaming: boolean;

  // Actions
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
  addMessage: (message: Message) => void;
  updateLastMessage: (content: string) => void;
  setStreaming: (streaming: boolean) => void;
  clearSession: () => void;
  loadSession: (session: ChatSession) => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      // Initial state
      isOpen: false,
      currentSession: null,
      isStreaming: false,

      // Actions
      openChat: () => set({ isOpen: true }),

      closeChat: () => set({ isOpen: false }),

      toggleChat: () => set((state) => ({ isOpen: !state.isOpen })),

      addMessage: (message) =>
        set((state) => {
          const session = state.currentSession || {
            id: crypto.randomUUID(),
            messages: [],
            createdAt: new Date(),
            updatedAt: new Date(),
          };

          return {
            currentSession: {
              ...session,
              messages: [...session.messages, message],
              updatedAt: new Date(),
            },
          };
        }),

      updateLastMessage: (content) =>
        set((state) => {
          if (!state.currentSession) return state;

          const messages = [...state.currentSession.messages];
          const lastMessage = messages[messages.length - 1];

          if (lastMessage) {
            lastMessage.content = content;
          }

          return {
            currentSession: {
              ...state.currentSession,
              messages,
              updatedAt: new Date(),
            },
          };
        }),

      setStreaming: (streaming) => set({ isStreaming: streaming }),

      clearSession: () =>
        set({
          currentSession: null,
          isStreaming: false,
        }),

      loadSession: (session) => set({ currentSession: session }),
    }),
    {
      name: 'chat-storage',
      partialize: (state) => ({ currentSession: state.currentSession }),
    }
  )
);
