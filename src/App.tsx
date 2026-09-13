import { useEffect, useMemo, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DocsModal from './components/DocsModal';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import TechnologyGrid from './components/TechnologyGrid';
import type { Technology } from './types/technology';

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
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [selectedStack, setSelectedStack] = useState<Technology[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
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

  const filteredTechnologies = useMemo(() => {
    const normalizedQuery = searchQuery.toLowerCase();
    return technologies.filter((technology) => {
      const matchesSearch = technology.name.toLowerCase().includes(normalizedQuery)
        || technology.description.toLowerCase().includes(normalizedQuery)
        || technology.category.toLowerCase().includes(normalizedQuery);
      const matchesCategory = activeCategory === 'All' || technology.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [technologies, searchQuery, activeCategory]);

  const categoryCoverage = useMemo(() => {
    const categoriesPresent = new Set(selectedStack.map((technology) => technology.category));
    return {
      frontend: categoriesPresent.has('Frontend'),
      backend: categoriesPresent.has('Backend'),
      database: categoriesPresent.has('Database'),
      language: categoriesPresent.has('Language'),
    };
  }, [selectedStack]);

  const handleAddToStack = (technology: Technology) => {
    if (selectedStack.some((item) => item.id === technology.id)) {
      toast.warning(`"${technology.name}" is already added to your stack!`);
      return;
    }

    setSelectedStack((current) => [...current, technology]);
    toast.success(`Added ${technology.name} to your stack!`);
  };

  const handleRemoveFromStack = (technologyId: string, technologyName: string) => {
    setSelectedStack((current) => current.filter((item) => item.id !== technologyId));
    toast.info(`Removed ${technologyName} from stack`);
  };

  const handleClearStack = () => {
    if (selectedStack.length === 0) return;
    setSelectedStack([]);
    toast.error('Cleared all items from your stack');
  };

  const handleCopyStackJSON = async () => {
    const jsonString = JSON.stringify(
      selectedStack.map(({ id, name, category }) => ({ id, name, category })),
      null,
      2,
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

  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveCategory('All');
  };

  const openDocs = () => setShowReadmeModal(true);

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans antialiased flex flex-col selection:bg-pink-100 selection:text-pink-600">
      <ToastContainer position="top-right" autoClose={3200} theme="dark" />
      <Navbar
        onOpenDocs={openDocs}
        onDesktopSignUp={() => toast.info('Welcome to Dev Stack! Explore technology cards below.')}
        onMobileSignUp={() => toast.success('Signed Up successfully!')}
      />
      <Hero onOpenDocs={openDocs} />
      <TechnologyGrid
        technologies={filteredTechnologies}
        selectedStack={selectedStack}
        categories={categories}
        activeCategory={activeCategory}
        searchQuery={searchQuery}
        isLoading={isLoading}
        loadError={loadError}
        categoryCoverage={categoryCoverage}
        copyingConfig={copyingConfig}
        onCategoryChange={setActiveCategory}
        onSearchChange={setSearchQuery}
        onResetFilters={handleResetFilters}
        onAdd={handleAddToStack}
        onCopy={handleCopyStackJSON}
        onRemove={handleRemoveFromStack}
        onRemoveAll={handleClearStack}
      />
      <Footer
        onOpenDocs={openDocs}
        onSocialClick={(network) => toast.info(`${network} ${network === 'GitHub' ? 'repo link' : 'profile link'} clicked`)}
      />
      <DocsModal isOpen={showReadmeModal} onClose={() => setShowReadmeModal(false)} />
    </div>
  );
}
