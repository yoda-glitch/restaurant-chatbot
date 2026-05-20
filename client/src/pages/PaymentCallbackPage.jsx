import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function PaymentCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'failed'

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
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-600 text-sm">Verifying your payment…</p>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4 text-center px-6">
        <p className="text-4xl">🎉</p>
        <h1 className="text-2xl font-bold text-green-700">Payment Successful!</h1>
        <p className="text-gray-600">Your order is confirmed.</p>
        <p className="text-gray-400 text-sm">Redirecting you back in 3 seconds…</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 text-center px-6">
      <p className="text-4xl">❌</p>
      <h1 className="text-2xl font-bold text-red-600">Payment Failed</h1>
      <p className="text-gray-600">Your payment was not completed.</p>
      <button
        onClick={() => navigate('/')}
        className="mt-4 bg-green-600 text-white px-6 py-2 rounded-full font-medium hover:bg-green-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}
