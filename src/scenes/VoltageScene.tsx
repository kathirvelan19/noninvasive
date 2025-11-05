interface SceneProps {
  progress: number;
}

export default function VoltageScene({ progress }: SceneProps) {
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900" />

      <div className="relative z-10 w-full max-w-7xl px-8">
        <div className="text-center mb-8">
          <h2 className="text-5xl font-bold text-blue-300 mb-4">
            Scene 5: Sensing & Data Acquisition
          </h2>
          <p className="text-xl text-cyan-200">Voltage measurement across electrodes</p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          <div className="relative">
            <div className="absolute inset-0 blur-3xl bg-blue-500/20 animate-pulse" />

            <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border-2 border-blue-500 shadow-2xl shadow-blue-500/50 p-8 w-[500px]">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-blue-300">Instrumentation Amplifier</h3>
                <p className="text-cyan-400 text-sm mt-2">High-Precision Voltage Sensor</p>
              </div>

              <div className="bg-slate-950 rounded-xl p-6 border border-blue-600/50 mb-6">
                <svg viewBox="0 0 400 200" className="w-full h-full">
                  <defs>
                    <linearGradient id="voltGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="50%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                    <filter id="voltGlow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  <line x1="0" y1="100" x2="400" y2="100" stroke="#1e293b" strokeWidth="1" />

                  <path
                    d={generateVoltageWave(400, 200, progress)}
                    fill="none"
                    stroke="url(#voltGradient)"
                    strokeWidth="3"
                    filter="url(#voltGlow)"
                  />

                  {progress > 30 && (
                    <>
                      <text x="10" y="30" fill="#22d3ee" fontSize="14" fontWeight="bold">
                        V(t)
                      </text>
                      <text x="360" y="190" fill="#22d3ee" fontSize="14" fontWeight="bold">
                        Time
                      </text>
                    </>
                  )}
                </svg>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-950/50 rounded-lg p-4 border border-blue-700/30 text-center">
                  <div className="text-blue-400 text-xs mb-1">Voltage</div>
                  <div className="text-cyan-300 text-xl font-bold font-mono">
                    {(Math.sin((progress / 100) * Math.PI * 4) * 2.5 + 2.5).toFixed(2)} V
                  </div>
                </div>
                <div className="bg-blue-950/50 rounded-lg p-4 border border-blue-700/30 text-center">
                  <div className="text-blue-400 text-xs mb-1">Amplitude</div>
                  <div className="text-cyan-300 text-xl font-bold font-mono">
                    {(2.5 + (progress / 100) * 0.5).toFixed(2)} V
                  </div>
                </div>
                <div className="bg-blue-950/50 rounded-lg p-4 border border-blue-700/30 text-center">
                  <div className="text-blue-400 text-xs mb-1">Phase</div>
                  <div className="text-cyan-300 text-xl font-bold font-mono">
                    {Math.floor((progress / 100) * 360)}°
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between bg-slate-950/50 rounded-lg p-4 border border-green-600/30">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-500/50" />
                  <span className="text-green-400 font-semibold">Acquiring Signal</span>
                </div>
                <div className="text-cyan-300 font-mono text-sm">
                  {Math.floor((progress / 100) * 1000)} samples/sec
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="h-2 bg-blue-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="h-2 bg-blue-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-400 transition-all duration-100"
                    style={{ width: `${(progress * 0.8) % 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 max-w-md">
            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-blue-500/30">
              <h3 className="text-xl font-semibold text-blue-300 mb-3">Differential Measurement</h3>
              <p className="text-slate-300 leading-relaxed">
                The instrumentation amplifier measures the voltage difference between the two
                electrodes with high precision and minimal noise.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-cyan-500/30">
              <h3 className="text-xl font-semibold text-cyan-300 mb-3">Real-Time Capture</h3>
              <p className="text-slate-300 leading-relaxed">
                Voltage oscillations are captured in real-time, revealing how tissue impedance
                affects the signal amplitude and phase.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-green-500/30">
              <h3 className="text-xl font-semibold text-green-300 mb-3">High-Speed Sampling</h3>
              <p className="text-slate-300 leading-relaxed">
                Data acquisition systems sample at thousands of times per second to capture detailed
                waveform characteristics across all frequencies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function generateVoltageWave(width: number, height: number, progress: number): string {
  const points: string[] = [];
  const centerY = height / 2;
  const amplitude = height / 3;

  for (let x = 0; x <= width; x += 2) {
    const phase = (progress / 100) * Math.PI * 2;
    const frequency = 4;
    const y = centerY + amplitude * Math.sin((x / width) * Math.PI * frequency + phase);
    points.push(`${x},${y}`);
  }

  return `M ${points.join(' L ')}`;
}
