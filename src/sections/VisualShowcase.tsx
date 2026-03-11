import { useEffect, useRef } from 'react';

export function VisualShowcase() {
  const containerRef = useRef<HTMLElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const hoverSpotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const handleScrollAsync = () => {
      if (!containerRef.current || !mockupRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const progress = 1 - rect.bottom / (viewportHeight + rect.height);
      const clampedProgress = Math.min(Math.max((progress - 0.5) * 2, -1), 1);
      const newTilt = clampedProgress * 6; // Max tilt 6 degrees for subtitle elegance

      mockupRef.current.style.transform = `rotateX(${newTilt}deg) scale(1.02)`;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScrollAsync);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initialize initial state
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mockupRef.current || !hoverSpotRef.current) return;
    const rect = mockupRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    hoverSpotRef.current.style.opacity = '1';
    hoverSpotRef.current.style.background = `radial-gradient(400px circle at ${x}px ${y}px, rgba(255,255,255,0.15), transparent 40%)`;
  };

  const handleMouseLeave = () => {
    if (hoverSpotRef.current) {
      hoverSpotRef.current.style.opacity = '0';
    }
  };

  return (
    <section
      ref={containerRef}
      id="showcase"
      className="py-24 relative overflow-hidden bg-white perspective-[2000px]"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-slate-900">
            Your mountain, visualized.
          </h2>
          <p className="text-xl text-slate-500 font-light">
            Detailed run analysis with real-time speed curves, high-frequency
            GPS logging, and automatic run detection. Snowly turns your ride
            into hard numbers.
          </p>
        </div>

        <div className="relative mx-auto max-w-5xl flex justify-center items-center gap-8 md:gap-16 perspective-[2000px]">
          {/* Parallax Background Elements (Light Theme) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[160px] -z-10 mix-blend-multiply pointer-events-none" />

          {/* Main Device Mockup (iPhone) - keeping the device dark/sleek */}
          {/* biome-ignore lint/a11y/noStaticElementInteractions: Visual 3D tilt effect only */}
          <div
            ref={mockupRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative z-10 w-[340px] md:w-[380px] h-[720px] md:h-[800px] rounded-[3.5rem] md:rounded-[4rem] border-[14px] border-zinc-900 bg-black shadow-[0_30px_60px_rgba(0,0,0,0.15),inset_0_0_0_1px_rgba(255,255,255,0.1)] overflow-hidden transition-all duration-300 ease-out"
            style={{
              transformStyle: 'preserve-3d',
            }}
            role="presentation"
          >
            {/* Interactive Hover Spotlight */}
            <div
              ref={hoverSpotRef}
              className="absolute inset-0 pointer-events-none z-50 transition-opacity duration-300 opacity-0"
            />

            {/* Dynamic Island / Notch */}
            <div className="absolute top-0 inset-x-0 h-9 flex justify-center z-40 pointer-events-none">
              <div className="w-[120px] h-full bg-black rounded-b-3xl relative">
                <div className="absolute top-2 right-4 w-2.5 h-2.5 rounded-full bg-zinc-800 border border-zinc-700/50 shadow-inner flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-brand/40 blur-[0.5px]"></div>
                </div>
              </div>
            </div>

            {/* Inner frame/Screen Background (Actual Screenshot Area) */}
            <div className="absolute inset-0 bg-black overflow-hidden rounded-[2.8rem]">
              <img
                src="screenshot-iphone.png"
                alt="Snowly iPhone App Screenshot"
                className="w-full h-full object-cover scale-[1.01] transition-transform duration-[10s] group-hover:scale-100 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30 pointer-events-none" />
            </div>
          </div>

          {/* Apple Watch Mockup (Floating beside) */}
          <div className="hidden lg:block relative z-20 w-[180px] h-[220px] rounded-[2.5rem] border-[10px] border-zinc-800 bg-black shadow-[0_20px_50px_rgba(0,0,0,0.1),inset_0_0_0_1px_rgba(255,255,255,0.2)] transform -rotate-[10deg] hover:rotate-0 hover:scale-110 transition-all duration-700 ease-out translate-y-16 -ml-16 animate-float">
            {/* Crown */}
            <div className="absolute top-12 -right-[14px] w-3 h-10 bg-zinc-700 rounded-r-md border border-l-0 border-zinc-600 shadow-sm z-0"></div>
            {/* Side Button */}
            <div className="absolute bottom-16 -right-[12px] w-[10px] h-14 bg-zinc-800 rounded-r-sm z-0"></div>

            {/* Watch Screen Image Container */}
            <div className="absolute inset-0 bg-black overflow-hidden rounded-[2rem]">
              <img
                src="screenshot-watch.png"
                alt="Snowly Apple Watch App Screenshot"
                className="w-full h-full object-cover scale-[1.05] transition-transform duration-[10s] hover:scale-100 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/30 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
