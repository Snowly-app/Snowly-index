// ---- Server response types (match actual API responses) ----

interface ServerTrackPoint {
  latitude: number;
  longitude: number;
  altitude: number;
  estimatedSpeed?: number;
  speed?: number;
  course?: number;
  horizontalAccuracy?: number;
  rawTimestamp?: string;
  timestamp?: string;
}

interface ServerRun {
  id: string;
  sessionId: string;
  startDate: string;
  endDate: string;
  distance: number;
  verticalDrop: number;
  maxSpeed: number;
  averageSpeed: number;
  activityType: string;
  trackPoints: ServerTrackPoint[];
}

interface ServerSession {
  id: string;
  userId: string;
  startDate: string;
  endDate: string;
  totalDistance: number;
  totalVertical: number;
  maxSpeed: number;
  runCount: number;
  noteTitle: string | null;
  noteBody: string | null;
}

interface ServerSessionDetail extends ServerSession {
  runs: ServerRun[];
}

// ---- Domain types (used by UI components) ----

export interface TrackPoint {
  lat: number;
  lon: number;
  alt: number;
  speed: number;
  timestamp: string;
}

export interface SkiRun {
  id: string;
  name: string | null;
  startTime: string;
  endTime: string;
  trackPoints: TrackPoint[];
}

export interface SkiSession {
  id: string;
  userId: string;
  date: string;
  duration: number;
  distance: number;
  elevationGain: number;
  maxSpeed: number;
  skiRuns: SkiRun[];
}

// ---- Mapping (server → domain) ----

function durationSeconds(startDate: string, endDate: string): number {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  return Math.max(0, Math.round((end - start) / 1000));
}

function mapTrackPoint(tp: ServerTrackPoint): TrackPoint {
  return {
    lat: tp.latitude,
    lon: tp.longitude,
    alt: tp.altitude,
    speed: tp.estimatedSpeed ?? tp.speed ?? 0,
    timestamp: tp.rawTimestamp ?? tp.timestamp ?? '',
  };
}

function mapRun(run: ServerRun): SkiRun {
  return {
    id: run.id,
    name: null,
    startTime: run.startDate,
    endTime: run.endDate,
    trackPoints: (run.trackPoints ?? []).map(mapTrackPoint),
  };
}

function mapSessionSummary(s: ServerSession): SkiSession {
  return {
    id: s.id,
    userId: s.userId,
    date: s.startDate,
    duration: durationSeconds(s.startDate, s.endDate),
    distance: s.totalDistance,
    elevationGain: s.totalVertical,
    maxSpeed: s.maxSpeed,
    skiRuns: [],
  };
}

function mapSessionDetail(s: ServerSessionDetail): SkiSession {
  return {
    ...mapSessionSummary(s),
    skiRuns: s.runs.map(mapRun),
  };
}

// ---- API client ----

interface RegisterResponse {
  apiToken: string;
}

class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

const BASE_URL =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:4000/api/v1'
    : 'https://api.snowly.app/api/v1';

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${BASE_URL}${path}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    const message =
      (body as Record<string, unknown>).error ??
      (body as Record<string, unknown>).message ??
      `Request failed with status ${response.status}`;
    throw new ApiError(String(message), response.status);
  }

  return response.json() as Promise<T>;
}

function authHeaders(apiToken: string): HeadersInit {
  return { Authorization: `Bearer ${apiToken}` };
}

export function register(
  userId: string,
  displayName: string,
  deviceSecret: string,
): Promise<RegisterResponse> {
  return request<RegisterResponse>('/users/register', {
    method: 'POST',
    body: JSON.stringify({ userId, displayName, deviceSecret }),
  });
}

export function reauthenticate(
  userId: string,
  deviceSecret: string,
): Promise<RegisterResponse> {
  return request<RegisterResponse>('/users/reauthenticate', {
    method: 'POST',
    body: JSON.stringify({ userId, deviceSecret }),
  });
}

export async function getSessions(
  apiToken: string,
): Promise<{ sessions: SkiSession[] }> {
  const data = await request<{ sessions: ServerSession[] }>(
    '/snowly/sessions',
    { headers: authHeaders(apiToken) },
  );
  return { sessions: data.sessions.map(mapSessionSummary) };
}

export async function getSession(
  sessionId: string,
  apiToken: string,
): Promise<SkiSession> {
  const data = await request<{ session: ServerSessionDetail }>(
    `/snowly/sessions/${sessionId}`,
    { headers: authHeaders(apiToken) },
  );
  return mapSessionDetail(data.session);
}

export { ApiError };
