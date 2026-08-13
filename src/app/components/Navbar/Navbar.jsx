'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NavbarUI from './NavbarUI';

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Revisar si existe una sesión guardada (mock)
    const isAuth = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(isAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    router.push('/');
  };

  return <NavbarUI isAuthenticated={isAuthenticated} onLogout={handleLogout} />;
}
