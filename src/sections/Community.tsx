import { Bug, GitPullRequest, MessageSquare, Users } from 'lucide-react';
// Removed unused Card imports

const communityLinks = [
  {
    title: 'Discussions',
    description: 'Join the conversation. Ask questions, share ideas, and connect with other developers.',
    icon: <MessageSquare className="w-6 h-6 text-primary" />,
    url: 'https://github.com/Snowly-index',
  },
  {
    title: 'Contribute Code',
    description: 'Help us build the ultimate tracking library. Read our contributing guidelines.',
    icon: <GitPullRequest className="w-6 h-6 text-accent" />,
    url: 'https://github.com/Snowly-index',
  },
  {
    title: 'Report Issues',
    description: 'Found a bug? Have a feature request? Open an issue on our tracker.',
    icon: <Bug className="w-6 h-6 text-primary" />,
    url: 'https://github.com/Snowly-index',
  },
  {
    title: 'Community',
    description: 'We are building a robust ecosystem. Be a part of the open-source movement.',
    icon: <Users className="w-6 h-6 text-accent" />,
    url: 'https://github.com/Snowly-index',
  },
];

export function Community() {
  return (
    <section id="community" className="py-32 relative bg-zinc-950">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="mb-20">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none text-white/90">
            Built by the community. <br />
            <span className="text-white/40">For the community.</span>
          </h2>
          <p className="mt-8 text-xl md:text-2xl text-white/50 font-light leading-relaxed max-w-3xl">
            Snowly is aggressively open-source. We believe that privacy-first, local-storage tracking tools should be transparent and driven by the riders who use them.
          </p>
        </div>

        <div className="flex flex-col border-t border-white/10">
          {communityLinks.map((link) => (
            <a
              key={link.title}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="group block py-10 border-b border-white/10 hover:bg-white/[0.02] transition-colors duration-300 px-4 -mx-4 rounded-2xl"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-zinc-900 flex items-center justify-center border border-white/5 group-hover:scale-105 transition-transform duration-500">
                    {link.icon}
                  </div>
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white/90 group-hover:text-primary transition-colors duration-300">
                      {link.title}
                    </h3>
                  </div>
                </div>
                <div className="md:w-1/2 flex items-center justify-between">
                  <p className="text-lg md:text-xl text-white/50 font-light leading-relaxed group-hover:text-white/70 transition-colors">
                    {link.description}
                  </p>
                  <div className="hidden md:flex opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-white/50">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
