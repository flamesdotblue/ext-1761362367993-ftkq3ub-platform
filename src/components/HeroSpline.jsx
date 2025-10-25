import Spline from '@splinetool/react-spline';

export default function HeroSpline({ overlayTitle, overlaySubtitle, showOverlayCenter = false, subtle = false }) {
  return (
    <div className="relative w-full h-screen">
      <Spline scene="https://prod.spline.design/m8wpIQzXWhEh9Yek/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      <div className={`pointer-events-none absolute inset-0 ${subtle ? 'bg-black/40' : 'bg-gradient-to-b from-black/60 via-black/10 to-black/80'}`}></div>
      {overlayTitle && (
        <div className={`pointer-events-none absolute w-full ${showOverlayCenter ? 'top-1/2 -translate-y-1/2' : 'top-24'} flex flex-col items-center gap-2 px-4` }>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-xl">{overlayTitle}</h1>
          {overlaySubtitle && <p className="text-white/80 text-sm md:text-base">{overlaySubtitle}</p>}
        </div>
      )}
    </div>
  );
}
