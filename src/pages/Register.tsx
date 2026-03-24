import { ChevronDown, ChevronUp, Loader2, Mountain } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useAuth } from '../lib/auth';
import { cn } from '../lib/utils';

export default function Register() {
  const { isAuthenticated, isLoading, register } = useAuth();
  const navigate = useNavigate();

  const generated = useMemo(
    () => ({
      userId: crypto.randomUUID(),
      deviceSecret: crypto.randomUUID(),
    }),
    [],
  );

  const [displayName, setDisplayName] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [userId, setUserId] = useState(generated.userId);
  const [deviceSecret, setDeviceSecret] = useState(generated.deviceSecret);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setUserId(generated.userId);
    setDeviceSecret(generated.deviceSecret);
  }, [generated]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);

      const trimmedName = displayName.trim();
      if (!trimmedName) {
        setError('Display name is required.');
        return;
      }

      setSubmitting(true);
      try {
        await register(userId, trimmedName, deviceSecret);
        navigate('/journal', { replace: true });
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Registration failed.';
        setError(message);
      } finally {
        setSubmitting(false);
      }
    },
    [displayName, userId, deviceSecret, register, navigate],
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-brand" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/journal" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand/10 mb-4">
            <Mountain className="w-8 h-8 text-brand" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            Create your account
          </h1>
          <p className="text-muted-foreground mt-2">
            Start tracking your ski sessions on the web
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-border bg-card p-6 space-y-5 shadow-sm"
        >
          <div className="space-y-2">
            <label
              htmlFor="displayName"
              className="block text-sm font-medium text-foreground"
            >
              Display Name
            </label>
            <input
              id="displayName"
              type="text"
              required
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Enter your name"
              className={cn(
                'w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground',
                'placeholder:text-muted-foreground',
                'focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent',
                'transition-colors',
              )}
            />
          </div>

          <button
            type="button"
            onClick={() => setShowAdvanced((prev) => !prev)}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {showAdvanced ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
            Advanced options
          </button>

          {showAdvanced && (
            <div className="space-y-4 pt-1">
              <div className="space-y-2">
                <label
                  htmlFor="userId"
                  className="block text-sm font-medium text-foreground"
                >
                  User ID
                </label>
                <input
                  id="userId"
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className={cn(
                    'w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground font-mono',
                    'focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent',
                    'transition-colors',
                  )}
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="deviceSecret"
                  className="block text-sm font-medium text-foreground"
                >
                  Device Secret
                </label>
                <input
                  id="deviceSecret"
                  type="text"
                  value={deviceSecret}
                  onChange={(e) => setDeviceSecret(e.target.value)}
                  className={cn(
                    'w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground font-mono',
                    'focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent',
                    'transition-colors',
                  )}
                />
              </div>
            </div>
          )}

          {error && (
            <div
              role="alert"
              className="rounded-xl bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive"
            >
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={submitting}
            className="w-full bg-brand text-white hover:bg-brand/90"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating account...
              </>
            ) : (
              'Create Account'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
