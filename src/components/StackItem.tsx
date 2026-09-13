import { X } from 'lucide-react';
import type { Technology } from '../types/technology';

interface StackItemProps {
  technology: Technology;
  onRemove: (id: string, name: string) => void;
}

export default function StackItem({ technology, onRemove }: StackItemProps) {
  return (
    <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200/80 bg-white hover:border-slate-300 transition-all group">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
          <img src={technology.icon} alt="" className="w-5 h-5 object-contain" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-900 leading-none">{technology.name}</h4>
          <span className="text-[10px] text-slate-400 font-medium">{technology.category}</span>
        </div>
      </div>
      <button
        onClick={() => onRemove(technology.id, technology.name)}
        className="p-1 text-slate-300 hover:text-slate-600 rounded-md transition-colors"
        aria-label={`Remove ${technology.name}`}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
