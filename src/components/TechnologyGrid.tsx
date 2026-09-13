import { AlertCircle } from 'lucide-react';
import type { CategoryCoverage, Technology } from '../types/technology';
import LoadingSpinner from './LoadingSpinner';
import TechnologyCard from './TechnologyCard';
import YourStack from './YourStack';

interface TechnologyGridProps {
  technologies: Technology[];
  selectedStack: Technology[];
  isLoading: boolean;
  loadError: string | null;
  categoryCoverage: CategoryCoverage;
  copyingConfig: boolean;
  onAdd: (technology: Technology) => void;
  onCopy: () => void | Promise<void>;
  onRemove: (id: string, name: string) => void;
  onRemoveAll: () => void;
}

export default function TechnologyGrid({
  technologies,
  selectedStack,
  isLoading,
  loadError,
  categoryCoverage,
  copyingConfig,
  onAdd,
  onCopy,
  onRemove,
  onRemoveAll,
}: TechnologyGridProps) {
  const selectedIds = new Set(selectedStack.map((technology) => technology.id));

  return (
    <section id="explore" className="py-12 bg-slate-50/60 border-t border-slate-100 flex-grow">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Explore the{' '}
            <span className="bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">Technologies</span>
          </h2>
          <p className="mt-2 text-slate-600 text-base">Pick one technology per category to build your ideal stack.</p>
        </div>

        <div className="grid grid-cols-12 gap-8 items-start">
          <div className="col-span-12 md:col-span-8 lg:col-span-9">
            {isLoading ? <LoadingSpinner /> : loadError ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-rose-200 shadow-sm" role="alert">
                <AlertCircle className="w-10 h-10 mx-auto mb-3 text-rose-500" />
                <h3 className="text-lg font-bold text-slate-900">Could not load technologies</h3>
                <p className="text-slate-500 text-sm mt-1">{loadError}</p>
              </div>
            ) : technologies.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900">No technologies available</h3>
                <p className="text-slate-500 text-sm mt-1">Technology data will appear here when available.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {technologies.map((technology) => (
                  <TechnologyCard
                    key={technology.id}
                    technology={technology}
                    isAdded={selectedIds.has(technology.id)}
                    onAdd={onAdd}
                  />
                ))}
              </div>
            )}
          </div>

          <YourStack
            technologies={selectedStack}
            categoryCoverage={categoryCoverage}
            copyingConfig={copyingConfig}
            onCopy={onCopy}
            onRemove={onRemove}
            onRemoveAll={onRemoveAll}
          />
        </div>
      </div>
    </section>
  );
}
