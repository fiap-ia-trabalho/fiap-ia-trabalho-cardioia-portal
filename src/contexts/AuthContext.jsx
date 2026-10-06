import { createContext, useContext, useEffect, useState } from 'react';
import { AUTH_KEY, clearDemoSession, createDemoSession, readDemoSession } from '../services/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(readDemoSession);
  useEffect(() => {
    if (!session) return;
    const timer = setTimeout(() => { clearDemoSession(); setSession(null); }, Math.max(0, session.user.exp * 1000 - Date.now()));
    return () => clearTimeout(timer);
  }, [session]);
  useEffect(() => {
    const sync = (event) => { if (event.key === AUTH_KEY) setSession(readDemoSession()); };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);
  const login = (email, password) => setSession(createDemoSession(email, password));
  const logout = () => { clearDemoSession(); setSession(null); };
  return <AuthContext.Provider value={{ user: session?.user ?? null, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
