export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/50 py-12 md:py-16 backdrop-blur-3xl">
      <div className="container mx-auto px-6 flex flex-col items-center justify-between gap-6 md:flex-row text-sm text-white/50 bg-background/0">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center ring-1 ring-white/20">
            <img src="/logo-cold.png" alt="Snowly Logo" className="w-full h-full object-cover opacity-80" />
          </div>
          <span className="font-semibold text-lg tracking-tight text-white/80">
            Snowly
          </span>
        </div>

        <p>© {new Date().getFullYear()} Snowly Inc. All rights reserved.</p>

        <div className="flex gap-6 items-center">
          <a href="/#" className="hover:text-white transition-colors">
            Privacy
          </a>
          <a href="/#" className="hover:text-white transition-colors">
            Terms
          </a>
          <a href="https://github.com/Snowly-index" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
            GitHub
          </a>
          <a href="#" className="opacity-80 hover:opacity-100 transition-opacity ml-4">
             <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" className="h-8" />
          </a>
        </div>
      </div>
    </footer>
  );
}
