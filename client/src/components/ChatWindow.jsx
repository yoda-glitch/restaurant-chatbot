import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import TypingIndicator from './TypingIndicator';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

function makeMessage(sender, response) {
  return {
    id: crypto.randomUUID(),
    sender,
    text: response.text,
    type: response.type,
    timestamp: new Date(),
    data: response.data ?? null,
  };
}

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [deviceId, setDeviceId] = useState('');
  const bottomRef = useRef(null);

  // On mount: resolve deviceId and send init message to get the welcome response
  useEffect(() => {
    let id = localStorage.getItem('deviceId');
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem('deviceId', id);
    }
    setDeviceId(id);

    axios
      .post(`${API_BASE}/api/chat/message`, { deviceId: id, message: 'init' })
      .then((res) => {
        setMessages([makeMessage('bot', res.data.response)]);
      })
      .catch(() => {
        setMessages([
          makeMessage('bot', {
            text: '⚠️ Could not connect to the server. Please try again later.',
            type: 'text',
            data: null,
          }),
        ]);
      });
  }, []);

  // Auto-scroll to bottom whenever messages update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  async function sendMessage(text) {
    // Show the user's message immediately
    setMessages((prev) => [
      ...prev,
      makeMessage('user', { text, type: 'text', data: null }),
    ]);

    setIsTyping(true);

    // Simulate a short typing delay so the bot feels natural
    await new Promise((r) => setTimeout(r, 800));

    try {
      const res = await axios.post(`${API_BASE}/api/chat/message`, {
        deviceId,
        message: text,
      });
      setMessages((prev) => [...prev, makeMessage('bot', res.data.response)]);
    } catch {
      setMessages((prev) => [
        ...prev,
        makeMessage('bot', {
          text: '⚠️ Something went wrong. Please try again.',
          type: 'text',
          data: null,
        }),
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white shadow-lg">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 font-bold text-lg shrink-0">
        🍽️ Yoda&apos;s Cuisine
      </div>

      {/* Scrollable messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* Fixed input bar */}
      <MessageInput onSend={sendMessage} isTyping={isTyping} />
    </div>
  );
}
