'use client';

import { useRouter } from 'next/navigation';
import NavbarUI from './NavbarUI';
import { useAuth } from '@/app/context/AuthContext';
import { logoutUser } from '@/app/auth/utils/auth.utils';

export default function Navbar() {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    const result = await logoutUser();
    if (result.success) {
      router.push('/');
    } else {
      console.error(result.error);
    }
  };

  // Convertimos la existencia de 'user' a booleano para pasarlo a la UI
  return <NavbarUI isAuthenticated={!!user} onLogout={handleLogout} />;
}
