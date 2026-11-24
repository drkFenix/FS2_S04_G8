import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  AUTH_EVENT,
  getAuthSession,
  saveAuthSession,
  updateStoredUser,
  clearAuthSession,
} from '../utils/authSession';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => getAuthSession());

  useEffect(() => {
    const syncSession = () => setSession(getAuthSession());
    window.addEventListener(AUTH_EVENT, syncSession);
    return () => window.removeEventListener(AUTH_EVENT, syncSession);
  }, []);

  // Renovacion proactiva del accessToken 60s antes de expirar
  useEffect(() => {
    if (!session?.expiresAt) return undefined;
    const msUntilRefresh = Math.max(0, session.expiresAt - Date.now() - 60000);
    const timer = window.setTimeout(async () => {
      const current = getAuthSession();
      if (!current?.refreshToken) {
        clearAuthSession();
        return;
      }
      try {
        const renewed = await authService.refresh(current.refreshToken);
        saveAuthSession(renewed);
      } catch {
        clearAuthSession();
      }
    }, msUntilRefresh);

    return () => window.clearTimeout(timer);
  }, [session?.expiresAt]);

  const login = useCallback(async (correo, password) => {
    const data = await authService.login(correo, password);
    return saveAuthSession(data);
  }, []);

  const register = useCallback(async (payload) => {
    const data = await authService.register(payload);
    return saveAuthSession(data);
  }, []);

  const refreshProfile = useCallback(async () => {
    const freshUser = await authService.me();
    updateStoredUser(freshUser);
    return freshUser;
  }, []);

  const logout = useCallback(() => {
    clearAuthSession();
  }, []);

  const user = session?.user || null;
  const role = user?.rol || null;

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        role,
        isAuthenticated: Boolean(session?.accessToken && user),
        login,
        register,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}
