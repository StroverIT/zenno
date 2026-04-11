import React, { createContext, useContext, useCallback } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

export type UserRole = 'client' | 'business' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  favorites: string[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: (callbackUrl?: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session } = useSession();
  const sessionUser = session?.user as (User & { role?: UserRole }) | undefined;

  const login = useCallback(async (email: string, password: string) => {
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    if (res?.error) {
      throw new Error(res.error);
    }
  }, []);

  const loginWithGoogle = useCallback(async (callbackUrl?: string) => {
    let url = callbackUrl;
    if (!url && typeof window !== 'undefined') {
      url = `${window.location.pathname}${window.location.search}`;
    }
    await signIn('google', { callbackUrl: url || '/' });
  }, []);

  const register = useCallback(
    async (name: string, email: string, password: string, role: UserRole) => {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Registration failed');
      }

      await login(email, password);
    },
    [login],
  );

  const logout = useCallback(() => {
    void signOut({ redirect: false });
  }, []);

  const mappedUser: User | null = sessionUser
    ? {
        id: sessionUser.id,
        name: sessionUser.name ?? '',
        email: sessionUser.email ?? '',
        role: (sessionUser.role as UserRole) ?? 'client',
        favorites: [],
      }
    : null;

  return (
    <AuthContext.Provider
      value={{
        user: mappedUser,
        login,
        loginWithGoogle,
        register,
        logout,
        isAuthenticated: !!mappedUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
