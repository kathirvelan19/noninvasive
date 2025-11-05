interface SceneProps {
  progress: number;
}

export default function BloodInteractionScene({ progress }: SceneProps) {
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900" />

      <div className="relative z-10 w-full max-w-7xl px-8">
        <div className="text-center mb-8">
          <h2 className="text-5xl font-bold text-blue-300 mb-4">
            Scene 4: Blood-Tissue Interaction
          </h2>
          <p className="text-xl text-cyan-200">Impedance varies with blood composition</p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          <div className="relative">
            <svg viewBox="0 0 600 500" className="w-full max-w-3xl h-auto">
              <defs>
                <radialGradient id="plasmaGrad" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="#fef3c7" opacity="0.3" />
                  <stop offset="100%" stopColor="#fde68a" opacity="0.1" />
                </radialGradient>
                <filter id="cellGlow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <rect x="50" y="50" width="500" height="400" rx="20" fill="#0f172a" stroke="#3b82f6" strokeWidth="3" />

              <text x="300" y="90" textAnchor="middle" fill="#60a5fa" fontSize="20" fontWeight="bold">
                Microcapillary Blood Flow
              </text>

              <circle cx="300" cy="250" r="180" fill="url(#plasmaGrad)" />

              {[...Array(15)].map((_, i) => {
                const angle = (i / 15) * Math.PI * 2;
                const radius = 80 + Math.sin((progress / 100) * Math.PI * 2 + i) * 20;
                const x = 300 + Math.cos(angle) * radius;
                const y = 250 + Math.sin(angle) * radius;
                return <RedBloodCell key={i} cx={x} cy={y} index={i} progress={progress} />;
              })}

              {progress > 30 && (
                <>
                  {[...Array(20)].map((_, i) => (
                    <CurrentField
                      key={i}
                      x={150 + Math.random() * 300}
                      y={150 + Math.random() * 200}
                      progress={progress}
                      delay={i * 3}
                    />
                  ))}
                </>
              )}

              {progress > 50 && (
                <g>
                  <text x="300" y="420" textAnchor="middle" fill="#22d3ee" fontSize="16" fontWeight="bold">
                    Impedance Response
                  </text>

                  <g transform="translate(200, 430)">
                    <WaveformDisplay progress={progress} label="Resistance (R)" color="#f59e0b" />
                  </g>

                  <g transform="translate(350, 430)">
                    <WaveformDisplay progress={progress} label="Capacitance (C)" color="#a78bfa" phase={Math.PI / 2} />
                  </g>
                </g>
              )}
            </svg>
          </div>

          <div className="space-y-6 max-w-md">
            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-red-500/30">
              <h3 className="text-xl font-semibold text-red-300 mb-3">Red Blood Cells</h3>
              <p className="text-slate-300 leading-relaxed">
                RBCs act as tiny insulators with conductive membranes, creating unique electrical
                signatures based on their concentration and condition.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-cyan-500/30">
              <h3 className="text-xl font-semibold text-cyan-300 mb-3">Plasma Conductivity</h3>
              <p className="text-slate-300 leading-relaxed">
                Blood plasma, rich in ions, conducts electricity differently than cells, creating
                complex impedance patterns.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-amber-500/30">
              <h3 className="text-xl font-semibold text-amber-300 mb-3">Impedance Changes</h3>
              <p className="text-slate-300 leading-relaxed">
                The AC current interaction with blood components alters both resistance and
                capacitance, creating measurable waveform distortions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RedBloodCell({ cx, cy, index, progress }: { cx: number; cy: number; index: number; progress: number }) {
  const pulse = Math.sin((progress / 100) * Math.PI * 4 + index) * 0.2 + 1;

  return (
    <g transform={`translate(${cx}, ${cy}) scale(${pulse})`} style={{ transformOrigin: 'center' }}>
      <ellipse
        cx="0"
        cy="0"
        rx="18"
        ry="14"
        fill="#dc2626"
        stroke="#991b1b"
        strokeWidth="2"
        filter="url(#cellGlow)"
      />
      <ellipse cx="0" cy="0" rx="12" ry="8" fill="#7f1d1d" />
      <ellipse cx="0" cy="0" rx="6" ry="4" fill="#450a0a" />
    </g>
  );
}

function CurrentField({ x, y, progress, delay }: { x: number; y: number; progress: number; delay: number }) {
  const adjustedProgress = ((progress + delay) % 100) / 100;
  const opacity = Math.sin(adjustedProgress * Math.PI) * 0.4;

  return (
    <circle
      cx={x}
      cy={y}
      r="4"
      fill="#06b6d4"
      opacity={opacity}
      filter="url(#cellGlow)"
    />
  );
}

function WaveformDisplay({ progress, label, color, phase = 0 }: { progress: number; label: string; color: string; phase?: number }) {
  const points: string[] = [];
  for (let i = 0; i <= 50; i++) {
    const x = i;
    const y = 15 + Math.sin((i / 50) * Math.PI * 4 + (progress / 100) * Math.PI * 2 + phase) * 10;
    points.push(`${x},${y}`);
  }

  return (
    <g>
      <rect x="0" y="0" width="60" height="35" rx="5" fill="#0f172a" stroke={color} strokeWidth="1" />
      <path d={`M ${points.join(' L ')}`} fill="none" stroke={color} strokeWidth="2" />
      <text x="30" y="50" textAnchor="middle" fill={color} fontSize="10" fontWeight="bold">
        {label}
      </text>
    </g>
  );
}
