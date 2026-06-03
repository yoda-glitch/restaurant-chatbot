export default function KitchenIcon({ size = 20, color = '#C8A96E' }) {
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
