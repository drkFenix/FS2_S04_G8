const STORAGE_KEY = 'huertohogar.auth';
export const AUTH_EVENT = 'huertohogar-auth-changed';

export function getAuthSession() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw);
    if (
      typeof session?.accessToken === 'string' &&
      Number.isFinite(session.expiresAt) &&
      session.user &&
      typeof session.user.rol === 'string'
    ) {
      if (session.expiresAt > Date.now() || typeof session.refreshToken === 'string') {
        return session;
      }
    }
  } catch {
    return null;
  }
  return null;
}

export function saveAuthSession(authResponse) {
  const session = {
    accessToken: authResponse.accessToken,
    refreshToken: authResponse.refreshToken || null,
    tokenType: authResponse.tokenType || 'Bearer',
    expiresAt: Date.now() + (authResponse.expiresIn || 900) * 1000,
    user: authResponse.user,
  };
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  window.dispatchEvent(new Event(AUTH_EVENT));
  return session;
}

export function updateStoredUser(user) {
  const current = getAuthSession();
  if (!current) return null;
  const updated = { ...current, user };
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event(AUTH_EVENT));
  return updated;
}

export function clearAuthSession() {
  sessionStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event(AUTH_EVENT));
}
