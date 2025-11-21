/**
 * ThankYou Component
 * 
 * Final screen displayed after photo session completion.
 * Thanks the user and provides options to view photos or return home.
 * 
 * Features:
 * - Thank you message with friendly closing
 * - Decorative elements (hearts, cherry blossom, love letter, teddy bears)
 * - Navigation options: Home or View Photos
 * - SoSo Clicks branding display
 * 
 * @returns {JSX.Element} Thank you screen with navigation options
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FallingSparkles, FloatingBubbles, FallingHearts, ConfettiRain, TwinklingStars } from '../components/Decoration';

function ThankYou() {
  const navigate = useNavigate();

  return (
    // Main container with light pink background
    <div style={{ background: "#f6DDD8", height: "100vh", overflow: "hidden" }} className="flex items-center justify-center p-6">
      <FallingHearts />
      {/* Content panel: Cream background with coral-pink border */}
      <div
        className="relative rounded-3xl text-center max-w-3xl w-full"
        style={{
          height: "80%",
          background: "#f7f4E8", // Cream white background
          border: "5px solid #FF6B6A", // Coral-pink border
          padding: 0,
          boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
        }}
      >
        {/* SoSo Clicks logo at top */}
        <div className="flex items-center justify-center mb-4" style={{ position: 'relative' }}>
          {/* Main camera logo icon */}
          <img
            className=''
            src="/images/logo_camera-.png"
            alt="soso clicks logo"
            style={{ width: 480, height: 180, objectFit: "cover" }}
          />
          {/* <div style={{ marginLeft: 12 }}>
            <div style={{ color: '#F08080', fontSize: 24, fontWeight: 700, fontFamily: 'Poppins, sans-serif' }}>
              soso
            </div>
            <div style={{ color: '#F08080', fontSize: 24, fontWeight: 700, fontFamily: 'Poppins, sans-serif' }}>
              clicks
            </div>
          </div> */}
        </div>

        {/* Main thank you message */}
        <h1 style={{ color: '#F08080', fontSize: 48, fontWeight: 800, marginTop: 12 }}>
          Thank you!
        </h1>

        {/* Closing message */}
        <p style={{ fontSize: 20, marginTop: 12, color: '#6B2D9B' }}>
          Please visit us again soon.
        </p>

        {/* Action buttons */}
        <div className="mt-8 flex justify-center gap-4">
          {/* Home button: Returns to welcome screen */}
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition-all"
          >
            Home
          </button>

          {/* View Photos button: Goes to share/download screen */}
          <button
            onClick={() => navigate('/share')}
            className="px-6 py-3 rounded-lg bg-rose-400 text-white font-bold hover:bg-rose-500 shadow-lg transition-all"
          >
            View Photos
          </button>
        </div>

        {/* Decorative love letter (top-left) */}
        <div className="absolute" style={{ top: 20, left: 20 }}>
          <div style={{
            width: 60,
            height: 50,
            background: '#FFB6C1',
            borderRadius: 8,
            border: '2px solid #F08080',
            position: 'relative',
            padding: '20px 40px'
          }}>
            <div >
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: '#D83A4A',
                fontSize: 20,
                fontWeight: 700
              }}>
                LOVE
              </div>
            </div>
          </div>
        </div>

        {/* Decorative cherry blossom (top-right) */}
        <img
          src="/images/flower.png"
          alt="decorative flower"
          className="absolute"
          style={{ top: 0, right: 0, width: 150, height: 100, objectFit: "contain" }}
        />

        {/* Decorative hearts: Scattered across the panel */}
        <img src="/images/heart1-r.png" alt="heart" className="absolute" style={{ top: 100, left: 80, width: 24 }} />
        <img src="/images/heart2.png" alt="heart" className="absolute" style={{ top: 140, right: 100, width: 20 }} />
        <img src="/images/heart3-l.png" alt="heart" className="absolute" style={{ top: 200, left: 150, width: 28 }} />
        <img src="/images/heart3-l.png" alt="heart" className="absolute" style={{ top: 150, left: 60, width: 28 }} />
        <img src="/images/heart1-r.png" alt="heart" className="absolute" style={{ top: 250, right: 150, width: 22 }} />
        <img src="/images/heart1-r.png" alt="heart" className="absolute" style={{ top: 180, right: 100, width: 40 }} />
        <img src="/images/heart2.png" alt="heart" className="absolute" style={{ top: 300, left: 160, width: 26 }} />
        <img src="/images/heart2.png" alt="heart" className="absolute" style={{ top: 200, left: 70, width: 26 }} />

        {/* Decorative teddy bears at bottom */}
        {/* Left bear: Waving */}
        <img
          src="/images/teddy_left.png"
          alt="teddy bear waving"
          className="absolute"
          style={{ bottom: 0, left: 0, width: 160, height: 'auto' }}
        />

        {/* Right bear: With heart on chest */}
        <img
          src="/images/teddy_right.png"
          alt="teddy bear with heart"
          className="absolute"
          style={{ bottom: 0, right: 0, width: 160, height: 'auto' }}
        />
      </div>
    </div>
  );
}

export default ThankYou;
