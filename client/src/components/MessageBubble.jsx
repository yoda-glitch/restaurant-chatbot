import { useState } from 'react';
import axios from 'axios';
import KitchenIcon from './KitchenIcon';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://yodas-cuisine-api-91b448f69c3f.herokuapp.com';

function formatTime(ts) {
  const d = new Date(ts);
  return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
}

function PayNowButton() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handlePay() {
    setError('');
    setLoading(true);
    try {
      const deviceId = localStorage.getItem('deviceId');
      const res = await axios.post(`${API_BASE}/api/payment/initialize`, { deviceId });
      window.location.href = res.data.authorizationUrl;
    } catch {
      setError('Could not initialise payment. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ marginTop: '12px' }}>
      <button
        onClick={handlePay}
        disabled={loading}
        style={{
          width: '100%',
          background: '#1A1A2E',
          color: '#C8A96E',
          border: 'none',
          borderRadius: '8px',
          padding: '10px 14px',
          fontSize: '13px',
          fontWeight: 600,
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.6 : 1,
          letterSpacing: '0.01em',
        }}
      >
        {loading ? 'Redirecting...' : 'Pay Now'}
      </button>
      {error && (
        <p style={{ color: '#C0392B', fontSize: '12px', marginTop: '6px', marginBottom: 0 }}>
          {error}
        </p>
      )}
    </div>
  );
}

function renderBotText(text, type) {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    const trimmed = line.trim();
    const isCategoryLabel =
      type === 'menu' &&
      trimmed.length > 1 &&
      /^[A-Z][A-Z\s&,'/]+$/.test(trimmed);

    if (isCategoryLabel) {
      return (
        <span
          key={i}
          style={{
            display: 'block',
            color: '#C8A96E',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            fontSize: '12px',
            fontWeight: 500,
            marginTop: i > 0 ? '8px' : 0,
            marginBottom: '2px',
          }}
        >
          {trimmed}
        </span>
      );
    }

    return (
      <span
        key={i}
        style={{
          display: 'block',
          whiteSpace: 'pre-wrap',
          color: '#2D2D2D',
        }}
      >
        {line === '' ? ' ' : line}
      </span>
    );
  });
}

export default function MessageBubble({ message }) {
  const isBot = message.sender === 'bot';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isBot ? 'flex-start' : 'flex-end',
        gap: '4px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: '8px',
          maxWidth: '85%',
        }}
      >
        {/* Bot avatar — shown next to every bot message */}
        {isBot && (
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: '#1A1A2E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              alignSelf: 'flex-end',
            }}
          >
            <KitchenIcon size={14} color="#C8A96E" />
          </div>
        )}

        {/* Message bubble */}
        <div
          style={{
            background: isBot ? '#FFFFFF' : '#1A1A2E',
            border: isBot ? '0.5px solid #E8E4DF' : 'none',
            borderRadius: isBot ? '4px 16px 16px 16px' : '16px 4px 16px 16px',
            padding: '10px 14px',
            fontSize: '13px',
            lineHeight: '1.6',
            color: isBot ? '#2D2D2D' : '#FFFFFF',
          }}
        >
          {isBot ? (
            renderBotText(message.text, message.type)
          ) : (
            <p style={{ margin: 0, whiteSpace: 'pre-wrap', color: '#FFFFFF' }}>
              {message.text}
            </p>
          )}

          {isBot && message.type === 'payment' && message.data && <PayNowButton />}
        </div>
      </div>

      {/* Timestamp */}
      <span
        style={{
          fontSize: '11px',
          color: '#888780',
          paddingLeft: isBot ? '36px' : '0',
        }}
      >
        {formatTime(message.timestamp)}
      </span>
    </div>
  );
}
