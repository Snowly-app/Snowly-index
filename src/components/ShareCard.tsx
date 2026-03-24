import { Activity, ArrowDownRight, Clock, Zap } from 'lucide-react';

export function ShareCard() {
  return (
    <div className="relative w-[1920px] h-[1080px] rounded-[64px] overflow-hidden shadow-2xl bg-white flex flex-row">
      {/* Left Side: Map and Ski Track (approx 60% = 1152px) */}
      <div className="relative w-[1152px] h-full bg-slate-100 overflow-hidden flex-shrink-0">
        {/* Subtle grid pattern background to simulate a map */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 4px 4px, #a8a2bc 2px, transparent 0)`,
            backgroundSize: '80px 80px',
          }}
        />
        {/* Subtle terrain gradients */}
        <div className="absolute inset-0 bg-gradient-to-tr from-brand/10 via-transparent to-accent/5 mix-blend-multiply" />

        {/* Ski Track SVG */}
        <svg
          viewBox="0 0 1152 1080"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d="M 300,100 C 400,350 800,400 600,700 C 500,900 800,950 700,1100"
            fill="none"
            stroke="url(#track-gradient)"
            strokeWidth="32"
            strokeLinecap="round"
            className="drop-shadow-2xl"
          />
          <path
            d="M 300,100 C 400,350 800,400 600,700 C 500,900 800,950 700,1100"
            fill="none"
            stroke="white"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray="24 24"
          />
          {/* Start and End nodes */}
          <circle cx="300" cy="100" r="24" fill="#3ac5f9" stroke="white" strokeWidth="8" />
          <circle cx="680" cy="1040" r="24" fill="#2382d0" stroke="white" strokeWidth="8" />

          <defs>
            <linearGradient id="track-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3ac5f9" />
              <stop offset="100%" stopColor="#2382d0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Map UI Overlay details (Optional decoration) */}
        <div className="absolute top-16 left-16 bg-white/95 backdrop-blur-md px-10 py-5 rounded-full shadow-lg">
          <span className="text-3xl font-bold text-slate-800 tracking-tight">Matterhorn, Zermatt</span>
        </div>
      </div>

      {/* Right Side: Data Statistics, User Info, Logo (40% = 768px) */}
      <div className="relative w-[768px] h-full bg-white flex flex-col justify-between p-24 border-l-2 border-slate-100 flex-shrink-0">
        
        {/* User Info & Logo Header */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-8">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-slate-200 border-4 border-white shadow-xl">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-2">
              <h3 className="font-extrabold text-5xl text-slate-900 leading-tight tracking-tight">Alex Rider</h3>
              <p className="text-2xl text-slate-500 font-medium tracking-wide">Jan 14, 2026</p>
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-sm flex items-center justify-center bg-white ring-1 ring-slate-200">
               <img src="/favicon.png" alt="Snowly Logo" className="w-16 h-16 object-cover" />
            </div>
            <span className="mt-4 text-[22px] font-bold tracking-widest text-slate-400 uppercase">Snowly</span>
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 gap-x-12 gap-y-24 my-auto">
          {/* Stat 1 */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-brand">
              <Zap className="w-10 h-10" strokeWidth={2.5} />
              <span className="font-bold text-2xl uppercase tracking-widest text-slate-400">Max Speed</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-[100px] leading-none font-black text-slate-900 tracking-tighter">84.2</span>
              <span className="text-3xl font-bold text-slate-400">km/h</span>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-brand">
              <Activity className="w-10 h-10" strokeWidth={2.5} />
              <span className="font-bold text-2xl uppercase tracking-widest text-slate-400">Distance</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-[100px] leading-none font-black text-slate-900 tracking-tighter">42.5</span>
              <span className="text-3xl font-bold text-slate-400">km</span>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-brand">
              <ArrowDownRight className="w-10 h-10" strokeWidth={2.5} />
              <span className="font-bold text-2xl uppercase tracking-widest text-slate-400">Descent</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-[100px] leading-none font-black text-slate-900 tracking-tighter">3,240</span>
              <span className="text-3xl font-bold text-slate-400">m</span>
            </div>
          </div>

          {/* Stat 4 */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-brand">
              <Clock className="w-10 h-10" strokeWidth={2.5} />
              <span className="font-bold text-2xl uppercase tracking-widest text-slate-400">Duration</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-[100px] leading-none font-black text-slate-900 tracking-tighter">4:12</span>
              <span className="text-3xl font-bold text-slate-400">h:m</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
