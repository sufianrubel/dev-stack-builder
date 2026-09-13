import { useEffect, useMemo, useState } from 'react';
import {
  AlertCircle, BookOpen, Check, Copy, Layers, Menu, Search, Star, X,
} from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bannerStack from './assets/banner-stack.png';

interface TechnologyJson {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  rating: number;
  difficulty: string;
  badge: string;
}

type Technology = TechnologyJson;

const isTechnology = (value: unknown): value is Technology => {
  if (typeof value !== 'object' || value === null) return false;

  const item = value as Record<string, unknown>;
  return typeof item.id === 'string'
    && typeof item.name === 'string'
    && typeof item.category === 'string'
    && typeof item.description === 'string'
    && typeof item.icon === 'string'
    && typeof item.rating === 'number'
    && typeof item.difficulty === 'string'
    && typeof item.badge === 'string';
};

export default function App() {
  // Application State
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [selectedStack, setSelectedStack] = useState<Technology[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showReadmeModal, setShowReadmeModal] = useState(false);
  const [copyingConfig, setCopyingConfig] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const loadTechnologies = async () => {
      try {
        setIsLoading(true);
        setLoadError(null);
        const response = await fetch('/data/technologies.json', { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Unable to load technologies (${response.status}).`);
        }

        const data: unknown = await response.json();
        if (!Array.isArray(data) || !data.every(isTechnology)) {
          throw new Error('Technology data has an invalid format.');
        }

        setTechnologies(data);
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setLoadError(error instanceof Error ? error.message : 'Unable to load technologies.');
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    void loadTechnologies();
    return () => controller.abort();
  }, []);

  const categories = useMemo(
    () => ['All', ...new Set(technologies.map((technology) => technology.category))],
    [technologies],
  );

  // Stack Interactions
  const handleAddToStack = (tech: Technology) => {
    const exists = selectedStack.some(item => item.id === tech.id);
    if (exists) {
      toast.warning(`"${tech.name}" is already added to your stack!`);
      return;
    }
    setSelectedStack(prev => [...prev, tech]);
    toast.success(`Added ${tech.name} to your stack!`);
  };

  const handleRemoveFromStack = (techId: string, techName: string) => {
    setSelectedStack(prev => prev.filter(item => item.id !== techId));
    toast.info(`Removed ${techName} from stack`);
  };

  const handleClearStack = () => {
    if (selectedStack.length === 0) return;
    setSelectedStack([]);
    toast.error('Cleared all items from your stack');
  };

  const handleCopyStackJSON = async () => {
    const jsonString = JSON.stringify(
      selectedStack.map(s => ({ id: s.id, name: s.name, category: s.category })),
      null, 2
    );
    try {
      await navigator.clipboard.writeText(jsonString);
      setCopyingConfig(true);
      toast.success('Stack JSON configuration copied to clipboard!');
      window.setTimeout(() => setCopyingConfig(false), 2000);
    } catch {
      toast.error('Could not copy the stack configuration.');
    }
  };

  // Filtered Technologies
  const filteredTechs = useMemo(() => {
    return technologies.filter(tech => {
      const matchesSearch = tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            tech.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            tech.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || tech.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [technologies, searchQuery, activeCategory]);

  // Track completeness score
  const categoryCoverage = useMemo(() => {
    const categoriesPresent = new Set(selectedStack.map(s => s.category));
    return {
      frontend: categoriesPresent.has('Frontend'),
      backend: categoriesPresent.has('Backend'),
      database: categoriesPresent.has('Database'),
      language: categoriesPresent.has('Language')
    };
  }, [selectedStack]);

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans antialiased flex flex-col selection:bg-pink-100 selection:text-pink-600">
      
      <ToastContainer position="top-right" autoClose={3200} theme="dark" />

      {/* STICKY HEADER NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 transition-all">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Brand Logo */}
            <a href="#home" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 via-pink-500 to-violet-600 flex items-center justify-center shadow-md shadow-pink-500/20 group-hover:scale-105 transition-transform duration-200">
                <span className="text-white font-extrabold text-lg tracking-tight">DS</span>
              </div>
              <div className="flex items-center text-2xl font-black tracking-tight">
                <span className="text-slate-900">Dev</span>
                <span className="bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent ml-1">Stack</span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-600">
              <a href="#home" className="text-pink-600 transition-colors">Home</a>
              <a href="#explore" className="hover:text-pink-600 transition-colors">Technologies</a>
              <a href="#projects" className="hover:text-pink-600 transition-colors">Projects</a>
              <a href="#about"  className="hover:text-pink-600 transition-colors">About</a>
              <a href="#contact" className="hover:text-pink-600 transition-colors">Contact</a>
            </nav>

            {/* Header Right Actions */}
            <div className="hidden md:flex items-center space-x-5">
              <button 
                onClick={() => setShowReadmeModal(true)} 
                className="text-slate-600 hover:text-slate-900 text-sm font-semibold transition-colors"
              >
                Sign In
              </button>
              <button 
                onClick={() => toast.info('Welcome to Dev Stack! Explore technology cards below.')}
                className="bg-gradient-to-r from-orange-500 via-pink-500 to-violet-600 text-white font-semibold text-sm px-5 py-2.5 rounded-full hover:shadow-lg hover:shadow-pink-500/25 active:scale-95 transition-all duration-200"
              >
                Sign Up
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-100 bg-white px-4 pt-2 pb-6 space-y-3 animate-fade-in">
            <a href="#home" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-pink-600 font-semibold text-base">Home</a>
            <a href="#explore" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700 hover:text-pink-600 font-medium text-base">Technologies</a>
            <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700 hover:text-pink-600 font-medium text-base">Projects</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700 hover:text-pink-600 font-medium text-base">About</a>
            <div className="pt-4 border-t border-slate-100 flex flex-col space-y-2">
              <button onClick={() => setShowReadmeModal(true)} className="w-full text-center py-2.5 text-slate-700 font-semibold border border-slate-200 rounded-xl">Sign In</button>
              <button onClick={() => { setMobileMenuOpen(false); toast.success('Signed Up successfully!'); }} className="w-full text-center py-2.5 bg-gradient-to-r from-orange-500 via-pink-500 to-violet-600 text-white font-semibold rounded-xl">Sign Up</button>
            </div>
          </div>
        )}
      </header>

      {}
      <section id="home" className="relative pt-12 pb-20 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                Build Your Ideal{' '}
                <span className="block mt-1 bg-gradient-to-r from-orange-500 via-pink-500 to-violet-600 bg-clip-text text-transparent">
                  Development Stack
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl">
                Explore frontend, backend, database, and tooling options, compare them side by side, and put together the stack that fits your next project.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="#explore"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 via-pink-500 to-violet-600 text-white font-bold text-base px-7 py-3.5 rounded-full shadow-lg shadow-pink-500/25 hover:shadow-xl hover:shadow-pink-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                >
                  Explore Technologies
                </a>
                <button
                  onClick={() => setShowReadmeModal(true)}
                  className="inline-flex items-center justify-center bg-white text-slate-700 font-semibold text-base px-7 py-3.5 rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-200"
                >
                  Learn More
                </button>
              </div>
            </div>

            {/* Right Hero Graphic */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
              <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
                
                {/* Stack Banner */}
                <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
                  <img
                    src={bannerStack}
                    alt="Illustration of a modern development technology stack"
                    className="w-full h-full max-h-[380px] object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {}
      <section id="explore" className="py-12 bg-slate-50/60 border-t border-slate-100 flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading */}
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Explore the{' '}
              <span className="bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">
                Technologies
              </span>
            </h2>
            <p className="mt-2 text-slate-600 text-base">
              Pick one technology per category to build your ideal stack.
            </p>
          </div>

          {/* Search & Category Filter Toolbar */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              
              {/* Category Pills */}
              <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
                {categories.map(category => {
                  const isActive = activeCategory === category;
                  return (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                        isActive 
                          ? 'bg-slate-900 text-white shadow-md' 
                          : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>

              {/* Search Box */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search technologies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/30 focus:border-pink-500 transition-all placeholder:text-slate-400"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

            </div>
          </div>

          {/* Main Layout Grid: Mobile 12/12, Tablet 8/4, Desktop 9/3 */}
          <div className="grid grid-cols-12 gap-8 items-start">
            
            {/* LEFT: 3-Column Cards Grid */}
            <div className="col-span-12 md:col-span-8 lg:col-span-9">
              {isLoading ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-sm" role="status" aria-live="polite">
                  <div className="w-10 h-10 mx-auto mb-4 rounded-full border-4 border-slate-200 border-t-pink-500 animate-spin" />
                  <p className="text-sm font-semibold text-slate-600">Loading technologies...</p>
                </div>
              ) : loadError ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-rose-200 shadow-sm" role="alert">
                  <AlertCircle className="w-10 h-10 mx-auto mb-3 text-rose-500" />
                  <h3 className="text-lg font-bold text-slate-900">Could not load technologies</h3>
                  <p className="text-slate-500 text-sm mt-1">{loadError}</p>
                </div>
              ) : filteredTechs.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-sm">
                  <div className="w-12 h-12 bg-pink-50 text-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Search className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">No technologies found</h3>
                  <p className="text-slate-500 text-sm mt-1">Try adjusting your search query or category filter.</p>
                  <button 
                    onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                    className="mt-4 text-xs font-semibold text-pink-600 hover:underline"
                  >
                    Reset filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredTechs.map(tech => {
                    const isAdded = selectedStack.some(item => item.id === tech.id);
                    return (
                      <div
                        key={tech.id}
                        className="bg-white rounded-2xl border border-slate-200/90 p-5 flex flex-col justify-between hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-200 group relative"
                      >
                        <div>
                          {/* Card Header: Icon & Top Right Badge */}
                          <div className="flex items-start justify-between mb-3">
                            <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                              <img src={tech.icon} alt={`${tech.name} icon`} className="w-7 h-7 object-contain" loading="lazy" />
                            </div>
                            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full border bg-pink-50 text-pink-600 border-pink-200">
                              {tech.badge}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="text-lg font-bold text-slate-900 mb-1.5">
                            {tech.name}
                          </h3>

                          {/* Short Description */}
                          <p className="text-slate-500 text-xs leading-relaxed mb-4 min-h-[3rem] line-clamp-3">
                            {tech.description}
                          </p>

                          {/* Tags & Meta Info */}
                          <div className="flex flex-wrap items-center gap-2 mb-5 text-[11px] text-slate-500">
                            <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                              {tech.category}
                            </span>
                            <span className="text-slate-400">•</span>
                            <span>{tech.difficulty}</span>
                            <span className="text-slate-400">•</span>
                            <span className="flex items-center text-amber-500 font-semibold">
                              <Star className="w-3 h-3 fill-amber-400 mr-0.5" />
                              {tech.rating}
                            </span>
                          </div>
                        </div>

                        {/* Add to Stack Button */}
                        <button
                          onClick={() => handleAddToStack(tech)}
                          className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center transition-all duration-200 active:scale-[0.98] ${
                            isAdded
                              ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                              : 'bg-slate-950 text-white hover:bg-slate-800 shadow-sm'
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-600 stroke-[3]" />
                              Added to Stack
                            </>
                          ) : (
                            'Add to Stack'
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {}
            <div className="col-span-12 md:col-span-4 lg:col-span-3 md:sticky md:top-28">
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm">
                
                {/* Sidebar Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Your Stack</h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      {selectedStack.length} {selectedStack.length === 1 ? 'Technology' : 'Technologies'} Selected
                    </p>
                  </div>
                  {selectedStack.length > 0 && (
                    <button
                      onClick={handleCopyStackJSON}
                      title={copyingConfig ? 'Copied!' : 'Export Stack Config'}
                      className="p-2 text-slate-400 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors"
                    >
                      {copyingConfig ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  )}
                </div>

                {/* Stack Items List */}
                <div className="py-4 space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                  {selectedStack.length === 0 ? (
                    <div className="py-8 text-center text-slate-400">
                      <Layers className="w-8 h-8 mx-auto mb-2 opacity-40" />
                      <p className="text-xs font-medium">Your stack is currently empty.</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">Click "Add to Stack" on any card.</p>
                    </div>
                  ) : (
                    selectedStack.map(tech => (
                      <div
                        key={tech.id}
                        className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200/80 bg-white hover:border-slate-300 transition-all group"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                            <img src={tech.icon} alt="" className="w-5 h-5 object-contain" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-slate-900 leading-none">{tech.name}</h4>
                            <span className="text-[10px] text-slate-400 font-medium">{tech.category}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleRemoveFromStack(tech.id, tech.name)}
                          className="p-1 text-slate-300 hover:text-slate-600 rounded-md transition-colors"
                          aria-label={`Remove ${tech.name}`}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {/* Stack Coverage Insights */}
                {selectedStack.length > 0 && (
                  <div className="pt-3 pb-2 border-t border-slate-100">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                      Stack Coverage
                    </span>
                    <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                      <div className={`px-2 py-1 rounded flex items-center justify-between ${categoryCoverage.frontend ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-50 text-slate-400'}`}>
                        <span>Frontend</span>
                        {categoryCoverage.frontend && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div className={`px-2 py-1 rounded flex items-center justify-between ${categoryCoverage.backend ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-50 text-slate-400'}`}>
                        <span>Backend</span>
                        {categoryCoverage.backend && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div className={`px-2 py-1 rounded flex items-center justify-between ${categoryCoverage.database ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-50 text-slate-400'}`}>
                        <span>Database</span>
                        {categoryCoverage.database && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div className={`px-2 py-1 rounded flex items-center justify-between ${categoryCoverage.language ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-50 text-slate-400'}`}>
                        <span>Language</span>
                        {categoryCoverage.language && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  </div>
                )}

                {/* Remove All Action Button */}
                <div className="pt-3 border-t border-slate-100">
                  <button
                    onClick={handleClearStack}
                    disabled={selectedStack.length === 0}
                    className={`w-full py-2.5 rounded-xl border font-semibold text-xs transition-all duration-200 ${
                      selectedStack.length === 0
                        ? 'border-slate-200 text-slate-300 cursor-not-allowed'
                        : 'border-slate-200 text-rose-500 hover:border-rose-200 hover:bg-rose-50/50'
                    }`}
                  >
                    Remove All
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {}
      <footer className="bg-white border-t border-slate-100 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-100">
            
            {/* Brand Info */}
            <div className="md:col-span-6 space-y-4">
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-orange-500 via-pink-500 to-violet-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">DS</span>
                </div>
                <span className="text-lg font-black tracking-tight text-slate-900">
                  Dev <span className="bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">Stack</span>
                </span>
              </div>
              <p className="text-slate-500 text-xs leading-relaxed max-w-sm">
                Curated tools, technologies, and resources for developers building modern software.
              </p>
              <div className="flex items-center space-x-4 text-xs font-medium text-slate-400 pt-1">
                <a href="#github" onClick={(e) => { e.preventDefault(); toast.info('GitHub repo link clicked'); }} className="hover:text-pink-600 transition-colors">GitHub</a>
                <a href="#twitter" onClick={(e) => { e.preventDefault(); toast.info('Twitter profile link clicked'); }} className="hover:text-pink-600 transition-colors">Twitter</a>
                <a href="#linkedin" onClick={(e) => { e.preventDefault(); toast.info('LinkedIn profile link clicked'); }} className="hover:text-pink-600 transition-colors">LinkedIn</a>
              </div>
            </div>

            {/* Links Columns */}
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
                <li><button onClick={() => setShowReadmeModal(true)} className="hover:text-pink-600 text-left">About</button></li>
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

      {}
      {showReadmeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-slate-100 flex flex-col">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-pink-600" />
                <h3 className="text-lg font-bold text-slate-900">Project README & React Q&A Documentation</h3>
              </div>
              <button 
                onClick={() => setShowReadmeModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content - README Document */}
            <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-600 leading-relaxed font-sans">
              
              {/* Overview */}
              <div>
                <h4 className="text-base font-bold text-slate-900 border-b pb-1 mb-2"># Dev Stack Technology Explorer</h4>
                <p>
                  A pixel-perfect, production-grade interactive React web application designed to help software engineers explore, compare, and assemble their ideal technology stacks dynamically.
                </p>
              </div>

              {/* Technologies Used */}
              <div>
                <h4 className="text-base font-bold text-slate-900 border-b pb-1 mb-2">🚀 Technologies Used</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>React 18</strong>: Functional components, Hooks (<code>useState</code>, <code>useMemo</code>, <code>useEffect</code>).</li>
                  <li><strong>Tailwind CSS</strong>: Utility-first styling with responsive design & custom gradient variables.</li>
                  <li><strong>Lucide React Icons</strong>: Modern, lightweight iconography.</li>
                  <li><strong>React-Toastify</strong>: Accessible notification system for dynamic user feedback.</li>
                </ul>
              </div>

              {/* 3 Key Features */}
              <div>
                <h4 className="text-base font-bold text-slate-900 border-b pb-1 mb-2">✨ 3 Key Features</h4>
                <ol className="list-decimal pl-5 space-y-1.5">
                  <li><strong>Dynamic Stack Builder & Importer/Exporter:</strong> Instant add/remove logic with stack category coverage tracking and JSON configuration clipboard export.</li>
                  <li><strong>3-Column Responsive Grid with Instant Search:</strong> Real-time filtering by technology name, description keywords, and category pills.</li>
                  <li><strong>Pixel-Perfect Design System:</strong> Unified <code>Orange → Pink → Violet</code> signature brand gradient, custom 3D isometric stack visual, sticky navigation, and toasts.</li>
                </ol>
              </div>

              {/* Setup Instructions */}
              <div>
                <h4 className="text-base font-bold text-slate-900 border-b pb-1 mb-2">💻 Setup & Installation Instructions</h4>
                <pre className="bg-slate-900 text-slate-100 p-3 rounded-xl text-xs overflow-x-auto font-mono">
{`# 1. Clone the repository
git clone https://github.com/devstack/devstack-explorer.git

# 2. Navigate to project directory
cd devstack-explorer

# 3. Install dependencies
npm install

# 4. Start local development server
npm start`}
                </pre>
              </div>

              {/* React Questions & Answers */}
              <div>
                <h4 className="text-base font-bold text-slate-900 border-b pb-1 mb-2">❓ Required React Questions & Answers</h4>
                
                <div className="space-y-4 pt-1">
                  <div>
                    <p className="font-bold text-slate-800">Q1: What is the Virtual DOM in React and how does it work?</p>
                    <p className="text-xs text-slate-600 mt-0.5">
                      <strong>Answer:</strong> The Virtual DOM (VDOM) is an in-memory lightweight representation of the real DOM. When component state changes, React creates a new VDOM tree, compares it with the previous VDOM tree using a fast diffing algorithm (Reconciliation), and computes the minimum set of updates needed before batch-updating the real DOM.
                    </p>
                  </div>

                  <div>
                    <p className="font-bold text-slate-800">Q2: What is the difference between state and props?</p>
                    <p className="text-xs text-slate-600 mt-0.5">
                      <strong>Answer:</strong> <em>Props</em> (short for properties) are read-only input parameters passed down from a parent component to a child component. <em>State</em> is an internal data structure managed within a component that can change over time based on user interactions or async events.
                    </p>
                  </div>

                  <div>
                    <p className="font-bold text-slate-800">Q3: Why do we use keys in React lists?</p>
                    <p className="text-xs text-slate-600 mt-0.5">
                      <strong>Answer:</strong> Keys give React elements a stable identity across renders. They allow React's diffing algorithm to identify which list items have been added, modified, or removed, avoiding costly re-renders of unchanged elements.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/50 flex justify-end">
              <button
                onClick={() => setShowReadmeModal(false)}
                className="bg-slate-900 text-white font-semibold text-xs px-5 py-2 rounded-xl hover:bg-slate-800 transition-colors"
              >
                Close Documentation
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
