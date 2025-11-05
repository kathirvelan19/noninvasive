import { Zap, Activity } from 'lucide-react';

interface SceneProps {
  progress: number;
}

export default function FinalScene({ progress }: SceneProps) {
  const fadeIn = progress < 30 ? progress / 30 : 1;
  const deviceScale = 0.8 + (Math.min(progress, 60) / 60) * 0.2;

  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900" />

      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-400/5"
            style={{
              width: `${Math.random() * 400 + 200}px`,
              height: `${Math.random() * 400 + 200}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `drift ${Math.random() * 20 + 15}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div
        className="relative z-10 flex flex-col items-center justify-center text-center px-8 max-w-6xl"
        style={{ opacity: fadeIn }}
      >
        <div
          className="mb-12 transition-transform duration-1000"
          style={{ transform: `scale(${deviceScale})` }}
        >
          <div className="relative">
            <div className="absolute inset-0 blur-3xl bg-cyan-500/40 animate-pulse" />

            <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border-4 border-cyan-500 shadow-2xl shadow-cyan-500/50 p-8 w-96">
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 blur-xl bg-cyan-400/50 animate-pulse" />
                  <div className="relative p-4 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl">
                    <Activity className="w-16 h-16 text-white" />
                  </div>
                </div>
              </div>

              <div className="text-center space-y-3">
                <h3 className="text-2xl font-bold text-cyan-300">EIS-2000</h3>
                <p className="text-sm text-slate-400">Noninvasive Blood Analyzer</p>

                <div className="pt-4 flex justify-center gap-2">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 rounded-full bg-cyan-400"
                      style={{
                        animation: `pulse 2s ease-in-out infinite`,
                        animationDelay: `${i * 0.4}s`,
                      }}
                    />
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-700">
                  <div className="flex items-center justify-center gap-2 text-green-400">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs font-semibold">Ready for Testing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {progress > 40 && (
          <div className="space-y-8 animate-fade-in">
            <div className="relative">
              <div className="absolute inset-0 blur-2xl bg-blue-400/20" />
              <h1 className="relative text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent leading-tight">
                Electrical Impedance Spectroscopy
              </h1>
            </div>

            <div className="relative">
              <div className="absolute inset-0 blur-xl bg-cyan-400/10" />
              <h2 className="relative text-2xl md:text-4xl font-light text-cyan-200">
                The Future of Noninvasive Blood Testing
              </h2>
            </div>

            {progress > 60 && (
              <div className="pt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <FeatureCard
                  icon={<Zap className="w-8 h-8" />}
                  title="Fast"
                  description="Results in under 60 seconds"
                />
                <FeatureCard
                  icon={<Activity className="w-8 h-8" />}
                  title="Painless"
                  description="Completely noninvasive testing"
                />
                <FeatureCard
                  icon={<Activity className="w-8 h-8" />}
                  title="Accurate"
                  description="95%+ correlation with lab tests"
                />
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes drift {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
          }
          25% {
            transform: translate(30px, -30px) scale(1.1);
            opacity: 0.5;
          }
          50% {
            transform: translate(-20px, 20px) scale(0.9);
            opacity: 0.4;
          }
          75% {
            transform: translate(20px, 30px) scale(1.05);
            opacity: 0.45;
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 hover:transform hover:scale-105">
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="p-3 bg-cyan-600/20 rounded-lg border border-cyan-500/30 text-cyan-400">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-cyan-300">{title}</h3>
        <p className="text-sm text-slate-400">{description}</p>
      </div>
    </div>
  );
}
