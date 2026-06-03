import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import TypingIndicator from './TypingIndicator';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://yodas-cuisine-api-91b448f69c3f.herokuapp.com';

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

function KitchenIcon({ size = 20, color = '#1A1A2E' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 2v7c0 1.1.9 2 2 2h4v11" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 2v3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M5 2v3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 2v3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M17 2a5 5 0 0 1 5 5v1h-5v11" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 8h5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const QUICK_ACTIONS_ROW1 = [
  { num: '1', label: 'Place order' },
  { num: '99', label: 'Checkout' },
  { num: '98', label: 'History' },
];

const QUICK_ACTION_ROW2 = { num: '97', label: 'Current order' };

function QuickButton({ num, label, isCancel = false, onClick }) {
  return (
    <button
      onClick={() => onClick(num)}
      style={{
        background: '#F5F0EB',
        border: `0.5px solid ${isCancel ? '#E8E4DF' : '#C8A96E'}`,
        borderRadius: '8px',
        padding: '8px 6px 9px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '5px',
        cursor: 'pointer',
        width: '100%',
        outline: 'none',
      }}
    >
      <span
        style={{
          background: isCancel ? '#E8E4DF' : '#1A1A2E',
          color: isCancel ? '#888780' : '#C8A96E',
          width: '18px',
          height: '18px',
          borderRadius: '4px',
          fontSize: '10px',
          fontWeight: 600,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          lineHeight: 1,
          flexShrink: 0,
        }}
      >
        {num}
      </span>
      <span
        style={{
          fontSize: '11px',
          fontWeight: 500,
          color: isCancel ? '#888780' : '#1A1A2E',
          lineHeight: 1.3,
          textAlign: 'center',
        }}
      >
        {label}
      </span>
    </button>
  );
}

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [deviceId, setDeviceId] = useState('');
  const bottomRef = useRef(null);

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
            text: 'Could not connect to the server. Please try again later.',
            type: 'text',
            data: null,
          }),
        ]);
      });
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  async function sendMessage(text) {
    setMessages((prev) => [
      ...prev,
      makeMessage('user', { text, type: 'text', data: null }),
    ]);

    setIsTyping(true);
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
          text: 'Something went wrong. Please try again.',
          type: 'text',
          data: null,
        }),
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <div
      style={{ background: '#F5F0EB', fontFamily: 'system-ui, -apple-system, sans-serif' }}
      className="flex flex-col h-screen max-w-md mx-auto"
    >
      {/* Header */}
      <div
        style={{ background: '#1A1A2E', padding: '12px 16px' }}
        className="shrink-0 flex items-center gap-3"
      >
        <div
          style={{
            background: '#C8A96E',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <KitchenIcon size={20} color="#1A1A2E" />
        </div>
        <div>
          <p style={{ color: '#FFFFFF', fontWeight: 500, fontSize: '15px', margin: 0 }}>
            Restaurant Chatbot
          </p>
          <p style={{ color: '#C8A96E', fontSize: '12px', margin: '2px 0 0' }}>
            Online • Ready to take your order
          </p>
        </div>
      </div>

      {/* Scrollable chat area */}
      <div
        className="flex-1 overflow-y-auto"
        style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}
      >
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* Fixed bottom: quick action buttons + input bar */}
      <div className="shrink-0" style={{ background: '#FFFFFF', borderTop: '1px solid #E8E4DF' }}>
        {/* Quick action buttons */}
        <div style={{ padding: '10px 12px 6px' }}>
          {/* Row 1: 3 columns */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '6px',
              marginBottom: '6px',
            }}
          >
            {QUICK_ACTIONS_ROW1.map((action) => (
              <QuickButton key={action.num} {...action} onClick={sendMessage} />
            ))}
          </div>
          {/* Row 2: 2-column grid, 97 in first column */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '6px',
              marginBottom: '6px',
            }}
          >
            <QuickButton {...QUICK_ACTION_ROW2} onClick={sendMessage} />
          </div>
          {/* Cancel: full width */}
          <QuickButton num="0" label="Cancel order" isCancel onClick={sendMessage} />
        </div>

        <MessageInput onSend={sendMessage} isTyping={isTyping} />
      </div>
    </div>
  );
}
