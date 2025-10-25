import { motion } from 'framer-motion';

export default function MainMenu({ highestScore, onStartEndless, onStartTimed, onGarage, onEnv, selectedCar, selectedEnv }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between">
      <div className="w-full flex items-center justify-between px-6 pt-6">
        <div className="text-xs md:text-sm text-white/70">Highest Score: <span className="font-semibold text-white">{highestScore}</span></div>
        <div className="text-xs md:text-sm text-white/70">Created by Manmohan | Instagram @manxpaa</div>
      </div>

      <div className="flex-1 w-full flex items-center justify-center">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 md:p-10 w-[92%] md:w-[720px]">
          <h2 className="text-3xl md:text-5xl font-bold mb-1">Realistic Drive India</h2>
          <p className="text-white/70 mb-6">Hyper-realistic 3D Racing & Survival • 60 FPS • PC + Mobile</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button onClick={onStartEndless} className="h-14 rounded-xl bg-emerald-600 hover:bg-emerald-500 transition font-semibold">🏁 Start Endless Drive</button>
            <button onClick={onStartTimed} className="h-14 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition font-semibold">⏱️ Timed Challenge</button>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <button onClick={onGarage} className="h-12 rounded-xl bg-white/10 hover:bg-white/20 transition">🚗 Choose Car • <span className="text-white/80">{selectedCar}</span></button>
            <button onClick={onEnv} className="h-12 rounded-xl bg-white/10 hover:bg-white/20 transition">🌆 Environment • <span className="text-white/80">{selectedEnv}</span></button>
          </div>

          <div className="mt-6 text-xs text-white/60 leading-relaxed">
            Controls: PC → Arrow keys steer, W accelerate, S brake, Space nitro, C camera, Esc pause. Mobile → On-screen buttons.
          </div>
        </motion.div>
      </div>

      <div className="w-full flex items-center justify-center pb-6 text-white/70 text-xs">© {new Date().getFullYear()} Realistic Drive India</div>
    </div>
  );
}
