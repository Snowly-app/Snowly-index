import { Apple, Github, Menu } from 'lucide-react';
import { Button } from '../ui/button';

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Provided Logo */}
          <div className="w-8 h-8 rounded-full overflow-hidden shadow-sm flex items-center justify-center bg-white ring-1 ring-slate-200">
            <img
              src="/favicon.png"
              alt="Snowly Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-bold text-xl tracking-tight text-foreground">
            Snowly
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#showcase"
            className="text-sm font-medium text-slate-600 hover:text-brand transition-colors"
          >
            Experience
          </a>
          <a
            href="#features"
            className="text-sm font-medium text-slate-600 hover:text-brand transition-colors"
          >
            Features
          </a>
          <a
            href="#faq"
            className="text-sm font-medium text-slate-600 hover:text-brand transition-colors"
          >
            FAQ
          </a>
          <a
            href="#community"
            className="text-sm font-medium text-slate-600 hover:text-brand transition-colors"
          >
            Community
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex text-slate-600 hover:text-brand hover:bg-transparent"
            onClick={() =>
              window.open('https://github.com/Snowly-index', '_blank')
            }
          >
            <Github className="w-5 h-5" />
          </Button>
          <Button
            size="icon"
            className="hidden md:flex rounded-full group transition-all duration-300 shadow-sm border-transparent hover:scale-105 active:scale-95 bg-brand text-white hover:bg-brand/90"
            aria-label="Get App"
          >
            <Apple className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-foreground w-10 h-10 hover:bg-slate-100 rounded-full"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
