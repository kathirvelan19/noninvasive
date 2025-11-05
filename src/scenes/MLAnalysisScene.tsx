import { Brain, Cpu, CheckCircle2 } from 'lucide-react';

interface SceneProps {
  progress: number;
}

export default function MLAnalysisScene({ progress }: SceneProps) {
  const metrics = [
    { label: 'Hematocrit', value: '42%', status: 'Normal', progress: progress > 20, color: 'emerald' },
    { label: 'RBC Count', value: '4.8 M/μL', status: 'Normal', progress: progress > 40, color: 'blue' },
    { label: 'Hydration', value: 'Normal', status: 'Optimal', progress: progress > 60, color: 'cyan' },
    { label: 'Hemoglobin', value: '14.2 g/dL', status: 'Normal', progress: progress > 80, color: 'purple' },
  ];

  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900" />

      <div className="relative z-10 w-full max-w-7xl px-8">
        <div className="text-center mb-8">
          <h2 className="text-5xl font-bold text-blue-300 mb-4">
            Scene 9: Machine Learning Analysis
          </h2>
          <p className="text-xl text-cyan-200">Neural network analyzing impedance data</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 border-2 border-blue-500/50 shadow-2xl shadow-blue-500/30">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-600/20 rounded-lg border border-blue-500/30 relative">
                  <Brain className="w-8 h-8 text-blue-400" />
                  {progress > 10 && (
                    <div className="absolute inset-0 rounded-lg bg-blue-400/20 animate-ping" />
                  )}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-blue-300">Neural Network</h3>
                  <p className="text-cyan-400 text-sm">Deep Learning Model</p>
                </div>
              </div>

              <div className="bg-slate-950 rounded-xl p-6 border border-blue-600/50 mb-6">
                <NeuralNetworkVisualization progress={progress} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-950/30 rounded-lg p-4 border border-blue-700/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Cpu className="w-4 h-4 text-blue-400" />
                    <span className="text-xs text-blue-400">Processing</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-300 font-mono">{Math.floor(progress)}%</div>
                </div>
                <div className="bg-cyan-950/30 rounded-lg p-4 border border-cyan-700/30">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs text-cyan-400">Confidence</span>
                  </div>
                  <div className="text-2xl font-bold text-cyan-300 font-mono">{Math.min(99, Math.floor(progress * 0.95))}%</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-cyan-500/30">
              <h4 className="text-lg font-semibold text-cyan-300 mb-3">AI-Powered Analysis</h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                Advanced machine learning algorithms trained on thousands of blood samples analyze
                the impedance spectrum to predict blood composition parameters with high accuracy.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 border-2 border-green-500/50 shadow-2xl shadow-green-500/30">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-green-600/20 rounded-lg border border-green-500/30">
                  <CheckCircle2 className="w-8 h-8 text-green-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-green-300">Blood Metrics</h3>
                  <p className="text-green-400 text-sm">Predicted Parameters</p>
                </div>
              </div>

              <div className="space-y-4">
                {metrics.map((metric, index) => (
                  <MetricCard
                    key={index}
                    label={metric.label}
                    value={metric.value}
                    status={metric.status}
                    active={metric.progress}
                    color={metric.color}
                    delay={index * 0.3}
                  />
                ))}
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-green-500/30">
              <h4 className="text-lg font-semibold text-green-300 mb-3">Clinical Validation</h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                The ML model has been validated against traditional blood tests, achieving over 95%
                correlation with laboratory results for key blood parameters.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NeuralNetworkVisualization({ progress }: { progress: number }) {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-auto">
      <defs>
        <radialGradient id="nodeGrad" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1e40af" />
        </radialGradient>
        <filter id="neuronGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {[[50, 80, 140, 200, 260], [150, 80, 110, 140, 170, 200, 230, 260], [250, 100, 140, 180, 220], [350, 150]].map((layer, layerIdx) => {
        const [x, ...nodes] = layer;
        return nodes.map((y, nodeIdx) => {
          const nextLayer = layerIdx < 3 ? [[50, 80, 140, 200, 260], [150, 80, 110, 140, 170, 200, 230, 260], [250, 100, 140, 180, 220], [350, 150]][layerIdx + 1] : null;
          return (
            <g key={`node-${layerIdx}-${nodeIdx}`}>
              {nextLayer && nextLayer.slice(1).map((nextY, nextIdx) => {
                const active = progress > (layerIdx * 25 + nodeIdx * 5);
                return (
                  <line
                    key={`edge-${nextIdx}`}
                    x1={x}
                    y1={y}
                    x2={nextLayer[0]}
                    y2={nextY}
                    stroke={active ? '#3b82f6' : '#1e293b'}
                    strokeWidth={active ? '2' : '1'}
                    opacity={active ? 0.6 : 0.2}
                  />
                );
              })}
            </g>
          );
        });
      })}

      {[[50, 80, 140, 200, 260], [150, 80, 110, 140, 170, 200, 230, 260], [250, 100, 140, 180, 220], [350, 150]].map((layer, layerIdx) => {
        const [x, ...nodes] = layer;
        return nodes.map((y, nodeIdx) => {
          const active = progress > (layerIdx * 25 + nodeIdx * 5);
          return (
            <g key={`neuron-${layerIdx}-${nodeIdx}`}>
              <circle
                cx={x}
                cy={y}
                r="12"
                fill={active ? 'url(#nodeGrad)' : '#1e293b'}
                stroke={active ? '#60a5fa' : '#334155'}
                strokeWidth="2"
                filter={active ? 'url(#neuronGlow)' : undefined}
              />
              {active && (
                <circle cx={x} cy={y} r="8" fill="#06b6d4" opacity="0.5">
                  <animate attributeName="r" values="8;12;8" dur="1.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.5;0;0.5" dur="1.5s" repeatCount="indefinite" />
                </circle>
              )}
            </g>
          );
        });
      })}

      <text x="50" y="280" textAnchor="middle" fill="#94a3b8" fontSize="11">Input</text>
      <text x="150" y="280" textAnchor="middle" fill="#94a3b8" fontSize="11">Hidden 1</text>
      <text x="250" y="280" textAnchor="middle" fill="#94a3b8" fontSize="11">Hidden 2</text>
      <text x="350" y="280" textAnchor="middle" fill="#94a3b8" fontSize="11">Output</text>
    </svg>
  );
}

