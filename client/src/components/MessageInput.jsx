import { useState } from 'react';

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 2L11 13" stroke="#C8A96E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="#C8A96E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function MessageInput({ onSend, isTyping }) {
  const [value, setValue] = useState('');

  function handleSend() {
    const trimmed = value.trim();
    if (!trimmed || isTyping) return;
    onSend(trimmed);
    setValue('');
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSend();
  }

  const canSend = !isTyping && value.trim().length > 0;

  return (
    <div
      style={{
        background: '#FFFFFF',
        padding: '10px 12px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isTyping}
        placeholder="Type a number..."
        style={{
          flex: 1,
          background: '#F5F0EB',
          border: 'none',
          borderRadius: '999px',
          padding: '10px 16px',
          fontSize: '13px',
          color: '#2D2D2D',
          outline: 'none',
          opacity: isTyping ? 0.55 : 1,
        }}
      />
      <button
        onClick={handleSend}
        disabled={!canSend}
        aria-label="Send"
        style={{
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          background: '#1A1A2E',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: canSend ? 'pointer' : 'not-allowed',
          opacity: canSend ? 1 : 0.35,
          flexShrink: 0,
          padding: 0,
        }}
      >
        <SendIcon />
      </button>
    </div>
  );
}
