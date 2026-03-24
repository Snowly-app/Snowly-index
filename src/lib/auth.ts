import {
  createContext,
  createElement,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import * as api from './api';

interface AuthState {
  userId: string;
  deviceSecret: string;
  apiToken: string;
}

interface AuthContextValue {
  userId: string | null;
  apiToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  register: (
    userId: string,
    displayName: string,
    deviceSecret: string,
  ) => Promise<void>;
  reauthenticate: () => Promise<void>;
  logout: () => void;
}

const STORAGE_KEY = 'snowly_auth';

function loadAuth(): AuthState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    if (
      typeof parsed.userId === 'string' &&
      typeof parsed.deviceSecret === 'string' &&
      typeof parsed.apiToken === 'string'
    ) {
      return parsed as unknown as AuthState;
    }
    return null;
  } catch {
    return null;
  }
}

function saveAuth(state: AuthState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function clearAuth(): void {
  localStorage.removeItem(STORAGE_KEY);
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = loadAuth();
    setAuthState(stored);
    setIsLoading(false);
  }, []);

  const registerFn = useCallback(
    async (userId: string, displayName: string, deviceSecret: string) => {
      const { apiToken } = await api.register(
        userId,
        displayName,
        deviceSecret,
      );
      const newState: AuthState = { userId, deviceSecret, apiToken };
      saveAuth(newState);
      setAuthState(newState);
    },
    [],
  );

  const reauthenticateFn = useCallback(async () => {
    if (!authState) {
      throw new Error('No credentials to reauthenticate with');
    }
    const { apiToken } = await api.reauthenticate(
      authState.userId,
      authState.deviceSecret,
    );
    const newState: AuthState = { ...authState, apiToken };
    saveAuth(newState);
    setAuthState(newState);
  }, [authState]);

  const logout = useCallback(() => {
    clearAuth();
    setAuthState(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      userId: authState?.userId ?? null,
      apiToken: authState?.apiToken ?? null,
      isAuthenticated: authState !== null,
      isLoading,
      register: registerFn,
      reauthenticate: reauthenticateFn,
      logout,
    }),
    [authState, isLoading, registerFn, reauthenticateFn, logout],
  );

  return createElement(AuthContext.Provider, { value }, children);
}
