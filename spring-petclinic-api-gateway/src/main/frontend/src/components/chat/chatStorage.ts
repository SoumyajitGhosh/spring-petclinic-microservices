export interface ChatMessage {
  role: 'user' | 'bot';
  text: string;
}

const STORAGE_KEY = 'chatMessages';

export function loadChatMessages(): ChatMessage[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as ChatMessage[]) : [];
  } catch {
    return [];
  }
}

export function saveChatMessages(messages: ChatMessage[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}
