interface SceneProps {
  progress: number;
}

export default function ElectrodeScene({ progress }: SceneProps) {
  const currentFlow = progress > 30;

  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900" />

      <div className="relative z-10 w-full max-w-6xl px-8">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-blue-300 mb-4">
            Scene 2: Current Injection to Electrode Interface
          </h2>
          <p className="text-xl text-cyan-200">Current injected through electrodes</p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-16">
          <div className="relative">
            <div className="absolute inset-0 blur-3xl bg-cyan-500/20 animate-pulse" />

            <svg viewBox="0 0 400 500" className="w-96 h-auto">
              <defs>
                <radialGradient id="skinGradient" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="#fef3c7" />
                  <stop offset="100%" stopColor="#fde68a" />
                </radialGradient>
                <linearGradient id="electrodeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#e5e7eb" />
                  <stop offset="100%" stopColor="#9ca3af" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <ellipse cx="200" cy="100" rx="100" ry="80" fill="url(#skinGradient)" stroke="#d97706" strokeWidth="2" />

              <rect x="120" y="60" width="60" height="15" rx="3" fill="url(#electrodeGradient)" stroke="#6b7280" strokeWidth="2" />
              <rect x="220" y="60" width="60" height="15" rx="3" fill="url(#electrodeGradient)" stroke="#6b7280" strokeWidth="2" />

              <circle cx="150" cy="67" r="12" fill="#3b82f6" opacity="0.3" className="animate-ping" />
              <circle cx="250" cy="67" r="12" fill="#3b82f6" opacity="0.3" className="animate-ping" style={{ animationDelay: '0.5s' }} />

              {currentFlow && (
                <>
                  {[...Array(8)].map((_, i) => (
                    <CurrentParticle key={i} delay={i * 0.3} startX={150} startY={75} endX={200} endY={140} progress={progress} />
                  ))}
                  {[...Array(8)].map((_, i) => (
                    <CurrentParticle key={`r${i}`} delay={i * 0.3} startX={250} startY={75} endX={200} endY={140} progress={progress} />
                  ))}
                </>
              )}

              <text x="150" y="45" textAnchor="middle" fill="#06b6d4" fontSize="14" fontWeight="bold">
                Electrode 1
              </text>
              <text x="250" y="45" textAnchor="middle" fill="#06b6d4" fontSize="14" fontWeight="bold">
                Electrode 2
              </text>

              <rect x="50" y="250" width="300" height="180" rx="10" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
              <text x="200" y="280" textAnchor="middle" fill="#60a5fa" fontSize="16" fontWeight="bold">
                Wire Leads
              </text>

              <line x1="150" y1="75" x2="120" y2="250" stroke="#06b6d4" strokeWidth="3" strokeDasharray="5,5" />
              <line x1="250" y1="75" x2="280" y2="250" stroke="#06b6d4" strokeWidth="3" strokeDasharray="5,5" />

              <g transform="translate(80, 300)">
                <rect width="80" height="40" rx="5" fill="#0f172a" stroke="#3b82f6" strokeWidth="1" />
                <text x="40" y="25" textAnchor="middle" fill="#22d3ee" fontSize="12">Current</text>
              </g>

              <g transform="translate(240, 300)">
                <rect width="80" height="40" rx="5" fill="#0f172a" stroke="#3b82f6" strokeWidth="1" />
                <text x="40" y="25" textAnchor="middle" fill="#22d3ee" fontSize="12">Voltage</text>
              </g>
            </svg>
          </div>

          <div className="space-y-6 max-w-md">
            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-cyan-500/30">
              <h3 className="text-xl font-semibold text-cyan-300 mb-3">Silver Electrodes</h3>
              <p className="text-slate-300 leading-relaxed">
                Two highly conductive silver electrodes are placed on the skin surface, typically on
                a fingertip or wrist, providing optimal contact for signal transmission.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-cyan-500/30">
              <h3 className="text-xl font-semibold text-cyan-300 mb-3">Safe Current Flow</h3>
              <p className="text-slate-300 leading-relaxed">
                The low-intensity alternating current flows between the electrodes, creating an
                electric field that penetrates the skin layers safely and painlessly.
              </p>
            </div>

            <div className="bg-blue-950/50 backdrop-blur rounded-xl p-4 border border-blue-400/30">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-cyan-300 font-mono text-sm">
                  Current: {currentFlow ? '100 μA' : 'Initializing...'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CurrentParticle({
  delay,
  startX,
  startY,
  endX,
  endY,
  progress,
}: {
  delay: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  progress: number;
}) {
  const particleProgress = ((progress + delay * 10) % 100) / 100;
  const x = startX + (endX - startX) * particleProgress;
  const y = startY + (endY - startY) * particleProgress;
  const opacity = Math.sin(particleProgress * Math.PI);

  return (
    <circle
      cx={x}
      cy={y}
      r="3"
      fill="#06b6d4"
      opacity={opacity}
      filter="url(#glow)"
    />
  );
}
