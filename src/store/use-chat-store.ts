import { create } from 'zustand'

interface ChatState {
  messages: any[]
  addMessage: (message: any) => void
  setMessages: (messages: any[]) => void
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  setMessages: (messages) => set({ messages }),
}))
