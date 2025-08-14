import { create } from 'zustand';

export interface ChatMessage {
    data: string;
    user: 'user' | 'AI';
    timestamp: string;
}

interface ChatState {
    messages: ChatMessage[];
    addMessage: (data: string, user: 'user' | 'AI') => void;
    clearChat: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
    messages: [
        {
            data: "Hello! I'm your AI assistant. How can I help you today?",
            user: 'AI',
            timestamp: new Date().toLocaleTimeString(),
        },
        {
            data: "Hi! Can you help me organize my thoughts?",
            user: 'user',
            timestamp: new Date().toLocaleTimeString(),
        },
        {
            data: "Of course! I'd be happy to help you organize your thoughts. What would you like to work on?",
            user: 'AI',
            timestamp: new Date().toLocaleTimeString(),
        },
    ],

    addMessage: (data: string, user: 'user' | 'AI') => {
        console.log('Adding chat message:', { data, user });
        const newMessage: ChatMessage = {
            data,
            user,
            timestamp: new Date().toLocaleTimeString(),
        };
        set((state) => ({ messages: [...state.messages, newMessage] }));
    },

    clearChat: () => {
        console.log('Clearing chat');
        set({ messages: [] });
    },
}));