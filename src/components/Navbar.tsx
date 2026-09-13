import { Menu, X } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  onOpenDocs: () => void;
  onDesktopSignUp: () => void;
  onMobileSignUp: () => void;
}

export default function Navbar({ onOpenDocs, onDesktopSignUp, onMobileSignUp }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileSignUp = () => {
    setMobileMenuOpen(false);
    onMobileSignUp();
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 transition-all">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#home" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 via-pink-500 to-violet-600 flex items-center justify-center shadow-md shadow-pink-500/20 group-hover:scale-105 transition-transform duration-200">
              <span className="text-white font-extrabold text-lg tracking-tight">DS</span>
            </div>
            <div className="flex items-center text-2xl font-black tracking-tight">
              <span className="text-slate-900">Dev</span>
              <span className="bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent ml-1">Stack</span>
            </div>
          </a>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-600">
            <a href="#home" className="text-pink-600 transition-colors">Home</a>
            <a href="#explore" className="hover:text-pink-600 transition-colors">Technologies</a>
            <a href="#projects" className="hover:text-pink-600 transition-colors">Projects</a>
            <a href="#about" className="hover:text-pink-600 transition-colors">About</a>
            <a href="#contact" className="hover:text-pink-600 transition-colors">Contact</a>
          </nav>

          <div className="hidden md:flex items-center space-x-5">
            <button onClick={onOpenDocs} className="text-slate-600 hover:text-slate-900 text-sm font-semibold transition-colors">
              Sign In
            </button>
            <button onClick={onDesktopSignUp} className="bg-gradient-to-r from-orange-500 via-pink-500 to-violet-600 text-white font-semibold text-sm px-5 py-2.5 rounded-full hover:shadow-lg hover:shadow-pink-500/25 active:scale-95 transition-all duration-200">
              Sign Up
            </button>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
          <div className="pt-4 border-t border-slate-100 flex flex-col space-y-2">
            <button onClick={onOpenDocs} className="w-full text-center py-2.5 text-slate-700 font-semibold border border-slate-200 rounded-xl">Sign In</button>
            <button onClick={handleMobileSignUp} className="w-full text-center py-2.5 bg-gradient-to-r from-orange-500 via-pink-500 to-violet-600 text-white font-semibold rounded-xl">Sign Up</button>
          </div>
        </div>
      )}
    </header>
  );
}
