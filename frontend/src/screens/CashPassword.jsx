import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Delete } from 'lucide-react';
import { FallingSparkles, FloatingBubbles, FallingHearts, ConfettiRain, TwinklingStars } from '../components/Decoration';


function CashPassword({ updateSession }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === '123456') {
      updateSession({ paymentStatus: 'completed', amountPaid: 200 });
      navigate('/grid');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  const handleKeypadClick = (value) => {
    setError('');
    if (value === 'backspace') {
      setPassword(prev => prev.slice(0, -1));
    } else {
      setPassword(prev => prev + value);
    }
  };

  const keypadButtons = [
    '1', '2', '3',
    '4', '5', '6',
    '7', '8', '9',
    '0', 'backspace'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Enter Cash Password</h2>
        <p className="text-gray-600 mb-6">Ask the attendant for the password</p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full p-4 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none text-center text-2xl tracking-widest"
            readOnly
          />

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mt-4">
              {error}
            </div>
          )}

          {/* Numeric Keypad */}
          <div className="grid grid-cols-3 gap-3 mt-6 mb-6">
            {keypadButtons.map((btn, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleKeypadClick(btn)}
                className={`p-4 rounded-lg font-semibold text-xl transition-all ${btn === 'backspace'
                  ? 'col-span-2 bg-red-500 hover:bg-red-600 text-white flex items-center justify-center gap-2'
                  : 'bg-blue-500 hover:bg-blue-600 text-white active:scale-95'
                  }`}
              >
                {btn === 'backspace' ? (
                  <>
                    <Delete size={24} />
                    <span>Delete</span>
                  </>
                ) : (
                  btn
                )}
              </button>
            ))}
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate('/payment')}
              className="flex-1 px-6 py-3 rounded-lg border-2 border-gray-300 hover:bg-gray-50 font-semibold transition-colors"
            >
              Back
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CashPassword;