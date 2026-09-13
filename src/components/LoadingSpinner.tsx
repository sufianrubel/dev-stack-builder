export default function LoadingSpinner() {
  return (
    <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-sm" role="status" aria-live="polite">
      <div className="w-10 h-10 mx-auto mb-4 rounded-full border-4 border-slate-200 border-t-pink-500 animate-spin" />
      <p className="text-sm font-semibold text-slate-600">Loading technologies...</p>
    </div>
  );
}
