import {
  Battery,
  Box,
  Code,
  ShieldCheck,
  Users,
  Watch,
} from 'lucide-react';

// Removed unused Card imports

const features = [
  {
    title: 'Set It & Forget It',
    description:
      'Ultra-low power consumption and seamless background tracking. Start recording, drop your phone in your pocket, and it reliably captures your entire day without draining the battery.',
    icon: <Battery className="w-6 h-6 text-brand" />,
    color: 'from-brand/10 to-transparent',
  },
  {
    title: 'Privacy By Design',
    description:
      'Full tracking works entirely offline without cell service. Your data stays securely on-device, with purely optional private iCloud syncing.',
    icon: <ShieldCheck className="w-6 h-6 text-brand" />,
    color: 'from-brand/5 to-transparent',
  },
  {
    title: 'Free & Open Source',
    description:
      'No subscriptions, no hidden paywalls. A completely free tracker providing full features out of the box, powered by a transparent open-source codebase.',
    icon: <Code className="w-6 h-6 text-brand" />,
    color: 'from-brand/10 to-transparent',
  },

  {
    title: 'Crew Tracking',
    description:
      "Create a group via deep link, see friends' real-time locations on the map, and drop pins to coordinate meet-ups.",
    icon: <Users className="w-6 h-6 text-brand" />,
    color: 'from-brand/5 to-transparent',
  },
  {
    title: 'Apple Watch Companion',
    description:
      'Independent watch tracking with HealthKit workout integration, custom complications, and instant haptic feedback.',
    icon: <Watch className="w-6 h-6 text-brand" />,
    color: 'from-brand/10 to-transparent',
  },
  {
    title: 'Gear Checklist',
    description:
      'Organize gear by body zone with an interactive skier figure visualization. Never forget your goggles again.',
    icon: <Box className="w-6 h-6 text-brand" />,
    color: 'from-brand/5 to-transparent',
  },
];

export function Features() {
  return (
    <section id="features" className="py-32 relative bg-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="mb-24 md:mb-32">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none text-slate-900">
            Everything you need. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-accent">Nothing in your way.</span>
          </h2>
        </div>

        <div className="relative border-l-2 border-slate-100 ml-6 md:ml-12 space-y-24 md:space-y-32 pb-12">
          {features.map((feature) => (
            <div key={feature.title} className="relative pl-10 md:pl-20 group">
              {/* Timeline Connector Dot */}
              <div className="absolute -left-[5px] top-4 md:top-5 w-2.5 h-2.5 bg-slate-200 rounded-full group-hover:bg-brand transition-colors duration-500 shadow-sm group-hover:shadow-brand/40 group-hover:scale-125" />

              <div className="max-w-3xl">
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`p-4 rounded-2xl bg-gradient-to-br ${feature.color} border border-slate-50 shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-brand">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-xl md:text-2xl text-slate-500 font-light leading-relaxed">
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
