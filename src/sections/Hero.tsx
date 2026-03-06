import { Apple, Github } from 'lucide-react';
import { Button } from '../components/ui/button';
import { GithubStatsBadge } from '../components/ui/github-stats';

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden pt-20">
      {/* Advanced Gradient Mesh Background Elements */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-primary/10 via-transparent to-transparent -z-20" />
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[140px] -z-10 mix-blend-screen opacity-60 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[140px] -z-10 mix-blend-screen opacity-40" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium text-white/80 mb-4 transition-transform hover:scale-105 cursor-default">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(var(--color-primary),0.8)]" />
            100% Open Source & Privacy-First Tracking
          </div>

          <h1 className="text-7xl md:text-9xl font-black tracking-[-0.05em] text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/40 leading-[0.95] pb-2">
            Track your mountain, <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-accent">
              own your line.
            </span>
          </h1>

          <p className="text-xl md:text-3xl text-white/50 max-w-3xl mx-auto font-light leading-relaxed text-balance">
            The definitive ski tracking experience. GPS performance, advanced
            telemetry, and stunning visualization—built for the precision
            athlete.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
            <Button
              size="lg"
              className="h-16 px-10 w-full sm:w-auto text-lg font-semibold rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)] group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[150%] skew-x-[-15deg] group-hover:animate-[shimmer_2s_infinite]" />
              <Apple className="mr-3 h-6 w-6 relative z-10" />
              <span className="relative z-10">Download on App Store</span>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-16 px-10 w-full sm:w-auto text-lg font-semibold rounded-2xl border-white/10 bg-transparent text-white/70 hover:bg-white/5 hover:text-white hover:border-white/20 transition-all hover:scale-105 active:scale-95 group"
              onClick={() => window.open('https://github.com/Snowly-index', '_blank')}
            >
              <Github className="mr-3 w-6 h-6" />
              View Source
            </Button>
          </div>
          <GithubStatsBadge repo="Snowly-index/Snowly-index" />
        </div>

      </div>
    </section>
  );
}
