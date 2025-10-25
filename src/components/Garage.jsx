import { motion } from 'framer-motion';

export default function Garage({ cars, selected, onSelect, onSelectConfirm, onBack }) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex items-center justify-between p-6">
        <button onClick={onBack} className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20">← Back</button>
        <div className="text-sm text-white/70">3D Garage • Choose Your Car</div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-8 p-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="relative w-[92%] md:w-[560px] aspect-[16/9] rounded-3xl border border-white/10 bg-white/5 backdrop-blur overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.14),transparent_60%)]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-72 h-72 rounded-full border border-white/10 bg-white/5 animate-[spin_12s_linear_infinite]" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-72 h-2 rounded-full bg-black/70 blur" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-xl md:text-2xl font-semibold">{selected}</div>
          </div>
        </motion.div>

        <div className="w-[92%] md:w-80">
          <div className="text-sm text-white/70 mb-2">Available Cars</div>
          <div className="grid grid-cols-2 gap-2">
            {cars.map((c) => (
              <button key={c} onClick={() => onSelect(c)} className={`h-12 rounded-xl border ${selected === c ? 'border-emerald-500 bg-emerald-500/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}>{c}</button>
            ))}
          </div>
          <div className="mt-4 flex gap-3">
            <button onClick={onSelectConfirm} className="flex-1 h-12 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-semibold">Select Car</button>
            <button onClick={onBack} className="h-12 px-4 rounded-xl bg-white/10 hover:bg-white/20">Back</button>
          </div>
        </div>
      </div>

      <div className="pb-6 text-center text-xs text-white/70">Water-cooled lighting • Rotating platform • Soft reflections</div>
    </div>
  );
}
