import { useEffect, useRef, useState } from 'react';
import { ShareCard } from '../components/ShareCard';

export function ShareSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setScale(entry.contentRect.width / 1920);
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <section id="share" className="py-32 relative bg-slate-50 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand/5 rounded-full blur-3xl opacity-70 pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none text-slate-900 mb-6">
            Share the stoke.
          </h2>
          <p className="text-xl md:text-2xl text-slate-500 font-light max-w-2xl mx-auto">
            Export beautiful, data-rich cards of your best runs. Perfect for Instagram stories or flexing in the group chat.
          </p>
        </div>

        {/* 3D Showcase Wrapper */}
        <div className="relative mx-auto w-full max-w-[1000px] perspective-[2000px] group">
          <div 
            ref={containerRef}
            className="relative w-full aspect-[16/9] transition-all duration-700 ease-out 
                       transform-gpu rotate-x-2 rotate-y-[-4deg] md:scale-95
                       group-hover:rotate-x-0 group-hover:rotate-y-0 group-hover:scale-100"
            style={{
              transformStyle: 'preserve-3d',
              boxShadow: '0 50px 100px -20px rgba(58, 197, 249, 0.15), 0 30px 60px -30px rgba(0, 0, 0, 0.1)',
              borderRadius: `calc(1px * (64 * ${scale}))`, // Keep rounded corners proportional during scaling
            }}
          >
            {/* The scaled pixel-perfect card */}
            <div 
              className="absolute top-0 left-0 w-[1920px] h-[1080px] origin-top-left"
              style={{ transform: `scale(${scale})` }}
            >
              <ShareCard />
              {/* Glossy reflection overlay inside scaled area */}
              <div className="absolute inset-0 z-20 rounded-[64px] bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </div>
          </div>
          
          {/* Floor shadow */}
          <div className="absolute -bottom-10 left-10 right-10 h-8 bg-slate-900/10 blur-xl rounded-[100%] scale-100 md:group-hover:scale-95 transition-transform duration-700" />
        </div>
      </div>
    </section>
  );
}
