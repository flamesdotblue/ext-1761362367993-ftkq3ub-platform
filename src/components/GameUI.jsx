import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GameUI({
  mode,
  score,
  highestScore,
  distance,
  timeLeft,
  speed,
  nitro,
  camera,
  car,
  environment,
  weather,
  onSpeedChange,
  onNitro,
  onBrake,
  onAccel,
  onLeft,
  onRight,
  onPauseToggle,
  onCrash,
  onCameraToggle,
  onWeather,
}) {
  useEffect(() => {
    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
    onSpeedChange(clamp(speed, 0, 240));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speed]);

  return (
    <div className="relative h-full w-full">
      {/* HUD Top Bar */}
      <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 rounded-lg bg-white/10 backdrop-blur text-xs">Mode: {mode}</div>
          <div className="px-3 py-1 rounded-lg bg-white/10 backdrop-blur text-xs">Camera: {camera}</div>
          <div className="px-3 py-1 rounded-lg bg-white/10 backdrop-blur text-xs">Env: {environment}</div>
          <div className="px-3 py-1 rounded-lg bg-white/10 backdrop-blur text-xs">Weather: {weather}</div>
        </div>
        <button onClick={onPauseToggle} className="px-3 py-1 rounded-lg bg-white/15 hover:bg-white/25 transition text-sm">⏸️ Pause</button>
      </div>

      {/* Center Stats */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 text-center">
        <div className="text-[11px] text-white/70">Score</div>
        <div className="text-4xl font-bold tabular-nums">{Math.round(score)}</div>
        <div className="mt-1 text-xs text-white/70">Highest: {highestScore} • Dist: {Math.round(distance)}m {mode === 'Timed Challenge' ? `• Time: ${Math.max(0, Math.ceil(timeLeft))}s` : ''}</div>
      </div>

      {/* Right Panel Controls */}
      <div className="absolute right-3 top-24 w-56 bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-3 space-y-3">
        <div>
          <div className="text-xs text-white/70 mb-1">Speed: {Math.round(speed)} km/h</div>
          <input type="range" min={0} max={240} value={speed} onChange={(e) => onSpeedChange(Number(e.target.value))} className="w-full" />
        </div>
        <div>
          <div className="text-xs text-white/70 mb-1">Nitro</div>
          <div className="h-2 w-full rounded bg-white/10 overflow-hidden">
            <div className="h-full bg-fuchsia-500" style={{ width: `${nitro}%` }} />
          </div>
          <div className="mt-2 flex gap-2">
            <button onClick={onNitro} className="flex-1 h-9 rounded-lg bg-fuchsia-600 hover:bg-fuchsia-500 text-sm">Nitro (Space)</button>
            <button onClick={onCameraToggle} className="h-9 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-sm">C</button>
          </div>
        </div>
        <div>
          <div className="text-xs text-white/70 mb-1">Weather</div>
          <div className="grid grid-cols-3 gap-2">
            {['Sunny','Cloudy','Rainy'].map((w) => (
              <button key={w} onClick={() => onWeather(w)} className={`h-8 rounded-md text-xs ${weather === w ? 'bg-white/25' : 'bg-white/10 hover:bg-white/15'}`}>{w}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Controls */}
      <div className="absolute bottom-6 left-4 right-4 flex items-end justify-between gap-4">
        <div className="flex gap-3">
          <button onClick={onLeft} className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-2xl">⬅️</button>
          <button onClick={onRight} className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-2xl">➡️</button>
        </div>
        <div className="flex gap-3">
          <button onClick={onBrake} className="w-20 h-20 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-semibold">Brake</button>
          <button onClick={onAccel} className="w-20 h-20 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold">Speed</button>
        </div>
      </div>

      {/* Subtle developer crash button to showcase modal */}
      <div className="absolute bottom-2 left-2">
        <button onClick={onCrash} className="text-[10px] px-2 py-1 rounded bg-white/10 hover:bg-white/20">Simulate Crash</button>
      </div>

      {/* Cinematic bars toggle idea: camera view indicator */}
      <AnimatePresence>
        {camera === 'Cockpit' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} className="pointer-events-none absolute top-0 left-0 right-0 h-16 bg-black" />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {camera === 'Cockpit' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-black" />
        )}
      </AnimatePresence>

      {/* Watermark */}
      <div className="pointer-events-none absolute bottom-2 right-2 text-xs text-white/70">Created by Manmohan | Instagram @manxpaa</div>
    </div>
  );
}
