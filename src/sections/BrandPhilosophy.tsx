import { useEffect, useState, useRef } from 'react';

function AnimatedNumber({ end, isFloat = false, suffix = '', duration = 2000 }: { end: number, isFloat?: boolean, suffix?: string, duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTimestamp: number;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(easeProgress * end);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration, isVisible]);

  return <span ref={ref}>{isFloat ? count.toFixed(1) : Math.floor(count)}{suffix}</span>;
}

export function BrandPhilosophy() {
  return (
    <section
      id="philosophy"
      className="py-32 md:py-48 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-primary/5 -skew-y-3 origin-top-left -z-10" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Conceptual Large Typography Statement */}
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none text-white/90">
            It's not just a run. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              It's a statement.
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12 pt-8">
            <p className="text-xl md:text-2xl font-light text-white/60 leading-relaxed text-balance">
              We built Snowly for the obsessives. For the first-chair chasers
              and the backcountry explorers.
            </p>
            <p className="text-xl md:text-2xl font-light text-white/60 leading-relaxed text-balance">
              No clutter, no distractions. Just the pure data you need to push
              harder, go further, and carve your legacy on the mountain.
            </p>
          </div>

          <div className="pt-16 border-t border-white/10 flex flex-col sm:flex-row items-baseline gap-12 md:gap-24">
            <div className="space-y-3 relative group">
              <div className="absolute -inset-10 bg-primary/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
              <span className="text-6xl md:text-8xl font-black tracking-[-0.05em] text-transparent bg-clip-text bg-gradient-to-br from-white to-white/40 group-hover:from-white group-hover:to-primary/80 transition-all duration-500">
                <AnimatedNumber end={1.2} isFloat={true} suffix="M+" />
              </span>
              <p className="text-base font-semibold text-white/40 uppercase tracking-[0.2em]">
                Runs Tracked
              </p>
            </div>
            <div className="space-y-3 relative group">
              <div className="absolute -inset-10 bg-accent/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
              <span className="text-6xl md:text-8xl font-black tracking-[-0.05em] text-transparent bg-clip-text bg-gradient-to-br from-white to-white/40 group-hover:from-white group-hover:to-accent/80 transition-all duration-500">
                <AnimatedNumber end={48} suffix="M" duration={2500} />
              </span>
              <p className="text-base font-semibold text-white/40 uppercase tracking-[0.2em]">
                Vertical Feet
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
