import styles from './NavbarUI.module.css';
import Link from 'next/link';

export default function NavbarUI({ isAuthenticated, onLogout, currentPath = '/' }) {
  const isDashboard = currentPath === '/dashboard';
  
  const navHref = isDashboard ? '/' : (isAuthenticated ? '/dashboard' : '/');
  const navLabel = isDashboard 
    ? 'Ir al Home' 
    : (isAuthenticated ? 'Volver al Dashboard' : 'Inicio');

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
          Valida<span className={styles.logoAccent}>la</span>
        </Link>
      </div>
      <div className={styles.nav}>
        <Link 
          href={navHref} 
          className={styles.navLink}
        >
          {navLabel}
        </Link>
        {isAuthenticated ? (
          <button className={styles.authButton} onClick={onLogout}>Cerrar Sesión</button>
        ) : (
          <Link href="/auth">
            <button className={styles.authButton}>Iniciar Sesión</button>
          </Link>
        )}
      </div>
    </nav>
  );
}


