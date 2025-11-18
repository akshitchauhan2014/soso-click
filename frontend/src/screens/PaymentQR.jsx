import React from 'react';
import { useNavigate } from 'react-router-dom';

function PaymentQR({ updateSession, sessionData }) {
  const navigate = useNavigate();
  const PRICE = 200;

  const handleSimulateOnline = () => {
    if (updateSession) updateSession({ paymentStatus: 'completed', amountPaid: PRICE });
    setTimeout(() => navigate('/grid'), 400);
  };

  return (
    <div style={{ background: '#F7E4E4', height: '100vh', overflow: 'hidden' }} className="flex items-center justify-center">
      <div
        className="relative w-full max-w-md rounded-3xl"
        style={{
          background: '#FFF7EE',
          border: '4px solid #F4A3A3',
          padding: 32,
          textAlign: 'center'
        }}
      >
        <h3 style={{ color: '#6B2D9B', fontSize: 28, fontWeight: 800, marginBottom: 12 }}>Scan to Pay {PRICE}</h3>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
          <img src="/images/qr.png" alt="qr-large" style={{ width: 220, height: 220, objectFit: 'contain' }} />
        </div>

        <p style={{ marginBottom: 12, color: '#555' }}>Use your UPI app to scan and pay. After payment, press continue.</p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
          <button onClick={() => navigate('/payment')} style={{ padding: '10px 18px', borderRadius: 12, border: '2px solid #F4A3A3', background: '#FFF', cursor: 'pointer' }}>Back</button>
          <button onClick={handleSimulateOnline} style={{ padding: '10px 18px', borderRadius: 12, background: '#FFB6C1', border: '2px solid #F48B9A', color: '#D83A4A', fontWeight: 700, cursor: 'pointer' }}>Continue (Simulate)</button>
        </div>
      </div>
    </div>
  );
}

export default PaymentQR;
