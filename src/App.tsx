import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import IntroScene from './scenes/IntroScene';
import SignalGeneratorScene from './scenes/SignalGeneratorScene';
import ElectrodeScene from './scenes/ElectrodeScene';
import SkinPenetrationScene from './scenes/SkinPenetrationScene';
import BloodInteractionScene from './scenes/BloodInteractionScene';
import VoltageScene from './scenes/VoltageScene';
import SignalConditioningScene from './scenes/SignalConditioningScene';
import FrequencySweepScene from './scenes/FrequencySweepScene';
import DataProcessingScene from './scenes/DataProcessingScene';
import MLAnalysisScene from './scenes/MLAnalysisScene';
import DiagnosticOutputScene from './scenes/DiagnosticOutputScene';
import FinalScene from './scenes/FinalScene';

const scenes = [
  { id: 0, component: IntroScene, duration: 4000 },
  { id: 1, component: SignalGeneratorScene, duration: 6000 },
  { id: 2, component: ElectrodeScene, duration: 6000 },
  { id: 3, component: SkinPenetrationScene, duration: 8000 },
  { id: 4, component: BloodInteractionScene, duration: 7000 },
  { id: 5, component: VoltageScene, duration: 6000 },
  { id: 6, component: SignalConditioningScene, duration: 7000 },
  { id: 7, component: FrequencySweepScene, duration: 8000 },
  { id: 8, component: DataProcessingScene, duration: 6000 },
  { id: 9, component: MLAnalysisScene, duration: 7000 },
  { id: 10, component: DiagnosticOutputScene, duration: 6000 },
  { id: 11, component: FinalScene, duration: 5000 },
];

function App() {
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [sceneProgress, setSceneProgress] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;

    const sceneDuration = scenes[currentScene].duration;
    const interval = setInterval(() => {
      setSceneProgress((prev) => {
        const next = prev + (100 / (sceneDuration / 50));
        if (next >= 100) {
          if (currentScene < scenes.length - 1) {
            setCurrentScene((c) => c + 1);
            return 0;
          } else {
            setIsPlaying(false);
            return 100;
          }
        }
        return next;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying, currentScene]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setCurrentScene(0);
    setSceneProgress(0);
    setIsPlaying(true);
  };

  const handleSceneSelect = (index: number) => {
    setCurrentScene(index);
    setSceneProgress(0);
    setIsPlaying(false);
  };

  const CurrentSceneComponent = scenes[currentScene].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white overflow-hidden">
      <div className="relative w-full h-screen">
        <CurrentSceneComponent progress={sceneProgress} />

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
          <div className="max-w-7xl mx-auto space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-blue-300">
                Scene {currentScene + 1} of {scenes.length}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handlePlayPause}
                  className="px-6 py-2 bg-blue-600/90 hover:bg-blue-500 rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-blue-500/30"
                >
                  {isPlaying ? (
                    <>
                      <Pause size={18} /> Pause
                    </>
                  ) : (
                    <>
                      <Play size={18} /> Play
                    </>
                  )}
                </button>
                <button
                  onClick={handleReset}
                  className="px-6 py-2 bg-slate-700/90 hover:bg-slate-600 rounded-lg flex items-center gap-2 transition-all"
                >
                  <RotateCcw size={18} /> Reset
                </button>
              </div>
            </div>

            <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-100 shadow-lg shadow-blue-500/50"
                style={{ width: `${(currentScene * 100 + sceneProgress) / scenes.length}%` }}
              />
            </div>

            <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
              {scenes.map((scene, index) => (
                <button
                  key={scene.id}
                  onClick={() => handleSceneSelect(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentScene
                      ? 'bg-blue-400 shadow-lg shadow-blue-500/50'
                      : index < currentScene
                      ? 'bg-cyan-600'
                      : 'bg-slate-700 hover:bg-slate-600'
                  }`}
                  title={`Scene ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
