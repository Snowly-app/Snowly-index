import { Apple, Github } from 'lucide-react';
import { Button } from '../components/ui/button';
import { GithubStatsBadge } from '../components/ui/github-stats';

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden pt-32 pb-24 bg-white">
      {/* Semi-transparent logo background watermark */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <img
          src="/favicon.png"
          alt="Snowly Logo Watermark"
          className="w-full max-w-[1400px] h-auto object-contain opacity-[0.15] scale-150 md:scale-[1.8] blur-[1px] md:-translate-y-12"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center space-y-10 animate-fade-in-up">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand/30 bg-white/60 backdrop-blur-xl text-xs font-semibold text-brand shadow-sm mb-4">
            <span className="flex h-1.5 w-1.5 rounded-full bg-brand animate-pulse shadow-[0_0_8px_var(--color-brand)]" />
            OPEN SOURCE SKI TRACKING
          </div>

          {/* Core Typography Hierarchy */}
          <div className="space-y-6 max-w-3xl flex flex-col items-center mt-4">
            <h1 className="text-[5rem] sm:text-[7rem] md:text-[8.5rem] font-sans font-bold tracking-tighter text-slate-900 leading-[0.85] pb-2">
              Snowly
            </h1>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-brand to-accent text-balance pb-1">
              Every run. Every meter.
            </h2>
            <p className="text-lg md:text-xl text-slate-500 max-w-xl text-center font-medium leading-relaxed text-balance pt-2">
              The open-source ski tracking app.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4 w-full sm:w-auto">
            <Button
              size="lg"
              className="h-14 md:h-16 px-8 w-full sm:w-[220px] text-base md:text-lg font-semibold rounded-full bg-brand text-white hover:bg-brand/90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_8px_30px_var(--color-brand)] group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[150%] skew-x-[-15deg] group-hover:animate-[shimmer_1.5s_infinite]" />
              <Apple className="mr-2 h-5 w-5 md:h-6 md:w-6 relative z-10" />
              <span className="relative z-10">Get the App</span>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="h-14 md:h-16 px-8 w-full sm:w-[220px] text-base md:text-lg font-semibold rounded-full border border-slate-200/80 bg-white/40 backdrop-blur-md text-slate-700 hover:bg-white/80 hover:border-slate-300 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-sm group"
              onClick={() =>
                window.open('https://github.com/Snowly-index', '_blank')
              }
            >
              <Github className="mr-2 w-5 h-5 md:w-6 md:h-6 text-slate-700 group-hover:text-slate-900 transition-colors" />
              View on GitHub
            </Button>
          </div>

          <div className="pt-2 flex flex-col items-center gap-4 opacity-80 hover:opacity-100 transition-opacity duration-300">
            <GithubStatsBadge repo="Snowly-index/Snowly-index" />
            <span className="text-xs font-medium text-slate-400 tracking-wider uppercase">
              Built for skiers
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(150%) skewX(-15deg); }
        }
      `}</style>
    </section>
  );
}
