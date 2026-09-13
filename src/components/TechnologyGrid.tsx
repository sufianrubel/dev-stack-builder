import { AlertCircle, Search, X } from 'lucide-react';
import type { CategoryCoverage, Technology } from '../types/technology';
import LoadingSpinner from './LoadingSpinner';
import TechnologyCard from './TechnologyCard';
import YourStack from './YourStack';

interface TechnologyGridProps {
  technologies: Technology[];
  selectedStack: Technology[];
  categories: string[];
  activeCategory: string;
  searchQuery: string;
  isLoading: boolean;
  loadError: string | null;
  categoryCoverage: CategoryCoverage;
  copyingConfig: boolean;
  onCategoryChange: (category: string) => void;
  onSearchChange: (query: string) => void;
  onResetFilters: () => void;
  onAdd: (technology: Technology) => void;
  onCopy: () => void | Promise<void>;
  onRemove: (id: string, name: string) => void;
  onRemoveAll: () => void;
}

export default function TechnologyGrid({
  technologies,
  selectedStack,
  categories,
  activeCategory,
  searchQuery,
  isLoading,
  loadError,
  categoryCoverage,
  copyingConfig,
  onCategoryChange,
  onSearchChange,
  onResetFilters,
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

        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => onCategoryChange(category)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                    activeCategory === category
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search technologies..."
                value={searchQuery}
                onChange={(event) => onSearchChange(event.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/30 focus:border-pink-500 transition-all placeholder:text-slate-400"
              />
              {searchQuery && (
                <button onClick={() => onSearchChange('')} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
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
                <div className="w-12 h-12 bg-pink-50 text-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">No technologies found</h3>
                <p className="text-slate-500 text-sm mt-1">Try adjusting your search query or category filter.</p>
                <button onClick={onResetFilters} className="mt-4 text-xs font-semibold text-pink-600 hover:underline">Reset filters</button>
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
