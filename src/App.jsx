import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSpline from './components/HeroSpline';
import MainMenu from './components/MainMenu';
import GameUI from './components/GameUI';
import { GameOverModal, PauseMenu } from './components/Modals';
import Garage from './components/Garage';
import EnvironmentSelector from './components/EnvironmentSelector';

const VIEWS = {
  SPLASH: 'splash',
  MENU: 'menu',
  GAME: 'game',
  GARAGE: 'garage',
  ENVIRONMENTS: 'environments',
};

const defaultSettings = {
  car: 'Porsche',
  environment: 'Modern City',
  weather: 'Sunny',
  camera: 'Third-person',
};

const CAR_LIST = ['Porsche', 'BMW', 'G-Wagon', 'Supra', 'Bolero', 'Mahindra Marshal'];
const ENV_LIST = ['Modern City', 'Indian Village', 'Highway', 'Local Market'];

function useHighestScore() {
  const [highest, setHighest] = useState(() => {
    const v = localStorage.getItem('highestScore');
    return v ? parseInt(v, 10) : 0;
  });
  useEffect(() => {
    localStorage.setItem('highestScore', String(highest));
  }, [highest]);
  return [highest, setHighest];
}

function Splash({ onContinue }) {
  useEffect(() => {
    const t = setTimeout(onContinue, 1400);
    return () => clearTimeout(t);
  }, [onContinue]);
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <HeroSpline overlayTitle="Realistic Drive India" overlaySubtitle="Created by Manmohan | Instagram @manxpaa" showOverlayCenter />
    </div>
  );
}

