import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import BrandLogo from './BrandLogo';

interface NavbarProps {
  onDesktopSignUp: () => void;
  onMobileSignUp: () => void;
}

export default function Navbar({ onDesktopSignUp, onMobileSignUp }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileSignUp = () => {
    setMobileMenuOpen(false);
    onMobileSignUp();
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 transition-all">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid h-20 grid-cols-[1fr_auto_1fr] items-center md:hidden">
          <button
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="justify-self-start p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <a href="#home" className="group" aria-label="Dev Stack home">
            <BrandLogo compact className="transition-transform duration-200 group-hover:scale-105" />
          </a>

          <div className="flex items-center justify-self-end gap-1 sm:gap-2 whitespace-nowrap">
            <button type="button" className="text-slate-600 hover:text-slate-900 text-xs sm:text-sm font-semibold transition-colors">
              Sign In
            </button>
            <button onClick={handleMobileSignUp} className="brand-gradient text-white font-semibold text-xs sm:text-sm px-2 py-2 sm:px-3 rounded-full active:scale-95 transition-all duration-200">
              Sign Up
            </button>
          </div>
        </div>

        <div className="hidden md:flex items-center justify-between h-20">
          <a href="#home" className="group" aria-label="Dev Stack home">
            <BrandLogo className="transition-transform duration-200 group-hover:scale-105" />
          </a>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-600">
            <a href="#home" className="text-pink-600 transition-colors">Home</a>
            <a href="#explore" className="hover:text-pink-600 transition-colors">Technologies</a>
            <a href="#projects" className="hover:text-pink-600 transition-colors">Projects</a>
            <a href="#about" className="hover:text-pink-600 transition-colors">About</a>
            <a href="#contact" className="hover:text-pink-600 transition-colors">Contact</a>
          </nav>

          <div className="flex items-center space-x-5">
            <button type="button" className="text-slate-600 hover:text-slate-900 text-sm font-semibold transition-colors">
              Sign In
            </button>
            <button onClick={onDesktopSignUp} className="brand-gradient text-white font-semibold text-sm px-5 py-2.5 rounded-full hover:shadow-lg hover:shadow-pink-500/25 active:scale-95 transition-all duration-200">
              Sign Up
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-100 bg-white px-4 pt-2 pb-6 space-y-3 animate-fade-in">
          <a href="#home" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-pink-600 font-semibold text-base">Home</a>
          <a href="#explore" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700 hover:text-pink-600 font-medium text-base">Technologies</a>
          <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700 hover:text-pink-600 font-medium text-base">Projects</a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700 hover:text-pink-600 font-medium text-base">About</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700 hover:text-pink-600 font-medium text-base">Contact</a>
        </div>
      )}
    </header>
  );
}
