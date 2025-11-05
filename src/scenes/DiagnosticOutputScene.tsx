import { Smartphone, Activity, TrendingUp, CheckCircle2, AlertCircle } from 'lucide-react';

interface SceneProps {
  progress: number;
}

export default function DiagnosticOutputScene({ progress }: SceneProps) {
  const results = [
    { label: 'Hematocrit', value: '42%', range: '37-47%', status: 'normal', icon: Activity, progress: progress > 15 },
    { label: 'RBC Count', value: '4.8 M/μL', range: '4.5-5.5 M/μL', status: 'normal', icon: Activity, progress: progress > 30 },
    { label: 'Hemoglobin', value: '14.2 g/dL', range: '13.5-17.5 g/dL', status: 'normal', icon: Activity, progress: progress > 45 },
    { label: 'Hydration', value: 'Normal', range: 'Optimal', status: 'normal', icon: CheckCircle2, progress: progress > 60 },
    { label: 'Blood Flow', value: 'Good', range: 'Normal', status: 'normal', icon: TrendingUp, progress: progress > 75 },
  ];

  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900" />

      <div className="relative z-10 w-full max-w-7xl px-8">
        <div className="text-center mb-8">
          <h2 className="text-5xl font-bold text-blue-300 mb-4">Scene 10: Diagnostic Output</h2>
          <p className="text-xl text-cyan-200">Real-time results on mobile dashboard</p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          <div className="relative" style={{ perspective: '1000px' }}>
            <div
              className="relative transform transition-transform duration-1000"
              style={{
                transform: `rotateY(${Math.sin((progress / 100) * Math.PI) * 5}deg) rotateX(${Math.cos((progress / 100) * Math.PI) * 5}deg)`,
              }}
            >
              <div className="absolute inset-0 blur-3xl bg-blue-500/30 animate-pulse" />

              <div className="relative w-[380px] h-[750px] bg-gradient-to-b from-slate-900 to-slate-950 rounded-[3rem] border-8 border-slate-800 shadow-2xl shadow-blue-500/50 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-slate-800 rounded-b-3xl" />

                <div className="px-6 pt-12 pb-6 h-full overflow-y-auto">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-2xl font-bold text-blue-300">Blood Analysis</h3>
                      <Smartphone className="w-6 h-6 text-cyan-400" />
                    </div>
                    <p className="text-sm text-slate-400">EIS Test Results</p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-950/50 to-cyan-950/50 rounded-2xl p-6 border border-blue-500/30 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-slate-300 text-sm">Overall Status</span>
                      {progress > 50 && (
                        <div className="flex items-center gap-2 bg-green-500/20 px-3 py-1 rounded-full">
                          <CheckCircle2 className="w-4 h-4 text-green-400" />
                          <span className="text-green-400 text-sm font-semibold">Healthy</span>
                        </div>
                      )}
                    </div>

                    <div className="relative h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-500 shadow-lg shadow-green-500/50"
                        style={{ width: `${Math.min(progress * 1.2, 100)}%` }}
                      />
                    </div>

                    <div className="mt-4 text-center">
                      <div className="text-4xl font-bold text-green-300">{Math.min(98, Math.floor(progress * 0.98))}%</div>
                      <div className="text-xs text-slate-400 mt-1">Health Score</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {results.map((result, index) => (
                      <ResultCard key={index} {...result} />
                    ))}
                  </div>

                  {progress > 90 && (
                    <div className="mt-6 bg-slate-800/50 rounded-xl p-4 border border-blue-500/30">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-blue-300 font-semibold mb-1">Recommendation</p>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            All parameters are within normal range. Continue maintaining a healthy lifestyle.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 max-w-md">
            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-blue-500/30">
              <div className="flex items-center gap-3 mb-3">
                <Smartphone className="w-6 h-6 text-blue-400" />
                <h3 className="text-xl font-semibold text-blue-300">Mobile Dashboard</h3>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Results are instantly displayed on a sleek mobile interface, providing comprehensive
                blood analysis data in an easy-to-understand format.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-green-500/30">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle2 className="w-6 h-6 text-green-400" />
                <h3 className="text-xl font-semibold text-green-300">Instant Results</h3>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Complete blood analysis in under 60 seconds, with detailed breakdowns of key health
                metrics and personalized recommendations.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-cyan-500/30">
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="w-6 h-6 text-cyan-400" />
                <h3 className="text-xl font-semibold text-cyan-300">Track Progress</h3>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Monitor trends over time, compare results with previous tests, and share data with
                healthcare providers for comprehensive care.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ResultCardProps {
  label: string;
  value: string;
  range: string;
  status: string;
  icon: React.ComponentType<{ className?: string }>;
  progress: boolean;
}

function ResultCard({ label, value, range, status, icon: Icon, progress }: ResultCardProps) {
  return (
    <div
      className={`p-4 rounded-xl border transition-all duration-500 ${
        progress
          ? 'bg-slate-800/50 border-blue-500/30 opacity-100'
          : 'bg-slate-900/30 border-slate-700/20 opacity-40'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <div className={`p-2 rounded-lg ${progress ? 'bg-blue-500/20' : 'bg-slate-800/50'}`}>
            <Icon className={`w-4 h-4 ${progress ? 'text-blue-400' : 'text-slate-600'}`} />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className={`text-sm font-semibold ${progress ? 'text-slate-200' : 'text-slate-600'}`}>
                {label}
              </span>
              {progress && status === 'normal' && (
                <div className="flex items-center gap-1 bg-green-500/20 px-2 py-0.5 rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span className="text-xs text-green-400 font-semibold">Normal</span>
                </div>
              )}
            </div>
            <div className={`text-lg font-bold font-mono ${progress ? 'text-cyan-300' : 'text-slate-700'}`}>
              {value}
            </div>
            <div className={`text-xs mt-1 ${progress ? 'text-slate-400' : 'text-slate-700'}`}>
              Range: {range}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
