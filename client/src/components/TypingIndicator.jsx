function KitchenIcon({ size = 14, color = '#C8A96E' }) {
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

export default function TypingIndicator() {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
      {/* Bot avatar */}
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
        }}
      >
        <KitchenIcon size={14} color="#C8A96E" />
      </div>

      {/* Bubble with bouncing dots */}
      <div
        style={{
          background: '#FFFFFF',
          border: '0.5px solid #E8E4DF',
          borderRadius: '4px 16px 16px 16px',
          padding: '12px 16px',
          display: 'flex',
          gap: '5px',
          alignItems: 'center',
        }}
      >
        {[0, 150, 300].map((delay) => (
          <span
            key={delay}
            style={{
              width: '7px',
              height: '7px',
              background: '#1A1A2E',
              borderRadius: '50%',
              display: 'inline-block',
              animationName: 'dot-bounce',
              animationDuration: '1.2s',
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite',
              animationDelay: `${delay}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
