import { AnimatePresence, motion } from 'framer-motion';

export function GameOverModal({ open, score, highest, onRestart, onMenu, onExit }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="w-[92%] max-w-md rounded-2xl border border-white/10 bg-neutral-900/90 backdrop-blur p-6 text-center">
            <div className="text-3xl mb-2">💥 You Crashed! – Game Over</div>
            <div className="text-white/80 mb-6">Score: {Math.round(score)} | Highest: {highest}</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button onClick={onRestart} className="h-12 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-semibold">🔁 Restart</button>
              <button onClick={onMenu} className="h-12 rounded-xl bg-white/10 hover:bg-white/20 font-semibold">🏁 Main Menu</button>
              <button onClick={onExit} className="h-12 rounded-xl bg-red-600 hover:bg-red-500 font-semibold">🚪 Exit</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function PauseMenu({ open, onResume, onRestart, onMenu }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 10, opacity: 0 }} className="w-[92%] max-w-md rounded-2xl border border-white/10 bg-neutral-900/90 backdrop-blur p-6 text-center">
            <div className="text-2xl font-semibold mb-4">Game Paused</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button onClick={onResume} className="h-12 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-semibold">▶ Resume</button>
              <button onClick={onRestart} className="h-12 rounded-xl bg-white/10 hover:bg-white/20 font-semibold">🔁 Restart</button>
              <button onClick={onMenu} className="h-12 rounded-xl bg-red-600 hover:bg-red-500 font-semibold">🏁 Menu</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
