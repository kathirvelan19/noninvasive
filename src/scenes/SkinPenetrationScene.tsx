interface SceneProps {
  progress: number;
}

export default function SkinPenetrationScene({ progress }: SceneProps) {
  const zoomLevel = 1 + (progress / 100) * 0.5;

  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900" />

      <div className="relative z-10 w-full max-w-7xl px-8">
        <div className="text-center mb-8">
          <h2 className="text-5xl font-bold text-blue-300 mb-4">
            Scene 3: Electrical Current Penetrates Skin
          </h2>
          <p className="text-xl text-cyan-200">Cross-sectional view of skin layers</p>
        </div>

        <div className="flex items-center justify-center gap-8">
          <div
            className="relative transition-transform duration-1000"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <svg viewBox="0 0 500 600" className="w-full max-w-2xl h-auto">
              <defs>
                <linearGradient id="epidermisGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#fef3c7" />
                  <stop offset="100%" stopColor="#fde68a" />
                </linearGradient>
                <linearGradient id="dermisGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#fde68a" />
                  <stop offset="100%" stopColor="#fed7aa" />
                </linearGradient>
                <linearGradient id="hypodermisGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#fed7aa" />
                  <stop offset="100%" stopColor="#fecaca" />
                </linearGradient>
                <filter id="softGlow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <rect x="50" y="50" width="400" height="80" fill="url(#epidermisGrad)" stroke="#d97706" strokeWidth="2" />
              <text x="460" y="90" fill="#d97706" fontSize="16" fontWeight="bold">Epidermis</text>

              <rect x="50" y="130" width="400" height="180" fill="url(#dermisGrad)" stroke="#ea580c" strokeWidth="2" />
              <text x="460" y="220" fill="#ea580c" fontSize="16" fontWeight="bold">Dermis</text>

              <rect x="50" y="310" width="400" height="120" fill="url(#hypodermisGrad)" stroke="#dc2626" strokeWidth="2" />
              <text x="460" y="370" fill="#dc2626" fontSize="16" fontWeight="bold">Hypodermis</text>

              {progress > 20 && (
                <>
                  {[...Array(12)].map((_, i) => (
                    <CurrentWave
                      key={i}
                      startY={50}
                      endY={430}
                      x={100 + i * 30}
                      progress={progress}
                      delay={i * 5}
                    />
                  ))}
                </>
              )}

              {progress > 40 && (
                <>
                  <circle cx="250" cy="200" r="15" fill="#ef4444" opacity="0.8" />
                  <circle cx="280" cy="220" r="12" fill="#ef4444" opacity="0.8" />
                  <circle cx="220" cy="230" r="14" fill="#ef4444" opacity="0.8" />
                  <circle cx="260" cy="250" r="13" fill="#ef4444" opacity="0.8" />

                  <ellipse cx="250" cy="260" rx="40" ry="8" fill="#dc2626" opacity="0.4" />
                  <text x="250" y="290" textAnchor="middle" fill="#ef4444" fontSize="14" fontWeight="bold">
                    Capillaries
                  </text>

                  <circle
                    cx="250"
                    cy="230"
                    r="50"
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="2"
                    opacity="0.6"
                    className="animate-ping"
                  />
                </>
              )}

              {progress > 60 && (
                <>
                  {[...Array(6)].map((_, i) => (
                    <BloodCell
                      key={i}
                      cx={230 + Math.random() * 40}
                      cy={210 + Math.random() * 50}
                      delay={i * 0.2}
                    />
                  ))}
                </>
              )}

              <rect x="30" y="30" width="420" height="410" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="10,5" />
            </svg>
          </div>

          <div className="space-y-4 max-w-xs">
            <div className={`bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-blue-500/30 transition-opacity duration-500 ${progress > 20 ? 'opacity-100' : 'opacity-30'}`}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 rounded-full bg-cyan-400" />
                <h4 className="text-cyan-300 font-semibold">Current Penetration</h4>
              </div>
              <p className="text-slate-300 text-sm">
                AC waves travel through skin layers
              </p>
            </div>

            <div className={`bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-orange-500/30 transition-opacity duration-500 ${progress > 40 ? 'opacity-100' : 'opacity-30'}`}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 rounded-full bg-orange-400" />
                <h4 className="text-orange-300 font-semibold">Dermis Layer</h4>
              </div>
              <p className="text-slate-300 text-sm">
                Rich in blood vessels and capillaries
              </p>
            </div>

            <div className={`bg-slate-800/50 backdrop-blur rounded-xl p-4 border border-red-500/30 transition-opacity duration-500 ${progress > 60 ? 'opacity-100' : 'opacity-30'}`}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <h4 className="text-red-300 font-semibold">Blood Cells</h4>
              </div>
              <p className="text-slate-300 text-sm">
                Current reaches red blood cells in capillaries
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CurrentWave({ startY, endY, x, progress, delay }: { startY: number; endY: number; x: number; progress: number; delay: number }) {
  const adjustedProgress = Math.max(0, Math.min(100, progress - delay));
  const currentY = startY + ((endY - startY) * adjustedProgress) / 100;
  const opacity = adjustedProgress > 0 ? 0.6 : 0;

  return (
    <line
      x1={x}
      y1={startY}
      x2={x}
      y2={currentY}
      stroke="#06b6d4"
      strokeWidth="3"
      opacity={opacity}
      filter="url(#softGlow)"
    />
  );
}

function BloodCell({ cx, cy, delay }: { cx: number; cy: number; delay: number }) {
  return (
    <g style={{ animation: `float 2s ease-in-out infinite`, animationDelay: `${delay}s` }}>
      <ellipse
        cx={cx}
        cy={cy}
        rx="8"
        ry="6"
        fill="#dc2626"
        stroke="#991b1b"
        strokeWidth="1"
      />
      <ellipse
        cx={cx}
        cy={cy}
        rx="4"
        ry="3"
        fill="#7f1d1d"
      />
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </g>
  );
}
