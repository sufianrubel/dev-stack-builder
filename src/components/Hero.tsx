import bannerStack from '../assets/banner-stack.png';

export default function Hero() {
  return (
    <section id="home" className="relative pt-12 pb-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Build Your Ideal{' '}
              <span className="brand-gradient-text block mt-1">
                Development Stack
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl">
              Explore frontend, backend, database, and tooling options, compare them side by side, and put together the stack that fits your next project.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a href="#explore" className="brand-gradient inline-flex items-center justify-center text-white font-bold text-base px-7 py-3.5 rounded-full shadow-lg shadow-pink-500/25 hover:shadow-xl hover:shadow-pink-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200">
                Explore Technologies
              </a>
              <a href="#explore" className="inline-flex items-center justify-center bg-white text-slate-700 font-semibold text-base px-7 py-3.5 rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-200">
                Learn More
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
              <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
                <img
                  src={bannerStack}
                  alt="Illustration of a modern development technology stack"
                  className="w-full h-full max-h-[380px] object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
