import { BookOpen, X } from 'lucide-react';

interface DocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DocsModal({ isOpen, onClose }: DocsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-slate-100 flex flex-col">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-pink-600" />
            <h3 className="text-lg font-bold text-slate-900">Project README & React Q&A Documentation</h3>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-600 leading-relaxed font-sans">
          <div>
            <h4 className="text-base font-bold text-slate-900 border-b pb-1 mb-2"># Dev Stack Technology Explorer</h4>
            <p>A pixel-perfect, production-grade interactive React web application designed to help software engineers explore, compare, and assemble their ideal technology stacks dynamically.</p>
          </div>

          <div>
            <h4 className="text-base font-bold text-slate-900 border-b pb-1 mb-2">🚀 Technologies Used</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>React 18</strong>: Functional components, Hooks (<code>useState</code>, <code>useMemo</code>, <code>useEffect</code>).</li>
              <li><strong>Tailwind CSS</strong>: Utility-first styling with responsive design & custom gradient variables.</li>
              <li><strong>Lucide React Icons</strong>: Modern, lightweight iconography.</li>
              <li><strong>React-Toastify</strong>: Accessible notification system for dynamic user feedback.</li>
            </ul>
          </div>

          <div>
            <h4 className="text-base font-bold text-slate-900 border-b pb-1 mb-2">✨ 3 Key Features</h4>
            <ol className="list-decimal pl-5 space-y-1.5">
              <li><strong>Dynamic Stack Builder & Importer/Exporter:</strong> Instant add/remove logic with stack category coverage tracking and JSON configuration clipboard export.</li>
              <li><strong>3-Column Responsive Grid with Instant Search:</strong> Real-time filtering by technology name, description keywords, and category pills.</li>
              <li><strong>Pixel-Perfect Design System:</strong> Unified <code>Orange → Pink → Violet</code> signature brand gradient, custom 3D isometric stack visual, sticky navigation, and toasts.</li>
            </ol>
          </div>

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

          <div>
            <h4 className="text-base font-bold text-slate-900 border-b pb-1 mb-2">❓ Required React Questions & Answers</h4>
            <div className="space-y-4 pt-1">
              <div>
                <p className="font-bold text-slate-800">Q1: What is the Virtual DOM in React and how does it work?</p>
                <p className="text-xs text-slate-600 mt-0.5"><strong>Answer:</strong> The Virtual DOM (VDOM) is an in-memory lightweight representation of the real DOM. When component state changes, React creates a new VDOM tree, compares it with the previous VDOM tree using a fast diffing algorithm (Reconciliation), and computes the minimum set of updates needed before batch-updating the real DOM.</p>
              </div>
              <div>
                <p className="font-bold text-slate-800">Q2: What is the difference between state and props?</p>
                <p className="text-xs text-slate-600 mt-0.5"><strong>Answer:</strong> <em>Props</em> (short for properties) are read-only input parameters passed down from a parent component to a child component. <em>State</em> is an internal data structure managed within a component that can change over time based on user interactions or async events.</p>
              </div>
              <div>
                <p className="font-bold text-slate-800">Q3: Why do we use keys in React lists?</p>
                <p className="text-xs text-slate-600 mt-0.5"><strong>Answer:</strong> Keys give React elements a stable identity across renders. They allow React's diffing algorithm to identify which list items have been added, modified, or removed, avoiding costly re-renders of unchanged elements.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/50 flex justify-end">
          <button onClick={onClose} className="bg-slate-900 text-white font-semibold text-xs px-5 py-2 rounded-xl hover:bg-slate-800 transition-colors">
            Close Documentation
          </button>
        </div>
      </div>
    </div>
  );
}
