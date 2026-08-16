'use client';

import { useRouter, usePathname } from 'next/navigation';
import NavbarUI from './NavbarUI';
import { useAuth } from '@/app/context/AuthContext';
import { logoutUser } from '@/app/auth/utils/auth.utils';

export default function Navbar() {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    const result = await logoutUser();
    if (result.success) {
      router.push('/');
    } else {
      console.error(result.error);
    }
  };

  // Convertimos la existencia de 'user' a booleano y pasamos la ruta actual para la navegación contextual
  return (
    <NavbarUI 
      isAuthenticated={!!user} 
      onLogout={handleLogout} 
      currentPath={pathname}
    />
  );
}

