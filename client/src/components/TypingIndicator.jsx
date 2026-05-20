export default function TypingIndicator() {
  return (
    <div className="flex items-end gap-1 px-4 py-2">
      <div className="bg-gray-100 rounded-tr-2xl rounded-b-2xl px-4 py-3 flex gap-1 items-center">
        <span
          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
          style={{ animationDelay: '0ms' }}
        />
        <span
          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
          style={{ animationDelay: '150ms' }}
        />
        <span
          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
          style={{ animationDelay: '300ms' }}
        />
      </div>
    </div>
  );
}