function MetricCard({ label, value, status, active, color, delay }: { label: string; value: string; status: string; active: boolean; color: string; delay: number }) {
  const colorMap = {
    emerald: { bg: 'bg-emerald-500', border: 'border-emerald-500', text: 'text-emerald-300' },
    blue: { bg: 'bg-blue-500', border: 'border-blue-500', text: 'text-blue-300' },
    cyan: { bg: 'bg-cyan-500', border: 'border-cyan-500', text: 'text-cyan-300' },
    purple: { bg: 'bg-purple-500', border: 'border-purple-500', text: 'text-purple-300' },
  };

  const colors = colorMap[color as keyof typeof colorMap];

  return (
    <div
      className={`p-5 rounded-xl border-2 transition-all duration-500`}
      style={{
        backgroundColor: active ? 'rgba(16, 185, 129, 0.1)' : 'rgba(15, 23, 42, 0.5)',
        borderColor: active ? `rgba(${color === 'emerald' ? '16, 185, 129' : color === 'blue' ? '59, 130, 246' : color === 'cyan' ? '6, 182, 212' : '168, 85, 247'}, 0.5)` : 'rgba(51, 65, 85, 0.3)',
        transitionDelay: `${delay}s`,
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className={`text-sm font-semibold ${active ? colors.text : 'text-slate-500'}`}>{label}</span>
        {active && (
          <div className={`px-2 py-1 rounded-full text-xs font-bold ${colors.bg} bg-opacity-20 ${colors.text}`}>
            {status}
          </div>
        )}
      </div>
      <div className={`text-2xl font-bold font-mono ${active ? colors.text : 'text-slate-600'}`}>{value}</div>
      {active && (
        <div className="mt-3 h-1.5 bg-slate-900 rounded-full overflow-hidden">
          <div className={`h-full ${colors.bg} animate-pulse`} style={{ width: '95%' }} />
        </div>
      )}
    </div>
  );
}
