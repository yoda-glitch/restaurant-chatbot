import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatPage from './pages/ChatPage';
import PaymentCallbackPage from './pages/PaymentCallbackPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/payment/callback" element={<PaymentCallbackPage />} />
      </Routes>
    </BrowserRouter>
  );
}
