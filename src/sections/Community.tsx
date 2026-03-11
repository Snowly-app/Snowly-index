import { Bug, GitPullRequest, MessageSquare, Users } from 'lucide-react';

// Removed unused Card imports

const communityLinks = [
  {
    title: 'Discussions',
    description:
      'Join the conversation. Ask questions, share ideas, and connect with other developers.',
    icon: <MessageSquare className="w-6 h-6 text-brand" />,
    url: 'https://github.com/Snowly-index',
  },
  {
    title: 'Contribute Code',
    description:
      'Help us build the ultimate tracking library. Read our contributing guidelines.',
    icon: <GitPullRequest className="w-6 h-6 text-brand" />,
    url: 'https://github.com/Snowly-index',
  },
  {
    title: 'Report Issues',
    description:
      'Found a bug? Have a feature request? Open an issue on our tracker.',
    icon: <Bug className="w-6 h-6 text-brand" />,
    url: 'https://github.com/Snowly-index',
  },
  {
    title: 'Community',
    description:
      'We are building a robust ecosystem. Be a part of the open-source movement.',
    icon: <Users className="w-6 h-6 text-brand" />,
    url: 'https://github.com/Snowly-index',
  },
];

export function Community() {
  return (
    <section
      id="community"
      className="py-32 relative bg-white border-t border-slate-100"
    >
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="mb-20">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none text-slate-900">
            Built by the community. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-accent">For the community.</span>
          </h2>
          <p className="mt-8 text-xl md:text-2xl text-slate-500 font-light leading-relaxed max-w-3xl">
            Snowly is aggressively open-source. We believe that privacy-first,
            local-storage tracking tools should be transparent and driven by the
            riders who use them.
          </p>
        </div>

        <div className="flex flex-col border-t border-slate-100">
          {communityLinks.map((link) => (
            <a
              key={link.title}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="group block py-10 border-b border-slate-100 hover:bg-slate-50 hover:shadow-sm transition-all duration-300 px-4 -mx-4 rounded-2xl"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center border border-slate-100 shadow-sm group-hover:scale-105 group-hover:shadow-md transition-all duration-500">
                    {link.icon}
                  </div>
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 group-hover:text-brand transition-colors duration-300">
                      {link.title}
                    </h3>
                  </div>
                </div>
                <div className="md:w-1/2 flex items-center justify-between">
                  <p className="text-lg md:text-xl text-slate-500 font-light leading-relaxed group-hover:text-slate-700 transition-colors">
                    {link.description}
                  </p>
                  <div className="hidden md:flex opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-brand">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      role="img"
                    >
                      <title>Arrow Right</title>
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
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
