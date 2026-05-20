import { useState } from 'react';

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

  return (
    <div className="bg-white border-t border-gray-200 px-4 py-3 flex gap-2 sticky bottom-0">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isTyping}
        placeholder="Type a number to select an option..."
        className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm outline-none focus:border-green-500 disabled:bg-gray-50 disabled:text-gray-400"
      />
      <button
        onClick={handleSend}
        disabled={isTyping || !value.trim()}
        className="bg-green-600 text-white px-5 py-2 rounded-full text-sm font-medium disabled:opacity-40 hover:bg-green-700 transition-colors"
      >
        Send
      </button>
    </div>
  );
}
