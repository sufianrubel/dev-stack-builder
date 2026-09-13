import { Check, Copy, Layers } from 'lucide-react';
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

const coverageItems: Array<[keyof CategoryCoverage, string]> = [
  ['frontend', 'Frontend'],
  ['backend', 'Backend'],
  ['database', 'Database'],
  ['language', 'Language'],
];

export default function YourStack({
  technologies,
  categoryCoverage,
  copyingConfig,
  onCopy,
  onRemove,
  onRemoveAll,
}: YourStackProps) {
  return (
    <div className="col-span-12 md:col-span-4 lg:col-span-3 md:sticky md:top-28">
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Your Stack</h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {technologies.length} {technologies.length === 1 ? 'Technology' : 'Technologies'} Selected
            </p>
          </div>
          {technologies.length > 0 && (
            <button
              onClick={onCopy}
              title={copyingConfig ? 'Copied!' : 'Export Stack Config'}
              className="p-2 text-slate-400 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors"
            >
              {copyingConfig ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          )}
        </div>

        <div className="py-4 space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
          {technologies.length === 0 ? (
            <div className="py-8 text-center text-slate-400">
              <Layers className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-xs font-medium">Your stack is currently empty.</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Click "Add to Stack" on any card.</p>
            </div>
          ) : technologies.map((technology) => (
            <StackItem key={technology.id} technology={technology} onRemove={onRemove} />
          ))}
        </div>

        {technologies.length > 0 && (
          <div className="pt-3 pb-2 border-t border-slate-100">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">Stack Coverage</span>
            <div className="grid grid-cols-2 gap-1.5 text-[11px]">
              {coverageItems.map(([key, label]) => (
                <div key={key} className={`px-2 py-1 rounded flex items-center justify-between ${categoryCoverage[key] ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-50 text-slate-400'}`}>
                  <span>{label}</span>
                  {categoryCoverage[key] && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-3 border-t border-slate-100">
          <button
            onClick={onRemoveAll}
            disabled={technologies.length === 0}
            className={`w-full py-2.5 rounded-xl border font-semibold text-xs transition-all duration-200 ${
              technologies.length === 0
                ? 'border-slate-200 text-slate-300 cursor-not-allowed'
                : 'border-slate-200 text-rose-500 hover:border-rose-200 hover:bg-rose-50/50'
            }`}
          >
            Remove All
          </button>
        </div>
      </div>
    </div>
  );
}
