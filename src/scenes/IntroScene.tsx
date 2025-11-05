interface SceneProps {
  progress: number;
}

export default function IntroScene({ progress }: SceneProps) {
  const opacity = progress < 50 ? progress / 50 : 2 - progress / 50;

  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-900 to-blue-950" />

      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-400/10"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `pulse ${Math.random() * 3 + 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div
        className="relative z-10 text-center space-y-8 px-8"
        style={{ opacity }}
      >
        <div className="space-y-4">
          <div className="inline-block">
            <div className="relative">
              <div className="absolute inset-0 blur-xl bg-blue-500/30 animate-pulse" />
              <h1 className="relative text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-300 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                Noninvasive Blood Test
              </h1>
            </div>
          </div>

          <div className="relative inline-block">
            <div className="absolute inset-0 blur-lg bg-cyan-400/20" />
            <h2 className="relative text-3xl md:text-5xl font-light text-cyan-200">
              using Electrical Impedance Spectroscopy
            </h2>
          </div>
        </div>

        <div className="flex justify-center gap-2 pt-8">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-blue-400"
              style={{
                animation: `ping ${1.5}s cubic-bezier(0, 0, 0.2, 1) infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.1); }
        }
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
