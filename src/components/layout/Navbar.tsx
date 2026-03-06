import { Download, Menu, Github } from 'lucide-react';
import { Button } from '../ui/button';

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Provided Logo */}
          <div className="w-8 h-8 rounded-full overflow-hidden shadow-lg shadow-primary/20 flex items-center justify-center bg-transparent ring-1 ring-white/20">
            <img src="/logo-cold.png" alt="Snowly Logo" className="w-full h-full object-cover" />
          </div>
          <span className="font-semibold text-xl tracking-tight text-white">
            Snowly
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-sm font-medium text-white/70 hover:text-white transition-colors"
          >
            Features
          </a>
          <a
            href="#preview"
            className="text-sm font-medium text-white/70 hover:text-white transition-colors"
          >
            Experience
          </a>
          <a
            href="#philosophy"
            className="text-sm font-medium text-white/70 hover:text-white transition-colors"
          >
            Philosophy
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex text-white/70 hover:text-white"
            onClick={() => window.open('https://github.com/Snowly-index', '_blank')}
          >
            <Github className="w-5 h-5" />
          </Button>
          <Button className="hidden md:flex gap-2 group transition-all duration-300">
            Get App{' '}
            <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white w-10 h-10"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
