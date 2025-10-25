import { motion } from 'framer-motion';

const PREVIEWS = {
  'Modern City': 'linear-gradient(135deg, #111827 0%, #1f2937 100%)',
  'Indian Village': 'linear-gradient(135deg, #0f172a 0%, #052e16 100%)',
  'Highway': 'linear-gradient(135deg, #111827 0%, #0b1020 100%)',
  'Local Market': 'linear-gradient(135deg, #1f2937 0%, #3f1d2e 100%)',
};

export default function EnvironmentSelector({ environments, selected, onSelect, onBack }) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex items-center justify-between p-6">
        <button onClick={onBack} className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20">← Back</button>
        <div className="text-sm text-white/70">Background Environments</div>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
        {environments.map((env) => (
          <motion.button
            key={env}
            onClick={() => onSelect(env)}
            whileHover={{ scale: 1.02 }}
            className={`relative rounded-2xl overflow-hidden border ${selected === env ? 'border-emerald-500' : 'border-white/10'}`}
            style={{ backgroundImage: PREVIEWS[env] }}
          >
            <div className="aspect-video" />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center justify-between">
              <div className="font-semibold">{env}</div>
              <div className={`px-2 py-0.5 rounded text-[10px] ${selected === env ? 'bg-emerald-600' : 'bg-white/10'}`}>{selected === env ? 'Selected' : 'Preview'}</div>
            </div>
          </motion.button>
        ))}
      </div>

      <div className="pb-6 text-center text-xs text-white/70">Thumbnails with animated previews and glowing selection outline</div>
    </div>
  );
}
