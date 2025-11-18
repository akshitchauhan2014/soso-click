/**
 * PaymentScreen Component
 * 
 * Displays payment options for the photo session.
 * Users can choose between Cash payment or Online (QR code) payment.
 * 
 * Features:
 * - Displays payment amount (200)
 * - Cash payment option with money icon
 * - Online payment option with QR code icon
 * - Decorative teddy bears at corners
 * - QR code overlay modal for online payment
 * 
 * @param {Object} sessionData - Current session data including payment status
 * @param {Function} updateSession - Callback to update session data
 * @returns {JSX.Element} Payment selection screen
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PaymentScreen({ sessionData, updateSession }) {
  const navigate = useNavigate();
  // State to control QR code overlay visibility
  const [showQR, setShowQR] = useState(false);
  // Fixed price for photo session
  const PRICE = 200;

  /**
   * Handle Cash Payment
   * Updates session with completed payment status and navigates to grid selection
   */
  const handlePayCash = () => {
    updateSession({ paymentStatus: 'completed', amountPaid: PRICE });
    // Small delay for better UX before navigation
    setTimeout(() => navigate('/grid'), 400);
  };

  /**
   * Handle Online Payment Click
   * Shows the QR code overlay modal for scanning
   */
  const handlePayOnlineClick = () => {
    setShowQR(true);
  };

  /**
   * Handle Online Payment Simulation
   * Updates session with completed payment and navigates to grid selection
   * In production, this would verify actual payment from payment gateway
   */
  const handleSimulateOnline = () => {
    updateSession({ paymentStatus: 'completed', amountPaid: PRICE });
    setTimeout(() => navigate('/grid'), 600);
  };

  return (
    // Main container with light pink background
    <div style={{ background: '#F7E4E4', minHeight: '100vh' }} className="flex items-center justify-center p-6">
      {/* Content panel: Cream background with coral-pink border */}
      <div
        className="relative w-full max-w-4xl rounded-3xl"
        style={{
          background: '#FFF7EE', // Cream white
          border: '4px solid #F4A3A3', // Coral-pink border
          padding: 48,
          boxShadow: '0 6px 20px rgba(0,0,0,0.04)'
        }}
      >
        {/* Main heading: Payment amount */}
        <h2 className="text-center" style={{ color: '#6B2D9B', fontSize: 48, fontWeight: 800 }}>
          PAY {PRICE} TO START
        </h2>

        {/* Payment options: Cash and Online side by side */}
        <div className="flex items-center justify-center mt-10 space-x-20">
          {/* Cash Payment Option */}
          <div className="flex flex-col items-center cursor-pointer" onClick={handlePayCash}>
            {/* Money icon: Stack of banknotes */}
            <img src="/images/cash_icon.png" alt="cash" style={{ width: 140, height: 140, objectFit: 'contain' }} />
            {/* Payment option label */}
            <div style={{ color: '#E05A57', fontSize: 28, fontWeight: 800, marginTop: 12 }}>CASH</div>
          </div>

          {/* Online Payment Option */}
          <div className="flex flex-col items-center cursor-pointer" onClick={handlePayOnlineClick}>
            {/* QR Code icon */}
            <img src="/images/qr.png" alt="qr" style={{ width: 140, height: 140, objectFit: 'contain' }} />
            {/* Payment option label */}
            <div style={{ color: '#E05A57', fontSize: 28, fontWeight: 800, marginTop: 12 }}>ONLINE</div>
          </div>
        </div>

        {/* Decorative teddy bears at bottom corners */}
        {/* Left bear: Blowing a kiss with heart */}
        <img src="/images/teddy_kiss.png" alt="teddy left" style={{ position: 'absolute', left: 8, bottom: -8, width: 140 }} />
        {/* Right bear: Holding money */}
        <img src="/images/teddy_money.png" alt="teddy right" style={{ position: 'absolute', right: 8, bottom: -8, width: 140 }} />

        {/* QR Code Overlay Modal */}
        {/* Displays when user selects Online payment option */}
        {showQR && (
          <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.4)' }}>
            {/* Modal content panel */}
            <div style={{ background: '#FFF7EE', padding: 28, borderRadius: 20, border: '4px solid #F4A3A3', textAlign: 'center' }}>
              {/* Modal heading */}
              <h3 style={{ color: '#6B2D9B', fontSize: 28, fontWeight: 800, marginBottom: 12 }}>Scan to Pay {PRICE}</h3>
              {/* QR Code image */}
              <img src="/images/qr.png" alt="qr-large" style={{ width: 220, height: 220, objectFit: 'contain', marginBottom: 12 }} />
              {/* Modal action buttons */}
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                {/* Close button: Dismisses QR modal */}
                <button onClick={() => setShowQR(false)} style={{ padding: '10px 18px', borderRadius: 12, border: '2px solid #F4A3A3', background: '#FFF', cursor: 'pointer' }}>Close</button>
                {/* Simulate Payment button: For testing purposes */}
                <button onClick={handleSimulateOnline} style={{ padding: '10px 18px', borderRadius: 12, background: '#FFB6C1', border: '2px solid #F48B9A', color: '#D83A4A', fontWeight: 700, cursor: 'pointer' }}>Simulate Payment</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PaymentScreen;
