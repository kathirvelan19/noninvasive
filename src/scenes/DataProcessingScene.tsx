import { Database, TrendingUp, Activity } from 'lucide-react';

interface SceneProps {
  progress: number;
}

export default function DataProcessingScene({ progress }: SceneProps) {
  const features = [
    { label: 'R1 (Resistance)', value: '245 Ω', progress: progress > 20 },
    { label: 'R2 (Reactance)', value: '78 Ω', progress: progress > 35 },
    { label: 'Phase Angle', value: '-32°', progress: progress > 50 },
    { label: 'Cole-Cole α', value: '0.85', progress: progress > 65 },
    { label: 'Capacitance', value: '12 nF', progress: progress > 80 },
  ];

  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900" />

      <div className="relative z-10 w-full max-w-7xl px-8">
        <div className="text-center mb-8">
          <h2 className="text-5xl font-bold text-blue-300 mb-4">
            Scene 8: Data Processing & Feature Extraction
          </h2>
          <p className="text-xl text-cyan-200">Extracting bioimpedance parameters</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 border-2 border-blue-500/50 shadow-2xl shadow-blue-500/30">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-600/20 rounded-lg border border-blue-500/30">
                  <Database className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-blue-300">Processing Engine</h3>
                  <p className="text-cyan-400 text-sm">Real-time Feature Extraction</p>
                </div>
              </div>

              <div className="space-y-4">
                {features.map((feature, index) => (
                  <FeatureExtraction
                    key={index}
                    label={feature.label}
                    value={feature.value}
                    active={feature.progress}
                    delay={index * 0.2}
                  />
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-700">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Processing Status</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-green-400 text-sm font-semibold">Active</span>
                  </div>
                </div>
                <div className="mt-2 h-2 bg-slate-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-cyan-500/30">
              <div className="flex items-center gap-3 mb-3">
                <Activity className="w-5 h-5 text-cyan-400" />
                <h4 className="text-lg font-semibold text-cyan-300">Feature Extraction</h4>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                Advanced algorithms extract key bioimpedance parameters from the raw spectrum data,
                including resistance, reactance, phase angles, and Cole-Cole model parameters.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 border-2 border-purple-500/50 shadow-2xl shadow-purple-500/30">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-purple-600/20 rounded-lg border border-purple-500/30">
                  <TrendingUp className="w-8 h-8 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-purple-300">Cole-Cole Plot</h3>
                  <p className="text-purple-400 text-sm">Complex Impedance Analysis</p>
                </div>
              </div>

              <div className="bg-slate-950 rounded-xl p-6 border border-purple-600/50">
                <svg viewBox="0 0 400 400" className="w-full h-auto">
                  <defs>
                    <linearGradient id="coleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#a78bfa" />
                      <stop offset="50%" stopColor="#c084fc" />
                      <stop offset="100%" stopColor="#e879f9" />
                    </linearGradient>
                    <filter id="plotGlow">
                      <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  <line x1="50" y1="50" x2="50" y2="350" stroke="#334155" strokeWidth="2" />
                  <line x1="50" y1="350" x2="350" y2="350" stroke="#334155" strokeWidth="2" />

                  <text x="200" y="380" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">
                    Resistance (Ω)
                  </text>
                  <text x="20" y="200" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold" transform="rotate(-90, 20, 200)">
                    Reactance (Ω)
                  </text>

                  <ColeColePlot progress={progress} />

                  {progress > 70 && (
                    <>
                      <circle cx="250" cy="200" r="8" fill="#a78bfa" filter="url(#plotGlow)" />
                      <text x="250" y="185" textAnchor="middle" fill="#c084fc" fontSize="12" fontWeight="bold">
                        α = 0.85
                      </text>
                    </>
                  )}
                </svg>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-purple-500/30">
              <h4 className="text-lg font-semibold text-purple-300 mb-3">Cole-Cole Model</h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                The Cole-Cole plot visualizes tissue and blood electrical properties, where the
                semicircular pattern reveals cell membrane characteristics and plasma conductivity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureExtraction({ label, value, active, delay }: { label: string; value: string; active: boolean; delay: number }) {
  return (
    <div
      className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-500`}
      style={{
        backgroundColor: active ? 'rgba(59, 130, 246, 0.1)' : 'rgba(15, 23, 42, 0.5)',
        borderColor: active ? 'rgba(59, 130, 246, 0.5)' : 'rgba(51, 65, 85, 0.3)',
        transitionDelay: `${delay}s`,
      }}
    >
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full transition-all duration-500 ${active ? 'bg-cyan-400 animate-pulse' : 'bg-slate-600'}`} />
        <span className={`text-sm font-medium ${active ? 'text-blue-300' : 'text-slate-500'}`}>{label}</span>
      </div>
      <span className={`text-lg font-bold font-mono ${active ? 'text-cyan-300' : 'text-slate-600'}`}>{value}</span>
    </div>
  );
}

function ColeColePlot({ progress }: { progress: number }) {
  const points: string[] = [];

  for (let i = 0; i <= progress; i += 2) {
    const t = (i / 100) * Math.PI;
    const centerX = 200;
    const centerY = 200;
    const radius = 150;

    const x = 50 + centerX - radius * Math.cos(t);
    const y = 350 - (centerY - radius * Math.sin(t));

    points.push(`${x},${y}`);
  }

  if (points.length < 2) return null;

  return (
    <g>
      <path
        d={`M ${points.join(' L ')}`}
        fill="none"
        stroke="url(#coleGrad)"
        strokeWidth="4"
        strokeLinecap="round"
        filter="url(#plotGlow)"
      />
      {points.slice(-1).map((point, index) => {
        const [x, y] = point.split(',').map(Number);
        return (
          <circle
            key={index}
            cx={x}
            cy={y}
            r="6"
            fill="#e879f9"
            filter="url(#plotGlow)"
          >
            <animate attributeName="r" values="6;8;6" dur="1s" repeatCount="indefinite" />
          </circle>
        );
      })}
    </g>
  );
}
