import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FallingSparkles, FloatingBubbles, FallingHearts, ConfettiRain, TwinklingStars } from '../components/Decoration';

function FrameSelectionScreen({ sessionData, updateSession }) {
    const navigate = useNavigate();
    const [selectedFrame, setSelectedFrame] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const compositeImage = sessionData?.compositeImage;
    const canvasRef = useRef(null);

    // Frame options with different styles
    // Frame options with different styles
    // Frame options with different styles
    const frameOptions = [
        {
            id: 'none',
            name: 'No Frame',
            borderWidth: 0,
            borderColor: 'transparent',
            padding: 0
        },
        // Modern Minimal Frames
        {
            id: 'modern-minimal',
            name: 'Modern Minimal',
            borderWidth: 6,
            borderColor: '#D4C5B9',
            padding: 15,
            borderRadius: '8px',
            innerBorder: '1px solid #3A3A3A',
            shadow: '0 4px 15px rgba(0,0,0,0.08)'
        },
        {
            id: 'minimalist-thin',
            name: 'Minimalist Thin',
            borderWidth: 5,
            borderColor: '#2C2C2C',
            padding: 18,
            shadow: '0 2px 10px rgba(0,0,0,0.1)'
        },
        {
            id: 'shadow-depth',
            name: 'Floating Shadow',
            borderWidth: 0,
            borderColor: 'transparent',
            padding: 12,
            shadow: '0 8px 30px rgba(0,0,0,0.25), inset 0 0 0 1px rgba(0,0,0,0.1)'
        },
        // Vintage & Ornate
        {
            id: 'vintage-ornate',
            name: 'Vintage Ornate',
            borderWidth: 35,
            borderColor: '#DAA520',
            padding: 8,
            backgroundImage: 'repeating-linear-gradient(45deg, #DAA520, #B8860B 2px, #CD853F 2px, #DAA520 4px)',
            innerBorder: '3px solid #8B6914',
            shadow: '0 8px 35px rgba(184,134,11,0.4)'
        },
        {
            id: 'art-deco',
            name: 'Art Deco',
            borderWidth: 28,
            borderColor: '#1C1C1C',
            padding: 10,
            innerBorder: '4px solid #D4AF37',
            shadow: '0 6px 25px rgba(0,0,0,0.35)',
            backgroundImage: 'linear-gradient(135deg, #2C2C2C 25%, #1C1C1C 25%, #1C1C1C 50%, #2C2C2C 50%, #2C2C2C 75%, #1C1C1C 75%)'
        },
        {
            id: 'copper-vintage',
            name: 'Copper Vintage',
            borderWidth: 28,
            borderColor: '#B87333',
            padding: 8,
            innerBorder: '2px solid #FFF8DC',
            shadow: '0 5px 20px rgba(184,115,51,0.4)',
            backgroundImage: 'linear-gradient(135deg, #B87333 0%, #A0522D 50%, #B87333 100%)'
        },
        // Polaroid & Instant Film
        {
            id: 'polaroid-classic',
            name: 'Polaroid Classic',
            borderWidth: 15,
            borderColor: '#F8F8F8',
            padding: 15,
            bottomPadding: 70,
            shadow: '0 5px 20px rgba(0,0,0,0.2)',
            borderRadius: '3px'
        },
        {
            id: 'instant-film',
            name: 'Instant Film',
            borderWidth: 12,
            borderColor: '#FEFEFE',
            padding: 18,
            bottomPadding: 65,
            shadow: '0 4px 15px rgba(0,0,0,0.18)',
            borderRadius: '2px',
            innerBorder: '1px solid #E8E8E8'
        },
        // Neon & Futuristic
        {
            id: 'neon-blue-magenta',
            name: 'Neon Blue',
            borderWidth: 10,
            borderColor: '#00D9FF',
            padding: 6,
            shadow: '0 0 25px #00D9FF, 0 0 50px #00D9FF, inset 0 0 20px rgba(0,217,255,0.2)',
            borderRadius: '5px'
        },
        {
            id: 'neon-magenta',
            name: 'Neon Magenta',
            borderWidth: 10,
            borderColor: '#FF00FF',
            padding: 6,
            shadow: '0 0 25px #FF00FF, 0 0 50px #FF00FF, inset 0 0 20px rgba(255,0,255,0.2)',
            borderRadius: '5px'
        },
        {
            id: 'futuristic-cyber',
            name: 'Futuristic Cyber',
            borderWidth: 8,
            borderColor: '#1a1a2e',
            padding: 10,
            backgroundImage: 'linear-gradient(135deg, #0f3460 0%, #16213e 100%)',
            innerBorder: '2px solid #00D9FF',
            shadow: '0 0 30px rgba(0,217,255,0.5)',
            borderRadius: '8px'
        },
        // Floral & Watercolor
        {
            id: 'floral-watercolor',
            name: 'Floral Watercolor',
            borderWidth: 45,
            borderColor: '#FFF5F7',
            padding: 5,
            backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(255,182,193,0.4) 0%, transparent 50%), radial-gradient(circle at 90% 80%, rgba(152,251,152,0.3) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(255,218,224,0.2) 0%, transparent 70%)',
            shadow: '0 4px 20px rgba(255,182,193,0.3)',
            borderRadius: '10px'
        },
        {
            id: 'pastel-rose',
            name: 'Pastel Rose',
            borderWidth: 22,
            borderColor: '#FFE5EC',
            padding: 12,
            innerBorder: '2px solid #FFC1D5',
            shadow: '0 4px 20px rgba(255,193,213,0.3)',
            borderRadius: '8px'
        },
        {
            id: 'lavender-garden',
            name: 'Lavender Garden',
            borderWidth: 24,
            borderColor: '#E6E6FA',
            padding: 10,
            innerBorder: '2px solid #9370DB',
            shadow: '0 4px 20px rgba(147,112,219,0.3)',
            backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(230,230,250,0.8) 0%, transparent 60%)',
            borderRadius: '12px'
        },
        // Wooden & Rustic
        {
            id: 'rustic-oak',
            name: 'Rustic Oak',
            borderWidth: 32,
            borderColor: '#8B6F47',
            padding: 5,
            backgroundImage: 'repeating-linear-gradient(90deg, #8B6F47 0px, #7A5C3A 1px, #8B6F47 2px, #9B7F57 10px)',
            shadow: '0 6px 25px rgba(90,60,30,0.5)'
        },
        {
            id: 'weathered-wood',
            name: 'Weathered Wood',
            borderWidth: 35,
            borderColor: '#704214',
            padding: 5,
            backgroundImage: 'linear-gradient(180deg, #704214 0%, #5C3317 30%, #704214 60%, #5C3317 100%)',
            shadow: '0 6px 25px rgba(92,51,23,0.5)'
        },
        {
            id: 'barn-wood',
            name: 'Barn Wood',
            borderWidth: 30,
            borderColor: '#6B4423',
            padding: 8,
            backgroundImage: 'repeating-linear-gradient(180deg, #6B4423 0px, #5A3820 3px, #6B4423 6px)',
            shadow: '0 5px 20px rgba(75,50,30,0.45)'
        },
        // Metallic & Polish
        {
            id: 'brushed-steel',
            name: 'Brushed Steel',
            borderWidth: 18,
            borderColor: '#B8B8B8',
            padding: 10,
            backgroundImage: 'linear-gradient(90deg, #C0C0C0 0%, #A8A8A8 50%, #C0C0C0 100%)',
            innerBorder: '1px solid #888888',
            shadow: '0 5px 20px rgba(128,128,128,0.4)'
        },
        {
            id: 'polished-chrome',
            name: 'Polished Chrome',
            borderWidth: 15,
            borderColor: '#D4D4D4',
            padding: 12,
            backgroundImage: 'linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 50%, #E8E8E8 100%)',
            shadow: '0 4px 18px rgba(160,160,160,0.35)',
            innerBorder: '2px solid #A0A0A0'
        },
        {
            id: 'gold-luxury',
            name: 'Gold Luxury',
            borderWidth: 25,
            borderColor: '#FFD700',
            padding: 8,
            innerBorder: '3px solid #B8860B',
            shadow: '0 6px 25px rgba(218,165,32,0.4)',
            backgroundImage: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)'
        },
        // Gallery & Professional
        {
            id: 'gallery-mat',
            name: 'Gallery Mat',
            borderWidth: 45,
            borderColor: '#F8F8F8',
            padding: 0,
            innerBorder: '1px solid #CCCCCC',
            shadow: '0 8px 30px rgba(0,0,0,0.15)'
        },
        {
            id: 'museum-white',
            name: 'Museum White',
            borderWidth: 40,
            borderColor: '#FAFAFA',
            padding: 5,
            innerBorder: '2px solid #E0E0E0',
            shadow: '0 6px 25px rgba(0,0,0,0.12)'
        },
        {
            id: 'classic-black',
            name: 'Classic Black',
            borderWidth: 20,
            borderColor: '#1C1C1C',
            padding: 8,
            innerBorder: '1px solid #000000',
            shadow: '0 5px 20px rgba(0,0,0,0.4)'
        },
        // Film & Retro
        {
            id: 'film-strip',
            name: 'Film Strip',
            borderWidth: 25,
            borderColor: '#1a1a1a',
            padding: 5,
            holes: true,
            shadow: '0 4px 15px rgba(0,0,0,0.4)'
        },
        {
            id: 'retro-orange',
            name: 'Retro Orange',
            borderWidth: 22,
            borderColor: '#FF8C42',
            padding: 12,
            innerBorder: '3px solid #FFFFFF',
            shadow: '0 5px 20px rgba(255,140,66,0.4)',
            borderRadius: '5px'
        },
        {
            id: 'vintage-yellow',
            name: 'Vintage Yellow',
            borderWidth: 20,
            borderColor: '#FFD93D',
            padding: 10,
            innerBorder: '2px solid #FFA500',
            shadow: '0 4px 18px rgba(255,217,61,0.35)'
        },
        // Modern Colorful
        {
            id: 'ocean-blue',
            name: 'Ocean Blue',
            borderWidth: 20,
            borderColor: '#4A90E2',
            padding: 10,
            innerBorder: '2px solid #FFFFFF',
            shadow: '0 4px 20px rgba(74,144,226,0.35)',
            borderRadius: '8px'
        },
        {
            id: 'coral-sunset',
            name: 'Coral Sunset',
            borderWidth: 22,
            borderColor: '#FF7F50',
            padding: 12,
            innerBorder: '3px solid #FFE4C4',
            shadow: '0 5px 20px rgba(255,127,80,0.35)',
            borderRadius: '10px'
        },
        {
            id: 'emerald-jewel',
            name: 'Emerald Jewel',
            borderWidth: 24,
            borderColor: '#50C878',
            padding: 10,
            innerBorder: '3px solid #2C5F2D',
            shadow: '0 6px 25px rgba(80,200,120,0.4)'
        },
        // Gradient & Creative
        {
            id: 'sunset-gradient',
            name: 'Sunset Gradient',
            borderWidth: 20,
            borderColor: '#FF6B6A',
            padding: 8,
            backgroundImage: 'linear-gradient(135deg, #FF6B6A 0%, #FFD93D 50%, #FF6B6A 100%)',
            shadow: '0 5px 25px rgba(255,107,106,0.4)',
            borderRadius: '12px'
        },
        {
            id: 'rainbow-pride',
            name: 'Rainbow Pride',
            borderWidth: 15,
            borderColor: '#FF0000',
            padding: 5,
            backgroundImage: 'linear-gradient(180deg, #FF0000 0%, #FF7F00 16.6%, #FFFF00 33.3%, #00FF00 50%, #0000FF 66.6%, #4B0082 83.3%, #9400D3 100%)',
            shadow: '0 5px 20px rgba(255,0,0,0.3)',
            borderRadius: '8px'
        },
        {
            id: 'purple-haze',
            name: 'Purple Haze',
            borderWidth: 18,
            borderColor: '#9B59B6',
            padding: 10,
            backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            shadow: '0 6px 25px rgba(102,126,234,0.4)',
            borderRadius: '15px'
        }
    ];

    const getFrameStyle = (frame) => {
        const baseStyle = {
            border: `${frame.borderWidth}px solid ${frame.borderColor}`,
            padding: `${frame.padding}px`,
            boxShadow: frame.shadow || 'none',
            borderRadius: frame.borderRadius || '0',
            background: frame.backgroundImage || frame.borderColor,
            position: 'relative'
        };

        if (frame.bottomPadding) {
            baseStyle.paddingBottom = `${frame.bottomPadding}px`;
        }

        return baseStyle;
    };

    const handleFrameSelect = (frame) => {
        setSelectedFrame(frame);
    };

    /**
     * Apply frame to composite image and generate new framed image
     */
    const applyFrameToImage = async (frame) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                // Create canvas for framed image
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                // Calculate frame dimensions
                const totalBorderWidth = frame.borderWidth * 2;
                const totalPadding = frame.padding * 2;
                const bottomExtraPadding = frame.bottomPadding ? frame.bottomPadding - frame.padding : 0;

                canvas.width = img.width + totalBorderWidth + totalPadding;
                canvas.height = img.height + totalBorderWidth + totalPadding + bottomExtraPadding;

                // Draw frame background
                if (frame.backgroundImage) {
                    // For gradient/pattern backgrounds
                    const tempCanvas = document.createElement('canvas');
                    tempCanvas.width = canvas.width;
                    tempCanvas.height = canvas.height;
                    const tempCtx = tempCanvas.getContext('2d');
                    tempCtx.fillStyle = frame.borderColor;
                    tempCtx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(tempCanvas, 0, 0);
                } else {
                    // Solid color background
                    ctx.fillStyle = frame.borderColor || '#FFFFFF';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                }

                // Calculate image position (centered with padding)
                const imgX = frame.borderWidth + frame.padding;
                const imgY = frame.borderWidth + frame.padding;

                // Draw inner border if exists
                if (frame.innerBorder) {
                    const borderSize = parseInt(frame.innerBorder.match(/\d+/)[0]);
                    const borderColor = frame.innerBorder.match(/#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{3}|\w+/)[0];

                    ctx.fillStyle = borderColor;
                    ctx.fillRect(
                        imgX - borderSize,
                        imgY - borderSize,
                        img.width + borderSize * 2,
                        img.height + borderSize * 2
                    );
                }

                // Draw the image
                ctx.drawImage(img, imgX, imgY, img.width, img.height);

                // Draw film strip holes if needed
                if (frame.holes) {
                    const holeSize = 8;
                    const holeColor = '#333';
                    const holeMargin = 10;
                    const holeCount = 4;
                    const holeSpacing = (canvas.height - holeMargin * 2) / (holeCount - 1);

                    ctx.fillStyle = holeColor;

                    // Left holes
                    for (let i = 0; i < holeCount; i++) {
                        ctx.beginPath();
                        ctx.arc(
                            holeMargin,
                            holeMargin + i * holeSpacing,
                            holeSize / 2,
                            0,
                            Math.PI * 2
                        );
                        ctx.fill();
                    }

                    // Right holes
                    for (let i = 0; i < holeCount; i++) {
                        ctx.beginPath();
                        ctx.arc(
                            canvas.width - holeMargin,
                            holeMargin + i * holeSpacing,
                            holeSize / 2,
                            0,
                            Math.PI * 2
                        );
                        ctx.fill();
                    }
                }

                resolve(canvas.toDataURL('image/jpeg', 0.95));
            };
            img.src = compositeImage;
        });
    };

    const handleContinue = async () => {
        if (!selectedFrame) return;

        setIsProcessing(true);

        try {
            let framedImage = compositeImage;

            // Apply frame if not "none"
            if (selectedFrame.id !== 'none') {
                framedImage = await applyFrameToImage(selectedFrame);
            }

            // Update session with framed composite image
            updateSession({
                selectedFrame: selectedFrame,
                compositeImage: framedImage, // Update with framed version
                originalCompositeImage: compositeImage // Keep original for reference
            });

            navigate('/stickers');
        } catch (error) {
            console.error('Error applying frame:', error);
            setIsProcessing(false);
        }
    };

    if (!compositeImage) {
        navigate('/camera-settings');
        return null;
    }

    return (
        <div style={{
            background: "#f6DDD8", minHeight: "100vh", overflowY: "auto"
        }}>
            <FallingHearts />
            {/* Hidden canvas for frame processing */}
            <canvas ref={canvasRef} style={{ display: 'none' }} />

            <div className="text-center pt-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-1">Choose Your Frame</h2>
                <p className="text-sm text-gray-600">Select a frame style for your photo</p>
            </div>

            <div
                style={{
                    background: "#f7f4E8",
                    border: "5px solid #FF6B6A",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
                    borderRadius: "10px",
                    margin: '8px',
                }}
                className="min-w-7xl p-2"
            >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Preview Section */}
                    <div className="lg:col-span-1">
                        <div
                            style={{
                                background: "#FFFFFF",
                                border: "3px solid #FF6B6A",
                                borderRadius: "10px",
                                padding: "10px"
                            }}
                        >
                            <h3 className="text-xl font-bold text-center text-gray-900">Preview</h3>
                            <div
                                style={{
                                    background: "#f0f0f0",
                                    borderRadius: "8px",
                                    padding: "12px",
                                    maxHeight: "100%"
                                }}
                                className="flex items-center justify-center"
                            >
                                {selectedFrame ? (
                                    <div style={getFrameStyle(selectedFrame)} className="max-w-full">
                                        {selectedFrame.innerBorder && (
                                            <div style={{ border: selectedFrame.innerBorder, padding: '5px' }}>
                                                <img
                                                    src={compositeImage}
                                                    alt="Preview"
                                                    className="w-full h-auto"
                                                    style={{ display: 'block' }}
                                                />
                                            </div>
                                        )}
                                        {!selectedFrame.innerBorder && (
                                            <img
                                                src={compositeImage}
                                                alt="Preview"
                                                className="w-full h-auto"
                                                style={{ display: 'block' }}
                                            />
                                        )}
                                        {selectedFrame.holes && (
                                            <>
                                                <div style={{
                                                    position: 'absolute',
                                                    left: '10px',
                                                    top: '50%',
                                                    transform: 'translateY(-50%)',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: '15px'
                                                }}>
                                                    {[...Array(4)].map((_, i) => (
                                                        <div key={`left-${i}`} style={{
                                                            width: '8px',
                                                            height: '8px',
                                                            background: '#333',
                                                            borderRadius: '50%'
                                                        }} />
                                                    ))}
                                                </div>
                                                <div style={{
                                                    position: 'absolute',
                                                    right: '10px',
                                                    top: '50%',
                                                    transform: 'translateY(-50%)',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: '15px'
                                                }}>
                                                    {[...Array(4)].map((_, i) => (
                                                        <div key={`right-${i}`} style={{
                                                            width: '8px',
                                                            height: '8px',
                                                            background: '#333',
                                                            borderRadius: '50%'
                                                        }} />
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-center text-gray-500 py-12">
                                        <p className="text-base font-semibold">👆 Select a frame to preview</p>
                                    </div>
                                )}
                            </div>

                            <div className="mt-4 flex gap-2">
                                <button
                                    onClick={() => navigate('/edit')}
                                    className="flex-1 text-sm py-2 px-3 rounded-lg border-2 hover:bg-gray-100 font-semibold"
                                    disabled={isProcessing}
                                >
                                    ← Back
                                </button>
                                <button
                                    onClick={handleContinue}
                                    style={{
                                        background: selectedFrame && !isProcessing ? "#FF6B6A" : "#cccccc",
                                        color: "white"
                                    }}
                                    className="flex-1 text-sm py-2 px-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
                                    disabled={!selectedFrame || isProcessing}
                                >
                                    {isProcessing ? 'Processing...' : 'Continue →'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Frame Options Grid */}
                    <div className="lg:col-span-2">
                        <h3 className="text-lg font-bold mb-3 text-gray-900">Frame Options</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {frameOptions.map((frame) => (
                                <div
                                    key={frame.id}
                                    onClick={() => handleFrameSelect(frame)}
                                    style={{
                                        background: "#FFFFFF",
                                        borderRadius: "8px",
                                        padding: "8px",
                                        margin: '4px',
                                        border: selectedFrame?.id === frame.id ? "3px solid #FF6B6A" : "2px solid #e0e0e0",
                                        transform: selectedFrame?.id === frame.id ? "scale(1.02)" : "scale(1)",
                                        transition: "all 0.2s ease"
                                    }}
                                    className="cursor-pointer hover:shadow-lg"
                                >
                                    <div
                                        style={{
                                            background: "#f5f5f5",
                                            borderRadius: "6px",
                                            padding: "8px",
                                            aspectRatio: "1",
                                            overflow: "hidden"
                                        }}
                                        className="flex items-center justify-center mb-2"
                                    >
                                        <div style={{
                                            ...getFrameStyle(frame),
                                            transform: 'scale(0.7)',
                                            maxWidth: '100%',
                                            maxHeight: '100%'
                                        }}>
                                            {frame.innerBorder && (
                                                <div style={{ border: frame.innerBorder, padding: '2px', height: '100%' }}>
                                                    <img
                                                        src={compositeImage}
                                                        alt={frame.name}
                                                        className="w-full h-full object-cover"
                                                        style={{ display: 'block' }}
                                                    />
                                                </div>
                                            )}
                                            {!frame.innerBorder && (
                                                <img
                                                    src={compositeImage}
                                                    alt={frame.name}
                                                    className="w-full h-full object-cover"
                                                    style={{ display: 'block' }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-center font-bold text-xs text-gray-800">{frame.name}</p>
                                    {selectedFrame?.id === frame.id && (
                                        <p className="text-center text-xs text-rose-500 font-semibold mt-1">✓ Selected</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FrameSelectionScreen;