interface SceneProps {
  progress: number;
}

export default function FrequencySweepScene({ progress }: SceneProps) {
  const currentFrequency = 10 * Math.pow(10, (progress / 100) * 5);

  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900" />

      <div className="relative z-10 w-full max-w-7xl px-8">
        <div className="text-center mb-8">
          <h2 className="text-5xl font-bold text-blue-300 mb-4">
            Scene 7: Frequency Sweep & Impedance Spectrum
          </h2>
          <p className="text-xl text-cyan-200">Impedance Spectrum Generated</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 border-2 border-blue-500/50 shadow-2xl shadow-blue-500/30">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-blue-300">Frequency Sweep</h3>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-cyan-300 text-sm font-mono">Scanning</span>
                </div>
              </div>

              <div className="bg-slate-950 rounded-xl p-6 border border-blue-600/50 mb-6">
                <div className="text-center mb-4">
                  <div className="text-sm text-blue-400 mb-2">Current Frequency</div>
                  <div className="text-4xl font-bold text-cyan-300 font-mono">
                    {formatFrequency(currentFrequency)}
                  </div>
                </div>

                <div className="relative h-8 bg-slate-800 rounded-full overflow-hidden border border-blue-700/30">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-cyan-400 to-green-400 transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-between px-4 text-xs font-mono text-slate-300">
                    <span>10 Hz</span>
                    <span>1 MHz</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {[10, 100, 1000, 10000, 100000].map((freq, i) => (
                  <div
                    key={freq}
                    className={`text-center p-2 rounded-lg border transition-all duration-300 ${
                      currentFrequency >= freq
                        ? 'bg-cyan-500/20 border-cyan-500/50'
                        : 'bg-slate-900/50 border-slate-700/30'
                    }`}
                  >
                    <div className="text-xs text-slate-400">{formatFrequency(freq)}</div>
                    {currentFrequency >= freq && (
                      <div className="w-2 h-2 rounded-full bg-cyan-400 mx-auto mt-1 animate-pulse" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-cyan-500/30">
              <h4 className="text-lg font-semibold text-cyan-300 mb-3">Multi-Frequency Analysis</h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                The system sweeps through frequencies from 10 Hz to 1 MHz, measuring impedance at
                each step to build a comprehensive spectrum that reveals blood composition.
              </p>
            </div>
          </div>

          <div>
            <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 border-2 border-purple-500/50 shadow-2xl shadow-purple-500/30">
              <h3 className="text-2xl font-bold text-purple-300 mb-6">Impedance Spectrum</h3>

              <div className="bg-slate-950 rounded-xl p-6 border border-purple-600/50 mb-6">
                <svg viewBox="0 0 400 250" className="w-full h-auto">
                  <defs>
                    <linearGradient id="spectrumGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#a78bfa" />
                      <stop offset="100%" stopColor="#c084fc" />
                    </linearGradient>
                    <linearGradient id="phaseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#22d3ee" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>

                  <text x="10" y="20" fill="#a78bfa" fontSize="12" fontWeight="bold">
                    |Z| (Ω)
                  </text>
                  <text x="350" y="240" fill="#94a3b8" fontSize="12" fontWeight="bold">
                    Frequency (Hz)
                  </text>

                  <line x1="40" y1="30" x2="40" y2="210" stroke="#334155" strokeWidth="2" />
                  <line x1="40" y1="210" x2="380" y2="210" stroke="#334155" strokeWidth="2" />

                  <ImpedanceCurve progress={progress} color="url(#spectrumGrad)" />

                  <PhaseCurve progress={progress} color="url(#phaseGrad)" />

                  <text x="360" y="80" fill="#a78bfa" fontSize="11" fontWeight="bold">
                    Magnitude
                  </text>
                  <text x="360" y="180" fill="#22d3ee" fontSize="11" fontWeight="bold">
                    Phase
                  </text>
                </svg>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-purple-950/30 rounded-lg p-4 border border-purple-700/30">
                  <div className="text-xs text-purple-400 mb-1">Impedance</div>
                  <div className="text-xl font-bold text-purple-300 font-mono">
                    {Math.floor(500 + Math.sin((progress / 100) * Math.PI) * 200)} Ω
                  </div>
                </div>
                <div className="bg-cyan-950/30 rounded-lg p-4 border border-cyan-700/30">
                  <div className="text-xs text-cyan-400 mb-1">Phase Angle</div>
                  <div className="text-xl font-bold text-cyan-300 font-mono">
                    {Math.floor(-45 + Math.sin((progress / 100) * Math.PI * 2) * 30)}°
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-purple-500/30">
              <h4 className="text-lg font-semibold text-purple-300 mb-3">Bioimpedance Signature</h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                The impedance spectrum creates a unique fingerprint of blood composition, with
                different frequencies revealing information about cell membranes, plasma, and tissue.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatFrequency(freq: number): string {
  if (freq >= 1000000) return `${(freq / 1000000).toFixed(1)} MHz`;
  if (freq >= 1000) return `${(freq / 1000).toFixed(0)} kHz`;
  return `${Math.floor(freq)} Hz`;
}

function ImpedanceCurve({ progress, color }: { progress: number; color: string }) {
  const points: string[] = [];

  for (let i = 0; i <= progress; i += 2) {
    const x = 40 + (i / 100) * 340;
    const freq = i / 100;
    const impedance = 120 - 80 * (1 - Math.exp(-freq * 3)) + Math.sin(freq * Math.PI * 4) * 10;
    const y = 30 + impedance;
    points.push(`${x},${y}`);
  }

  if (points.length < 2) return null;

  return (
    <path
      d={`M ${points.join(' L ')}`}
      fill="none"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
    />
  );
}

function PhaseCurve({ progress, color }: { progress: number; color: string }) {
  const points: string[] = [];

  for (let i = 0; i <= progress; i += 2) {
    const x = 40 + (i / 100) * 340;
    const freq = i / 100;
    const phase = 180 - 30 * Math.sin(freq * Math.PI * 2);
    const y = 30 + phase * 0.4;
    points.push(`${x},${y}`);
  }

  if (points.length < 2) return null;

  return (
    <path
      d={`M ${points.join(' L ')}`}
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="5,5"
    />
  );
}
