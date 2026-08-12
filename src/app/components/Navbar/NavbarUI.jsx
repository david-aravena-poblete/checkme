import styles from './NavbarUI.module.css';

export default function NavbarUI() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        Check<span className={styles.logoAccent}>Me</span>
      </div>
      <div className={styles.nav}>
        <a href="/" className={styles.navLink}>Inicio</a>
        <button className={styles.authButton}>Iniciar Sesión</button>
      </div>
    </nav>
  );
}
