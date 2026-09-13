import { Check, Star } from 'lucide-react';
import type { Technology } from '../types/technology';

interface TechnologyCardProps {
  technology: Technology;
  isAdded: boolean;
  onAdd: (technology: Technology) => void;
}

export default function TechnologyCard({ technology, isAdded, onAdd }: TechnologyCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 flex flex-col justify-between hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-200 group relative">
      <div>
        <div className="flex items-start justify-between mb-3">
          <div className="w-12 h-12 flex items-center justify-center group-hover:scale-105 transition-transform">
            <img src={technology.icon} alt={`${technology.name} icon`} className="w-7 h-7 object-contain" loading="lazy" />
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full border bg-pink-50 text-pink-600 border-pink-200">
            {technology.badge}
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-1.5">{technology.name}</h3>
        <p className="text-slate-500 text-xs leading-relaxed mb-4 min-h-[3rem] line-clamp-3">
          {technology.description}
        </p>
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2 pt-2 mb-4 text-xs text-slate-500">
          <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
            {technology.category}
          </span>
          <span className="text-center truncate">{technology.difficulty}</span>
          <span className="flex items-center justify-self-end text-slate-600 font-semibold">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-1" aria-hidden="true" />
            {technology.rating}
          </span>
        </div>
      </div>

      <button
        onClick={() => onAdd(technology)}
        disabled={isAdded}
        className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center transition-all duration-200 active:scale-[0.98] ${isAdded ? 'bg-slate-100 text-slate-700 cursor-not-allowed opacity-75' : 'bg-slate-950 text-white hover:bg-slate-800 shadow-sm'
          }`}
      >
        {isAdded ? (
          <>
            <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-600 stroke-[3]" />
            Added to Stack
          </>
        ) : 'Add to Stack'}
      </button>
    </div>
  );
}
