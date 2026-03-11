import { GitFork, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

interface GitHubStats {
  stars: number | null;
  forks: number | null;
  loading: boolean;
  error: boolean;
}

export function GithubStatsBadge({
  repo = 'Snowly-index/Snowly-index',
}: {
  repo?: string;
}) {
  const [stats, setStats] = useState<GitHubStats>({
    stars: null,
    forks: null,
    loading: true,
    error: false,
  });

  useEffect(() => {
    // You should replace 'Snowly-index/Snowly-index' with your actual github repo owner/name
    const fetchStats = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/${repo}`);
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setStats({
          stars: data.stargazers_count,
          forks: data.forks_count,
          loading: false,
          error: false,
        });
      } catch (err) {
        setStats((prev) => ({ ...prev, loading: false, error: true }));
      }
    };

    fetchStats();
  }, [repo]);

  if (stats.loading) return null;

  return (
    <div className="flex items-center gap-4 mt-6 justify-center animate-fade-in opacity-80 hover:opacity-100 transition-opacity">
      <a
        href={`https://github.com/${repo}/stargazers`}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors bg-white border border-slate-200 shadow-sm rounded-full px-3 py-1"
      >
        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500/20" />
        <span>{stats.stars?.toLocaleString() || 0} Stars</span>
      </a>

      <a
        href={`https://github.com/${repo}/network/members`}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors bg-white border border-slate-200 shadow-sm rounded-full px-3 py-1"
      >
        <GitFork className="w-4 h-4 text-slate-400" />
        <span>{stats.forks?.toLocaleString() || 0} Forks</span>
      </a>
    </div>
  );
}
