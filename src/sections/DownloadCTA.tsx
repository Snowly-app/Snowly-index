export function DownloadCTA() {
  return (
    <section className="py-48 relative overflow-hidden bg-white">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-brand/10 rounded-full blur-[120px] -z-10 animate-pulse duration-[10s]" />

      {/* Decorative Ridge Line (Visual Connection) */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent opacity-50" />

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          {/* Enhanced Logo Presentation */}
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-brand/20 blur-2xl rounded-full scale-150 animate-pulse" />
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-[2.2rem] overflow-hidden shadow-2xl shadow-brand/20 flex items-center justify-center bg-white ring-1 ring-slate-100 relative z-10 hover:scale-105 transition-transform duration-700 ease-out">
              <img
                src="/favicon.png"
                alt="Snowly Logo"
                className="w-full h-full object-cover scale-110"
              />
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-slate-900 leading-[0.9]">
              Ready to <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-accent">
                drop in?
              </span>
            </h2>
            <p className="text-xl md:text-3xl text-slate-500 font-light max-w-2xl mx-auto text-balance leading-relaxed">
              Join thousands of skiers and riders who are already tracking their
              season with precision.
            </p>
          </div>

          <div className="pt-8 flex flex-col items-center gap-8 relative z-10">
            <a
              href="https://apps.apple.com"
              className="inline-block transition-all duration-500 hover:scale-[1.05] hover:brightness-110 active:scale-95 shadow-xl hover:shadow-2xl hover:shadow-brand/30 rounded-2xl"
            >
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="Download on the App Store"
                className="h-[64px] md:h-[72px]"
              />
            </a>
            <div className="flex flex-col items-center gap-2">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em]">
                Requires iOS 16.0 or later
              </p>
              <div className="w-8 h-px bg-slate-200" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
