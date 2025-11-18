import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';

function CameraFilter({ updateSession }) {
  const [filter, setFilter] = useState('none');
  const navigate = useNavigate();

  const apply = () => {
    updateSession({ cameraFilter: filter });
    navigate('/camera-settings');
  };

  const filterStyles = {
    none: 'none',
    sepia: 'sepia(0.6)',
    vintage: 'sepia(0.4) contrast(0.9) saturate(0.8)',
    cool: 'hue-rotate(200deg) saturate(1.1)',
    mono: 'grayscale(1)',
  };

  return (
    <div style={{ background: "#f6DDD8", height: "100vh", overflow: "hidden" }} className="w-screen h-screen flex items-center justify-center overflow-hidden bg-pink-50">
      <div className="max-w-6xl w-full h-full bg-white rounded-3xl p-6 border-4 border-rose-200 flex flex-col"
        style={{
          height: "90%",
          background: "#f7f4E8", // Cream white background
          border: "5px solid #FF6B6A", // Coral-pink border
          padding: 0,
          boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
        }}
      >
        <h2 className="text-2xl font-bold text-center">Camera Color Effects</h2>
        <div className="grid grid-cols-5 gap-4 px-2 items-center">
          {Object.keys(filterStyles).map(key => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`p-2 rounded-lg border text-xs font-semibold ${filter === key ? 'border-rose-400 bg-rose-50' : 'border-gray-200'}`}
            >
              <div style={{ filter: filterStyles[key] }} className="w-full h-12 bg-gray-900 rounded-xl items-center" />
              <div>{key}</div>
            </button>
          ))}
        </div>

        <div className="mb-3 flex-1 overflow-hidden p-5">
          <h3 className="font-semibold text-sm mb-1 text-center">Preview</h3>
          <div
            style={{
              backgroundColor: "#d9d9d9"
            }}
            className=" rounded-lg overflow-hidden p-1 h-[98%] flex items-center justify-center">
            <Webcam
              audio={false}
              screenshotFormat="image/jpeg"
              videoConstraints={{ facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } }}
              style={{ width: '90%', height: '100%', objectFit: 'contain', filter: filterStyles[filter] }}
            />
          </div>
        </div>

        <div className="flex justify-between gap-2 pb-2 ps-6">
          <button onClick={() => navigate('/grid')} className="px-3 py-1 rounded-lg border-2 text-xs hover:bg-gray-100">Back</button>
          <div className="flex gap-2">
            <button onClick={() => navigate('/camera-settings')} className="px-3 py-1 rounded-lg border-2 text-xs hover:bg-gray-100">Skip</button>
            <button onClick={apply} className="px-4 py-1 mx-5 rounded-lg bg-rose-300 font-bold text-xs hover:bg-rose-400">Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CameraFilter;
