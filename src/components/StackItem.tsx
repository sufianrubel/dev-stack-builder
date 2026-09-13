import { X } from 'lucide-react';
import type { Technology } from '../types/technology';

interface StackItemProps {
  technology: Technology;
  onRemove: (id: string, name: string) => void;
}

export default function StackItem({ technology, onRemove }: StackItemProps) {
  return (
    <div className="flex min-h-12 items-center justify-between px-3 py-2 rounded-lg border border-slate-200 bg-white hover:border-slate-300 transition-all group">
      <div className="flex items-center space-x-2.5 min-w-0">
        <div className="w-7 h-7 flex items-center justify-center shrink-0">
          <img src={technology.icon} alt="" className="w-7 h-7 object-contain" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-900 leading-tight">{technology.name}</h4>
          <span className="block text-xs leading-tight text-slate-400 font-medium">{technology.category}</span>
        </div>
      </div>
      <button
        onClick={() => onRemove(technology.id, technology.name)}
        className="p-1 text-slate-400 hover:text-slate-600 rounded-md transition-colors"
        aria-label={`Remove ${technology.name}`}
      >
        <X className="w-5 h-5 stroke-[1.5]" />
      </button>
    </div>
  );
}
