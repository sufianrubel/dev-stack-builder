import logoText from '../assets/logo-text.png';

interface FooterProps {
  onOpenDocs: () => void;
}

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/sufianrubel' },
  { name: 'Twitter', href: 'https://x.com/abu_nstu27' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/sufianrubel' },
];

export default function Footer({ onOpenDocs }: FooterProps) {
  return (
    <footer className="bg-white border-t border-slate-100 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-100">
          <div className="md:col-span-6 space-y-4">
            <a href="#home" className="inline-block" aria-label="Dev Stack home">
              <img src={logoText} alt="Dev Stack" className="h-7 w-auto" />
            </a>
            <p className="text-slate-500 text-xs leading-relaxed max-w-sm">
              Curated tools, technologies, and resources for developers building modern software.
            </p>
            <div className="flex items-center space-x-4 text-xs font-medium text-slate-400 pt-1">
              {socialLinks.map(({ name, href }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-600 transition-colors"
                >
                  {name}
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900">Product</h5>
            <ul className="space-y-2 text-xs text-slate-500">
              <li><a href="#home" className="hover:text-pink-600">Home</a></li>
              <li><a href="#explore" className="hover:text-pink-600">Technologies</a></li>
              <li><a href="#projects" className="hover:text-pink-600">Projects</a></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900">Company</h5>
            <ul className="space-y-2 text-xs text-slate-500">
              <li><button onClick={onOpenDocs} className="hover:text-pink-600 text-left">About</button></li>
              <li><a href="#contact" className="hover:text-pink-600">Contact</a></li>
              <li><a href="#careers" className="hover:text-pink-600">Careers</a></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900">Legal</h5>
            <ul className="space-y-2 text-xs text-slate-500">
              <li><a href="#privacy" className="hover:text-pink-600">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-pink-600">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} DevStack. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <a href="#privacy" className="hover:text-slate-600">Privacy</a>
            <a href="#terms" className="hover:text-slate-600">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
