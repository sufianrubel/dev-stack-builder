import type { CategoryCoverage, Technology } from '../types/technology';
import StackItem from './StackItem';

interface YourStackProps {
  technologies: Technology[];
  categoryCoverage: CategoryCoverage;
  copyingConfig: boolean;
  onCopy: () => void | Promise<void>;
  onRemove: (id: string, name: string) => void;
  onRemoveAll: () => void;
}

export default function YourStack({
  technologies,
  onRemove,
  onRemoveAll,
}: YourStackProps) {
  return (
    <div className="col-span-12 md:col-span-4 lg:col-span-3 md:sticky md:top-28">
      <div className={`bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm ${technologies.length > 0 ? 'min-h-[300px] flex flex-col' : ''}`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Your Stack</h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {technologies.length === 0
                ? 'No technologies selected yet.'
                : `${technologies.length} Technology Selected`}
            </p>
          </div>
        </div>

        <div className={technologies.length === 0 ? 'mt-4' : 'mt-4 space-y-2 max-h-[380px] overflow-y-auto'}>
          {technologies.length === 0 ? (
            <div className="min-h-16 rounded-xl border border-dashed border-slate-200 flex items-center justify-center px-4 text-center">
              <p className="text-xs font-medium text-slate-400">Your stack is empty.</p>
            </div>
          ) : technologies.map((technology) => (
            <StackItem key={technology.id} technology={technology} onRemove={onRemove} />
          ))}
        </div>

        {technologies.length > 0 && (
          <div className="mt-auto pt-6">
            <button
              onClick={onRemoveAll}
              className="w-full py-1.5 rounded-lg border border-red-300 text-red-500 hover:border-red-400 hover:bg-red-50 font-semibold text-sm transition-all duration-200"
            >
              Remove All
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
