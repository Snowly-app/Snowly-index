export function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white py-12 md:py-16">
      <div className="container mx-auto px-6 flex flex-col items-center justify-between gap-6 md:flex-row text-sm text-slate-500">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center ring-1 ring-slate-200">
            <img
              src="/favicon.png"
              alt="Snowly Logo"
              className="w-full h-full object-cover opacity-80"
            />
          </div>
          <span className="font-semibold text-lg tracking-tight text-slate-800">
            Snowly
          </span>
        </div>

        <p>© {new Date().getFullYear()} Snowly Inc. All rights reserved.</p>

        <div className="flex gap-6 items-center">
          <a href="/#" className="hover:text-brand transition-colors">
            Privacy
          </a>
          <a href="/#" className="hover:text-brand transition-colors">
            Terms
          </a>
          <a
            href="https://github.com/Snowly-index"
            target="_blank"
            rel="noreferrer"
            className="hover:text-brand transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://apps.apple.com"
            className="opacity-80 hover:opacity-100 transition-opacity"
          >
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="App Store"
              className="h-8"
            />
          </a>
          <a
            href="https://www.buymeacoffee.com/lijichen36w"
            target="_blank"
            rel="noreferrer"
            className="hover:opacity-90 transition-opacity"
          >
            <img 
              src="https://cdn.buymeacoffee.com/buttons/v2/default-blue.png" 
              alt="Buy Me A Coffee" 
              className="h-8"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
