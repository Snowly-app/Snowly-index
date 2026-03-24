import L from 'leaflet';
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Clock,
  Loader2,
  Mountain,
  Ruler,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  MapContainer,
  Marker,
  Polyline,
  TileLayer,
  useMap,
} from 'react-leaflet';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import {
  getSession,
  type SkiRun,
  type SkiSession,
  type TrackPoint,
} from '../lib/api';
import { useAuth } from '../lib/auth';
import { cn } from '../lib/utils';

import 'leaflet/dist/leaflet.css';

// Fix default marker icons in bundled builds
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function speedColor(speed: number): string {
  if (speed < 10) return '#3b82f6'; // blue
  if (speed < 30) return '#eab308'; // yellow
  if (speed < 50) return '#f97316'; // orange
  return '#ef4444'; // red
}

function segmentsBySpeed(
  points: TrackPoint[],
): Array<{ positions: [number, number][]; color: string }> {
  if (points.length < 2) return [];

  const segments: Array<{ positions: [number, number][]; color: string }> = [];
  let currentColor = speedColor(points[0].speed);
  let currentPositions: [number, number][] = [[points[0].lat, points[0].lon]];

  for (let i = 1; i < points.length; i++) {
    const color = speedColor(points[i].speed);
    const pos: [number, number] = [points[i].lat, points[i].lon];

    if (color === currentColor) {
      currentPositions.push(pos);
    } else {
      // Bridge the gap: include this point in previous segment too
      currentPositions.push(pos);
      segments.push({ positions: currentPositions, color: currentColor });
      currentPositions = [pos];
      currentColor = color;
    }
  }

  if (currentPositions.length >= 2) {
    segments.push({ positions: currentPositions, color: currentColor });
  }

  return segments;
}

function FitBounds({ bounds }: { bounds: L.LatLngBoundsExpression }) {
  const map = useMap();
  useEffect(() => {
    map.fitBounds(bounds, { padding: [40, 40] });
  }, [map, bounds]);
  return null;
}

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
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function RunListItem({
  run,
  index,
  isHighlighted,
  onToggle,
}: {
  run: SkiRun;
  index: number;
  isHighlighted: boolean;
  onToggle: (id: string) => void;
}) {
  const duration = Math.round(
    (new Date(run.endTime).getTime() - new Date(run.startTime).getTime()) /
      1000,
  );
  const maxSpeed =
    run.trackPoints.length > 0
      ? Math.max(...run.trackPoints.map((p) => p.speed))
      : 0;

  return (
    <button
      type="button"
      onClick={() => onToggle(run.id)}
      className={cn(
        'w-full text-left rounded-xl border p-4 transition-all',
        isHighlighted
          ? 'border-brand bg-brand/5 shadow-sm'
          : 'border-border bg-card hover:border-brand/30',
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium text-foreground text-sm">
            Run {index + 1}
            {run.name && ` — ${run.name}`}
          </p>
          <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatDuration(duration)}
            </span>
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3" />
              {maxSpeed.toFixed(1)} km/h
            </span>
            <span>{run.trackPoints.length} pts</span>
          </div>
        </div>
        {isHighlighted ? (
          <ChevronUp className="w-4 h-4 text-brand" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        )}
      </div>
    </button>
  );
}

export default function SessionDetail() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const { apiToken } = useAuth();
  const navigate = useNavigate();

  const [session, setSession] = useState<SkiSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [highlightedRunId, setHighlightedRunId] = useState<string | null>(null);

  const fetchSession = useCallback(async () => {
    if (!apiToken || !sessionId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getSession(sessionId, apiToken);
      setSession(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to load session.';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [apiToken, sessionId]);

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  const allPoints = useMemo(() => {
    if (!session) return [];
    return session.skiRuns.flatMap((r) => r.trackPoints);
  }, [session]);

  const bounds = useMemo(() => {
    if (allPoints.length === 0) return null;
    const lats = allPoints.map((p) => p.lat);
    const lons = allPoints.map((p) => p.lon);
    return L.latLngBounds(
      [Math.min(...lats), Math.min(...lons)],
      [Math.max(...lats), Math.max(...lons)],
    );
  }, [allPoints]);

  const handleToggleRun = useCallback((id: string) => {
    setHighlightedRunId((prev) => (prev === id ? null : id));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-brand" />
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card">
          <div className="container mx-auto px-6 h-16 flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/journal')}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
        </header>
        <div className="container mx-auto px-6 py-20 text-center">
          <Mountain className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-foreground mb-2">
            Session not found
          </h2>
          <p className="text-muted-foreground">
            {error ?? 'This session does not exist.'}
          </p>
        </div>
      </div>
    );
  }

  const center: [number, number] =
    allPoints.length > 0 ? [allPoints[0].lat, allPoints[0].lon] : [46.8, 10.3]; // Default to Alps

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 h-16 flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/journal')}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Journal
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Session Summary */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-1">
            {formatDate(session.date)}
          </h1>
          <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {formatDuration(session.duration)}
            </span>
            <span className="flex items-center gap-1.5">
              <Ruler className="w-4 h-4" />
              {formatDistance(session.distance)}
            </span>
            <span className="flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" />
              {formatDistance(session.elevationGain)} gain
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4" />
              {session.maxSpeed.toFixed(1)} km/h max
            </span>
          </div>
        </div>

        {/* Map */}
        {allPoints.length > 0 && (
          <div className="rounded-2xl overflow-hidden border border-border mb-6 shadow-sm">
            <MapContainer
              center={center}
              zoom={13}
              style={{ height: '400px', width: '100%' }}
              scrollWheelZoom
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {bounds && <FitBounds bounds={bounds} />}

              {session.skiRuns.map((run) => {
                const isHighlighted =
                  highlightedRunId === null || highlightedRunId === run.id;
                const opacity = isHighlighted ? 1 : 0.25;

                const segments = segmentsBySpeed(run.trackPoints);
                const startPt = run.trackPoints[0];
                const endPt = run.trackPoints[run.trackPoints.length - 1];

                return (
                  <span key={run.id}>
                    {segments.map((seg, i) => (
                      <Polyline
                        key={`${run.id}-${i}`}
                        positions={seg.positions}
                        pathOptions={{
                          color: seg.color,
                          weight: 3,
                          opacity,
                        }}
                      />
                    ))}
                    {startPt && isHighlighted && (
                      <Marker
                        position={[startPt.lat, startPt.lon]}
                        icon={defaultIcon}
                      />
                    )}
                    {endPt && isHighlighted && (
                      <Marker
                        position={[endPt.lat, endPt.lon]}
                        icon={defaultIcon}
                      />
                    )}
                  </span>
                );
              })}
            </MapContainer>
          </div>
        )}

        {/* Speed Legend */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-6">
          <span className="font-medium">Speed:</span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-blue-500" /> &lt;10 km/h
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-yellow-500" /> 10-30 km/h
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-orange-500" /> 30-50 km/h
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-red-500" /> 50+ km/h
          </span>
        </div>

        {/* Run List */}
        {session.skiRuns.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              Runs ({session.skiRuns.length})
            </h2>
            <div className="space-y-2">
              {session.skiRuns.map((run, index) => (
                <RunListItem
                  key={run.id}
                  run={run}
                  index={index}
                  isHighlighted={highlightedRunId === run.id}
                  onToggle={handleToggleRun}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
