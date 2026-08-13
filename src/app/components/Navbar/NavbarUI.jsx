import styles from './NavbarUI.module.css';
import Link from 'next/link';

export default function NavbarUI({ isAuthenticated, onLogout }) {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
          Check<span className={styles.logoAccent}>Me</span>
        </Link>
      </div>
      <div className={styles.nav}>
        <Link href="/" className={styles.navLink}>Inicio</Link>
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
