interface SceneProps {
  progress: number;
}

export default function SignalConditioningScene({ progress }: SceneProps) {
  const showFiltering = progress > 20;
  const showAmplification = progress > 45;
  const showADC = progress > 70;

  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900" />

      <div className="relative z-10 w-full max-w-7xl px-8">
        <div className="text-center mb-8">
          <h2 className="text-5xl font-bold text-blue-300 mb-4">
            Scene 6: Signal Conditioning
          </h2>
          <p className="text-xl text-cyan-200">Noise Filtering → Amplification → ADC Conversion</p>
        </div>

        <div className="flex flex-col items-center gap-12">
          <div className="flex flex-col lg:flex-row items-center gap-8 w-full max-w-6xl">
            <ProcessingBlock
              title="Raw Signal"
              active={true}
              waveform="noisy"
              color="red"
              progress={progress}
            />

            <Arrow active={showFiltering} />

            <ProcessingBlock
              title="Noise Filtering"
              subtitle="Low-pass & Band-pass"
              active={showFiltering}
              waveform="filtered"
              color="amber"
              progress={progress}
            />

            <Arrow active={showAmplification} />

            <ProcessingBlock
              title="Amplification"
              subtitle="Gain: 100x"
              active={showAmplification}
              waveform="amplified"
              color="green"
              progress={progress}
            />

            <Arrow active={showADC} />

            <ProcessingBlock
              title="ADC Conversion"
              subtitle="12-bit Digital"
              active={showADC}
              waveform="digital"
              color="blue"
              progress={progress}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
            <div className={`bg-slate-800/50 backdrop-blur rounded-xl p-6 border transition-all duration-500 ${showFiltering ? 'border-amber-500/50 opacity-100' : 'border-slate-700/30 opacity-40'}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-3 h-3 rounded-full ${showFiltering ? 'bg-amber-400 animate-pulse' : 'bg-slate-600'}`} />
                <h3 className="text-lg font-semibold text-amber-300">Filtering</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                Removes unwanted noise, 50/60 Hz interference, and high-frequency artifacts while
                preserving the biological signal.
              </p>
            </div>

            <div className={`bg-slate-800/50 backdrop-blur rounded-xl p-6 border transition-all duration-500 ${showAmplification ? 'border-green-500/50 opacity-100' : 'border-slate-700/30 opacity-40'}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-3 h-3 rounded-full ${showAmplification ? 'bg-green-400 animate-pulse' : 'bg-slate-600'}`} />
                <h3 className="text-lg font-semibold text-green-300">Amplification</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                Boosts the clean signal to measurable levels, typically 100-1000x gain, ensuring
                accurate digitization.
              </p>
            </div>

            <div className={`bg-slate-800/50 backdrop-blur rounded-xl p-6 border transition-all duration-500 ${showADC ? 'border-blue-500/50 opacity-100' : 'border-slate-700/30 opacity-40'}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-3 h-3 rounded-full ${showADC ? 'bg-blue-400 animate-pulse' : 'bg-slate-600'}`} />
                <h3 className="text-lg font-semibold text-blue-300">ADC Conversion</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                Converts analog voltage to digital values for computer processing and analysis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Arrow({ active }: { active: boolean }) {
  return (
    <div className={`flex items-center transition-all duration-500 ${active ? 'opacity-100' : 'opacity-20'}`}>
      <svg width="60" height="40" viewBox="0 0 60 40" className="transform">
        <defs>
          <linearGradient id="arrowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        <path
          d="M 5 20 L 40 20 L 35 15 M 40 20 L 35 25"
          fill="none"
          stroke="url(#arrowGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {active && (
          <circle cx="20" cy="20" r="3" fill="#06b6d4">
            <animate attributeName="cx" from="5" to="40" dur="1.5s" repeatCount="indefinite" />
          </circle>
        )}
      </svg>
    </div>
  );
}

interface ProcessingBlockProps {
  title: string;
  subtitle?: string;
  active: boolean;
  waveform: string;
  color: string;
  progress: number;
}

function ProcessingBlock({ title, subtitle, active, waveform, color, progress }: ProcessingBlockProps) {
  const colorMap = {
    red: { border: 'border-red-500', bg: 'bg-red-500', text: 'text-red-300' },
    amber: { border: 'border-amber-500', bg: 'bg-amber-500', text: 'text-amber-300' },
    green: { border: 'border-green-500', bg: 'bg-green-500', text: 'text-green-300' },
    blue: { border: 'border-blue-500', bg: 'bg-blue-500', text: 'text-blue-300' },
  };

  const colors = colorMap[color as keyof typeof colorMap];

  return (
    <div className={`bg-slate-800/50 backdrop-blur rounded-xl p-4 border-2 transition-all duration-500 min-w-[180px] ${active ? `${colors.border} opacity-100` : 'border-slate-700 opacity-40'}`}>
      <div className="text-center mb-3">
        <h4 className={`font-semibold ${colors.text}`}>{title}</h4>
        {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
      </div>

      <div className="bg-slate-950 rounded-lg p-3 border border-slate-700/50 h-24">
        <svg viewBox="0 0 100 60" className="w-full h-full">
          <WaveformPath waveform={waveform} color={colors.bg} progress={progress} active={active} />
        </svg>
      </div>

      {active && (
        <div className="mt-2 flex justify-center">
          <div className={`w-2 h-2 rounded-full ${colors.bg} animate-pulse`} />
        </div>
      )}
    </div>
  );
}

function WaveformPath({ waveform, color, progress, active }: { waveform: string; color: string; progress: number; active: boolean }) {
  const points: string[] = [];
  const centerY = 30;

  for (let x = 0; x <= 100; x += 2) {
    let y = centerY;

    if (waveform === 'noisy') {
      y += Math.sin((x / 100) * Math.PI * 6 + (progress / 100) * Math.PI * 2) * 12;
      y += (Math.random() - 0.5) * 8;
    } else if (waveform === 'filtered') {
      y += Math.sin((x / 100) * Math.PI * 6 + (progress / 100) * Math.PI * 2) * 12;
    } else if (waveform === 'amplified') {
      y += Math.sin((x / 100) * Math.PI * 6 + (progress / 100) * Math.PI * 2) * 20;
    } else if (waveform === 'digital') {
      const analogY = Math.sin((x / 100) * Math.PI * 6 + (progress / 100) * Math.PI * 2) * 20;
      y += Math.round(analogY / 5) * 5;
    }

    points.push(`${x},${y}`);
  }

  return (
    <path
      d={`M ${points.join(' L ')}`}
      fill="none"
      stroke={active ? color.replace('bg-', '#') : '#475569'}
      strokeWidth="2"
      opacity={active ? 1 : 0.3}
    />
  );
}
