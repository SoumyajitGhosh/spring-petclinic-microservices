import { marked } from 'marked';
import type { ChatMessage } from './chatStorage';

export default function ChatBubble({ role, text }: ChatMessage) {
  const html = marked.parse(text, { async: false }) as string;
  return <div className={`chat-bubble ${role}`} dangerouslySetInnerHTML={{ __html: html }} />;
}
