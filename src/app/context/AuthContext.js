'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { getStoredAuthUser } from '@/lib/localStorageDb';

const AuthContext = createContext({
  user: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar usuario autenticado desde LocalStorage
    const initialUser = getStoredAuthUser();
    setUser(initialUser);
    setLoading(false);

    // Escuchar cambios de autenticación
    const handleAuthChange = (event) => {
      setUser(event.detail);
    };

    const handleStorage = (event) => {
      if (event.key === 'checkme_auth_user') {
        setUser(getStoredAuthUser());
      }
    };

    window.addEventListener('checkme_auth_changed', handleAuthChange);
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('checkme_auth_changed', handleAuthChange);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

