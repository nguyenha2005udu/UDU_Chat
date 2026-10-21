import { createContext, useContext } from 'react';
import type { Chat } from './data/chats';
export type Session = {
  account: string;
  login: (account: string) => void;
  logout: () => void;
  chats: Chat[];
  openChat: (id: string) => void;
  send: (id: string, text: string) => void;
};
export const ChatContext = createContext<Session | null>(null);
export function useChat() {
  const value = useContext(ChatContext);
  if (!value) {
    throw new Error('Missing chat provider');
  }
  return value;
}
