import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://yodas-cuisine-api-91b448f69c3f.herokuapp.com';

function CheckIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 13l4 4L19 7" stroke="#C8A96E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 6L6 18M6 6l12 12" stroke="#C8A96E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const pageStyle = {
  background: '#F5F0EB',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '16px',
  textAlign: 'center',
  padding: '24px',
  fontFamily: 'system-ui, -apple-system, sans-serif',
};

const iconCircle = {
  width: '56px',
  height: '56px',
  background: '#1A1A2E',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export default function PaymentCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const reference = searchParams.get('reference');

    if (!reference) {
      setStatus('failed');
      return;
    }

    let timer;

    axios
      .get(`${API_BASE}/api/payment/verify/${reference}`)
      .then((res) => {
        if (res.data.success) {
          setStatus('success');
          timer = setTimeout(() => navigate('/'), 3000);
        } else {
          setStatus('failed');
        }
      })
      .catch(() => setStatus('failed'));

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  if (status === 'loading') {
    return (
      <div style={pageStyle}>
        <div
          style={{
            width: '40px',
            height: '40px',
            border: '3px solid #1A1A2E',
            borderTopColor: '#C8A96E',
            borderRadius: '50%',
            animationName: 'spin',
            animationDuration: '0.8s',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
          }}
        />
        <p style={{ color: '#888780', fontSize: '14px', margin: 0 }}>
          Verifying your payment...
        </p>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div style={pageStyle}>
        <div style={iconCircle}>
          <CheckIcon />
        </div>
        <h1 style={{ color: '#1A1A2E', fontSize: '20px', fontWeight: 600, margin: 0 }}>
          Payment Successful
        </h1>
        <p style={{ color: '#2D2D2D', fontSize: '14px', margin: 0 }}>
          Payment successful. Your order has been confirmed.
        </p>
        <p style={{ color: '#888780', fontSize: '13px', margin: 0 }}>
          Returning to chat in a moment...
        </p>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <div style={iconCircle}>
        <XIcon />
      </div>
      <h1 style={{ color: '#1A1A2E', fontSize: '20px', fontWeight: 600, margin: 0 }}>
        Payment Not Completed
      </h1>
      <p style={{ color: '#2D2D2D', fontSize: '14px', margin: 0 }}>
        Payment was not completed. Please try again.
      </p>
      <button
        onClick={() => navigate('/')}
        style={{
          marginTop: '8px',
          background: '#1A1A2E',
          color: '#C8A96E',
          border: 'none',
          borderRadius: '8px',
          padding: '12px 28px',
          fontSize: '14px',
          fontWeight: 600,
          cursor: 'pointer',
          letterSpacing: '0.01em',
        }}
      >
        Return to chat
      </button>
    </div>
  );
}
