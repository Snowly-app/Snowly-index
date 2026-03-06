// Intentionally left blank or remove the lines


export function DownloadCTA() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/10 -z-10" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8 bg-white/5 border border-white/10 rounded-[3rem] p-12 md:p-20 backdrop-blur-xl shadow-2xl">
          <div className="w-16 h-16 mx-auto rounded-[1.2rem] overflow-hidden shadow-xl shadow-primary/20 flex items-center justify-center mb-8 bg-black/20 ring-1 ring-white/10">
            <img src="/logo-cold.png" alt="Snowly Logo" className="w-full h-full object-cover" />
          </div>

          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white">
            Ready to drop in?
          </h2>
          <p className="text-xl text-white/60 font-light max-w-xl mx-auto text-balance">
            Join thousands of skiers and riders who are already tracking their
            season with precision.
          </p>

          <div className="pt-8 flex flex-col items-center gap-6">
            <a href="#" className="inline-block transition-transform duration-300 hover:scale-[1.03] hover:brightness-110 active:scale-95">
              <img 
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" 
                alt="Download on the App Store" 
                className="h-[52px] md:h-[60px]" 
              />
            </a>
            <p className="text-xs font-semibold text-white/40 uppercase tracking-[0.2em]">
              Requires iOS 16.0 or later
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
