import { useState } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

function formatTime(ts) {
  const d = new Date(ts);
  return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
}

function PayNowButton({ data }) {
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
      setError('❌ Could not initialise payment. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-3">
      <button
        onClick={handlePay}
        disabled={loading}
        className="w-full bg-green-600 text-white py-2 rounded-xl font-semibold text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
      >
        {loading ? 'Redirecting…' : '💳 Pay Now'}
      </button>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

export default function MessageBubble({ message }) {
  const isBot = message.sender === 'bot';

  return (
    <div className={`flex flex-col ${isBot ? 'items-start' : 'items-end'} gap-1`}>
      <div
        className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed ${
          isBot
            ? 'bg-gray-100 text-gray-800 rounded-tr-2xl rounded-b-2xl'
            : 'bg-green-600 text-white rounded-tl-2xl rounded-b-2xl'
        }`}
      >
        {/* whitespace-pre-wrap preserves the bot's newlines and spacing */}
        <p className="whitespace-pre-wrap">{message.text}</p>

        {/* Pay Now button — only shown on checkout summary */}
        {isBot && message.type === 'payment' && message.data && (
          <PayNowButton data={message.data} />
        )}
      </div>

      <span className="text-xs text-gray-400 px-1">{formatTime(message.timestamp)}</span>
    </div>
  );
}
