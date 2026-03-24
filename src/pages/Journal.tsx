import {
  ArrowRight,
  Clock,
  Loader2,
  LogOut,
  Mountain,
  Ruler,
  Zap,
} from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { getSessions, type SkiSession } from '../lib/api';
import { useAuth } from '../lib/auth';

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

function formatDistance(meters: number): string {
  if (meters >= 1000) return `${(meters / 1000).toFixed(1)} km`;
  return `${Math.round(meters)} m`;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString(undefined, {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function Journal() {
  const { apiToken, logout } = useAuth();
  const navigate = useNavigate();

  const [sessions, setSessions] = useState<SkiSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSessions = useCallback(async () => {
    if (!apiToken) return;
    setLoading(true);
    setError(null);
    try {
      const { sessions: data } = await getSessions(apiToken);
      const sorted = [...data].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
      setSessions(sorted);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to load sessions.';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [apiToken]);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden shadow-sm flex items-center justify-center bg-white ring-1 ring-slate-200">
              <img
                src="/favicon.png"
                alt="Snowly Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-bold text-xl tracking-tight text-foreground">
              Journal
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="text-muted-foreground hover:text-foreground"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-3xl">
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-brand" />
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="rounded-xl bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive mb-6"
          >
            {error}
          </div>
        )}

        {!loading && !error && sessions.length === 0 && (
          <div className="text-center py-20">
            <Mountain className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-foreground mb-2">
              No sessions yet
            </h2>
            <p className="text-muted-foreground">
              Start tracking with the Snowly iOS app!
            </p>
          </div>
        )}

        {!loading && sessions.length > 0 && (
          <div className="space-y-3">
            {sessions.map((session) => (
              <button
                type="button"
                key={session.id}
                onClick={() => navigate(`/journal/${session.id}`)}
                className="w-full text-left rounded-2xl border border-border bg-card p-5 hover:border-brand/40 hover:shadow-sm transition-all group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-foreground">
                      {formatDate(session.date)}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {formatDuration(session.duration)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Ruler className="w-3.5 h-3.5" />
                        {formatDistance(session.distance)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5" />
                        {session.maxSpeed.toFixed(1)} km/h
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-brand transition-colors mt-1" />
                </div>
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
