interface SceneProps {
  progress: number;
}

export default function SignalGeneratorScene({ progress }: SceneProps) {
  const frequency = Math.sin((progress / 100) * Math.PI * 4) * 50 + 50;

  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900" />

      <div className="relative z-10 w-full max-w-6xl px-8">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-blue-300 mb-4">
            Scene 1: Signal Generation Unit
          </h2>
          <p className="text-xl text-cyan-200">
            AC Signal Generator (10 Hz – 1 MHz)
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          <div className="relative">
            <div className="absolute inset-0 blur-2xl bg-blue-500/30 animate-pulse" />
            <div className="relative w-80 h-80 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border-2 border-blue-500 shadow-2xl shadow-blue-500/50 p-8">
              <div className="flex flex-col h-full">
                <div className="text-center mb-6">
                  <div className="text-sm text-blue-400 font-mono mb-2">MEDICAL DEVICE</div>
                  <div className="text-xs text-cyan-300 font-mono">EIS-2000</div>
                </div>

                <div className="flex-1 bg-slate-950 rounded-lg p-4 border border-blue-600/50 mb-6">
                  <svg viewBox="0 0 200 100" className="w-full h-full">
                    <defs>
                      <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="50%" stopColor="#06b6d4" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                    <path
                      d={generateSineWave(200, 100, frequency, (progress / 100) * Math.PI * 2)}
                      fill="none"
                      stroke="url(#waveGradient)"
                      strokeWidth="2"
                      className="drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                    />
                    <line x1="0" y1="50" x2="200" y2="50" stroke="#1e293b" strokeWidth="1" />
                  </svg>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center text-xs font-mono">
                  <div className="bg-blue-950/50 rounded p-2 border border-blue-700/30">
                    <div className="text-blue-400">FREQ</div>
                    <div className="text-cyan-300 text-lg font-bold">
                      {Math.floor(10 + (progress / 100) * 999990)} Hz
                    </div>
                  </div>
                  <div className="bg-blue-950/50 rounded p-2 border border-blue-700/30">
                    <div className="text-blue-400">AMP</div>
                    <div className="text-cyan-300 text-lg font-bold">100 μA</div>
                  </div>
                </div>

                <div className="mt-4 flex justify-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-500/50" />
                  <div className="text-xs text-green-400">ACTIVE</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 max-w-md">
            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-blue-500/30">
              <h3 className="text-xl font-semibold text-cyan-300 mb-3">Low-Intensity AC Current</h3>
              <p className="text-slate-300 leading-relaxed">
                The device generates a safe, low-intensity alternating current that sweeps through a
                wide frequency range from 10 Hz to 1 MHz.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-blue-500/30">
              <h3 className="text-xl font-semibold text-cyan-300 mb-3">Sinusoidal Waveform</h3>
              <p className="text-slate-300 leading-relaxed">
                The smooth sinusoidal pattern allows for precise measurement of tissue impedance
                across different frequencies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function generateSineWave(width: number, height: number, frequency: number, phase: number): string {
  const points: string[] = [];
  const amplitude = height / 3;
  const centerY = height / 2;

  for (let x = 0; x <= width; x += 2) {
    const y = centerY + amplitude * Math.sin((x / width) * Math.PI * 4 + phase + frequency / 10);
    points.push(`${x},${y}`);
  }

  return `M ${points.join(' L ')}`;
}
