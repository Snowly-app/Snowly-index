import { Activity, Watch, Box, LocateFixed, ShieldCheck, Users } from 'lucide-react';
// Removed unused Card imports

const features = [
  {
    title: 'Live Precision Tracking',
    description:
      'Multi-constellation GPS ensures every turn, jump, and traverse is captured with pinpoint accuracy and real-time bezier speed curves.',
    icon: <LocateFixed className="w-6 h-6 text-primary" />,
    color: 'from-primary/20 to-transparent',
  },
  {
    title: 'Automatic Run Detection',
    description:
      'Distinguishes ski runs from lift rides using GPS speed, altitude trends, and CoreMotion accelerometer data.',
    icon: <Activity className="w-6 h-6 text-accent" />,
    color: 'from-accent/20 to-transparent',
  },
  {
    title: 'Crew Tracking',
    description:
      'Create a group via deep link, see friends\' real-time locations on the map, and drop pins to coordinate meet-ups.',
    icon: <Users className="w-6 h-6 text-primary" />,
    color: 'from-primary/20 to-transparent',
  },
  {
    title: 'Apple Watch Companion',
    description:
      'Independent watch tracking with HealthKit workout integration, custom complications, and instant haptic feedback.',
    icon: <Watch className="w-6 h-6 text-accent" />,
    color: 'from-accent/20 to-transparent',
  },
  {
    title: 'Gear Checklist',
    description:
      "Organize gear by body zone with an interactive skier figure visualization. Never forget your goggles again.",
    icon: <Box className="w-6 h-6 text-primary" />,
    color: 'from-primary/20 to-transparent',
  },
  {
    title: 'Privacy-First & Offline',
    description:
      'Full tracking works without cell service. Your data stays on-device, with purely optional private iCloud syncing.',
    icon: <ShieldCheck className="w-6 h-6 text-accent" />,
    color: 'from-accent/20 to-transparent',
  },
];

export function Features() {
  return (
    <section id="features" className="py-32 relative bg-zinc-950">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="mb-24 md:mb-32">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none text-white/90">
            Everything you need. <br />
            <span className="text-white/40">Nothing in your way.</span>
          </h2>
        </div>

        <div className="relative border-l border-white/10 ml-6 md:ml-12 space-y-24 md:space-y-32 pb-12">
          {features.map((feature) => (
            <div key={feature.title} className="relative pl-10 md:pl-20 group">
              {/* Timeline Connector Dot */}
              <div className="absolute -left-[5px] top-2 md:top-3 w-2.5 h-2.5 bg-zinc-600 rounded-full group-hover:bg-primary transition-colors duration-500 shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_20px_rgba(var(--color-primary),0.5)]" />
              
              <div className="max-w-3xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br ${feature.color} border border-white/5`}>
                     {feature.icon}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white/90 group-hover:text-white transition-colors duration-300">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-xl md:text-2xl text-white/50 font-light leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
