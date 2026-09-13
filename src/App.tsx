import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans antialiased flex flex-col selection:bg-pink-100 selection:text-pink-600">
      <ToastContainer position="top-right" autoClose={3200} theme="dark" />
      <Navbar
        onDesktopSignUp={() => toast.info('Welcome to Dev Stack! Explore technology cards below.')}
        onMobileSignUp={() => toast.success('Signed Up successfully!')}
      />
      <Hero />
      <TechnologyGrid
        technologies={technologies}
        selectedStack={selectedStack}
        isLoading={isLoading}
        loadError={loadError}
        onAdd={handleAddToStack}
        onRemove={handleRemoveFromStack}
        onRemoveAll={handleClearStack}
      />
      <Footer />
    </div>
  );
}