export default function App() {
  const [view, setView] = useState(VIEWS.SPLASH);
  const [mode, setMode] = useState('Endless Drive');
  const [settings, setSettings] = useState(defaultSettings);
  const [highestScore, setHighestScore] = useHighestScore();

  // Game state
  const [isPaused, setIsPaused] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(null); // {score}
  const [speed, setSpeed] = useState(60); // km/h
  const [nitro, setNitro] = useState(100);
  const [distance, setDistance] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // for Timed Challenge

  const rafRef = useRef();
  const lastTickRef = useRef(performance.now());

  // Simple engine audio using WebAudio
  const audio = useMemo(() => ({ ctx: null, osc: null, gain: null, on: false }), []);
  const setupAudio = () => {
    if (audio.ctx) return;
    try {
      audio.ctx = new (window.AudioContext || window.webkitAudioContext)();
      audio.osc = audio.ctx.createOscillator();
      audio.gain = audio.ctx.createGain();
      audio.osc.type = 'sawtooth';
      audio.gain.gain.value = 0.0001;
      audio.osc.connect(audio.gain).connect(audio.ctx.destination);
      audio.osc.start();
      audio.on = true;
    } catch (_) {}
  };
  const updateEngineSound = (spd) => {
    if (!audio.ctx || !audio.osc || !audio.gain) return;
    const rpmTone = 60 + (spd / 240) * 340; // 60-400 Hz
    audio.osc.frequency.setTargetAtTime(rpmTone, audio.ctx.currentTime, 0.05);
    const vol = 0.0008 + (spd / 240) * 0.01; // subtle
    audio.gain.gain.setTargetAtTime(vol, audio.ctx.currentTime, 0.1);
  };

  const startGame = (selectedMode) => {
    setMode(selectedMode || mode);
    setScore(0);
    setDistance(0);
    setNitro(100);
    setGameOver(null);
    setIsPaused(false);
    setIsRunning(true);
    if ((selectedMode || mode) === 'Timed Challenge') setTimeLeft(60);
    lastTickRef.current = performance.now();
    setupAudio();
    loop();
    setView(VIEWS.GAME);
  };

  const endGame = (finalScore) => {
    setIsRunning(false);
    setGameOver({ score: Math.round(finalScore) });
    setHighestScore((prev) => (finalScore > prev ? Math.round(finalScore) : prev));
    if (audio.gain) {
      try { audio.gain.gain.setTargetAtTime(0.0001, audio.ctx.currentTime, 0.2); } catch (_) {}
    }
  };

  const loop = () => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const now = performance.now();
      const dt = (now - lastTickRef.current) / 1000; // seconds
      lastTickRef.current = now;

      if (!isPaused && isRunning) {
        const metersPerSecond = (speed * 1000) / 3600; // km/h to m/s
        const addScore = Math.max(0.5, metersPerSecond / 10) * dt; // +1 per 10m approx
        setScore((s) => s + addScore);
        setDistance((d) => d + metersPerSecond * dt);
        updateEngineSound(speed);
        if (mode === 'Timed Challenge') {
          setTimeLeft((t) => {
            const nt = t - dt;
            if (nt <= 0) {
              endGame(score + addScore);
              return 0;
            }
            return nt;
          });
        }
      }
      if (isRunning) loop();
    });
  };

  useEffect(() => {
    const onKey = (e) => {
      if (view !== VIEWS.GAME) return;
      if (e.code === 'Space') {
        // Nitro
        setNitro((n) => (n > 0 ? n - 0.8 : 0));
        setSpeed((s) => Math.min(240, s + 4));
      }
      if (e.key === 'w' || e.key === 'W') setSpeed((s) => Math.min(240, s + 2));
      if (e.key === 's' || e.key === 'S') setSpeed((s) => Math.max(0, s - 4));
      if (e.key === 'c' || e.key === 'C') setSettings((p) => ({ ...p, camera: p.camera === 'Third-person' ? 'Cockpit' : 'Third-person' }));
      if (e.key === 'k' || e.key === 'K') endGame(score); // simulate crash
      if (e.key === 'Escape') setIsPaused((p) => !p);
      if (e.key === 'ArrowLeft') {/* left steer */}
      if (e.key === 'ArrowRight') {/* right steer */}
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [view, score, isRunning, mode]);

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleCrash = () => endGame(score);
  const handlePauseToggle = () => setIsPaused((p) => !p);
  const handleRestart = () => startGame(mode);
  const backToMenu = () => {
    setIsRunning(false);
    setIsPaused(false);
    setGameOver(null);
    setView(VIEWS.MENU);
  };

  return (
    <div className="relative min-h-screen w-full bg-neutral-950 text-white overflow-hidden">
      <AnimatePresence mode="wait">
        {view === VIEWS.SPLASH && (
          <motion.div key="splash" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
            <Splash onContinue={() => setView(VIEWS.MENU)} />
          </motion.div>
        )}

        {view === VIEWS.MENU && (
          <motion.div key="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0">
              <HeroSpline />
            </div>
            <div className="relative z-10">
              <MainMenu
                highestScore={highestScore}
                onStartEndless={() => startGame('Endless Drive')}
                onStartTimed={() => startGame('Timed Challenge')}
                onGarage={() => setView(VIEWS.GARAGE)}
                onEnv={() => setView(VIEWS.ENVIRONMENTS)}
                selectedCar={settings.car}
                selectedEnv={settings.environment}
              />
            </div>
          </motion.div>
        )}

        {view === VIEWS.GARAGE && (
          <motion.div key="garage" className="relative" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0">
              <HeroSpline subtle />
            </div>
            <div className="relative z-10">
              <Garage
                cars={CAR_LIST}
                selected={settings.car}
                onSelect={(car) => setSettings((p) => ({ ...p, car }))}
                onBack={() => setView(VIEWS.MENU)}
                onSelectConfirm={() => setView(VIEWS.MENU)}
              />
            </div>
          </motion.div>
        )}

        {view === VIEWS.ENVIRONMENTS && (
          <motion.div key="envs" className="relative" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0">
              <HeroSpline subtle />
            </div>
            <div className="relative z-10">
              <EnvironmentSelector
                environments={ENV_LIST}
                selected={settings.environment}
                onSelect={(environment) => setSettings((p) => ({ ...p, environment }))}
                onBack={() => setView(VIEWS.MENU)}
              />
            </div>
          </motion.div>
        )}

        {view === VIEWS.GAME && (
          <motion.div key="game" className="relative h-screen w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0">
              <HeroSpline />
            </div>
            <div className="relative z-10 h-full">
              <GameUI
                mode={mode}
                score={score}
                highestScore={highestScore}
                distance={distance}
                timeLeft={timeLeft}
                speed={speed}
                nitro={nitro}
                camera={settings.camera}
                car={settings.car}
                environment={settings.environment}
                weather={settings.weather}
                onSpeedChange={(v) => setSpeed(v)}
                onNitro={() => {
                  setNitro((n) => (n > 0 ? n - 5 : 0));
                  setSpeed((s) => Math.min(240, s + 15));
                }}
                onBrake={() => setSpeed((s) => Math.max(0, s - 20))}
                onAccel={() => setSpeed((s) => Math.min(240, s + 10))}
                onLeft={() => {}}
                onRight={() => {}}
                onPauseToggle={handlePauseToggle}
                onCrash={handleCrash}
                onCameraToggle={() => setSettings((p) => ({ ...p, camera: p.camera === 'Third-person' ? 'Cockpit' : 'Third-person' }))}
                onWeather={(w) => setSettings((p) => ({ ...p, weather: w }))}
              />
              <div className="pointer-events-none fixed bottom-2 right-2 text-xs text-white/70">Created by Manmohan | Instagram @manxpaa</div>
            </div>

            <PauseMenu open={isPaused} onResume={handlePauseToggle} onRestart={handleRestart} onMenu={backToMenu} />
            <GameOverModal
              open={!!gameOver}
              score={gameOver?.score || 0}
              highest={highestScore}
              onRestart={handleRestart}
              onMenu={backToMenu}
              onExit={() => window.close()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
