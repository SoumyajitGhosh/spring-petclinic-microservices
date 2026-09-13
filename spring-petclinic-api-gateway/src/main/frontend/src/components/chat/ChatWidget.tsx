import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { sendChatMessage } from '../../api/genai';
import { ChatMessage, loadChatMessages, saveChatMessages } from './chatStorage';
import ChatBubble from './ChatBubble';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>(() => loadChatMessages());
  const [input, setInput] = useState('');
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => saveChatMessages(messages);
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [messages]);

  useEffect(() => {
    saveChatMessages(messages);
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    const query = input.trim();
    if (!query) return;

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: query }]);

    try {
      const responseText = await sendChatMessage(query);
      setMessages((prev) => [...prev, { role: 'bot', text: responseText }]);
    } catch (err) {
      console.error('Error:', err);
      setMessages((prev) => [...prev, { role: 'bot', text: 'Chat is currently unavailable' }]);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      void handleSend();
    }
  };

  return (
    <div className={`chatbox${isOpen ? '' : ' minimized'}`} id="chatbox">
      <button className="chatbox-header" onClick={() => setIsOpen((open) => !open)}>
        Chat with Us!
      </button>
      <div className="chatbox-content" id="chatbox-content">
        <div className="chatbox-messages" id="chatbox-messages" ref={messagesRef}>
          {messages.map((message, i) => (
            <ChatBubble key={i} role={message.role} text={message.text} />
          ))}
        </div>
        <div className="chatbox-footer">
          <input
            type="text"
            id="chatbox-input"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={() => void handleSend()}>Send</button>
        </div>
      </div>
    </div>
  );
}
