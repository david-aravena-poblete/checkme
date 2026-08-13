import styles from './AuthFormUI.module.css';
import Link from 'next/link';

export default function AuthFormUI({
  mode,
  email,
  password,
  confirmPassword,
  error,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onToggleMode,
  onSubmit
}) {
  const isLogin = mode === 'LOGIN';

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <Link href="/" className={styles.backLink}>← Volver</Link>
          <h2 className={styles.title}>
            {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </h2>
          <p className={styles.subtitle}>
            {isLogin 
              ? 'Accede a tu cuenta para participar.' 
              : 'Únete a la comunidad de verificadores.'}
          </p>
        </div>

        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              id="email"
              type="email"
              className={styles.input}
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              placeholder="tu@email.com"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Contraseña</label>
            <input
              id="password"
              type="password"
              className={styles.input}
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {!isLogin && (
            <div className={styles.inputGroup}>
              <label htmlFor="confirmPassword" className={styles.label}>Repetir Contraseña</label>
              <input
                id="confirmPassword"
                type="password"
                className={styles.input}
                value={confirmPassword}
                onChange={(e) => onConfirmPasswordChange(e.target.value)}
                placeholder="••••••••"
                required={!isLogin}
              />
            </div>
          )}

          {error && <div className={styles.error}>{error}</div>}

          <button type="submit" className={styles.submitButton}>
            {isLogin ? 'Ingresar' : 'Crear Cuenta'}
          </button>
        </form>

        <div className={styles.footer}>
          <span className={styles.footerText}>
            {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
          </span>
          <button 
            type="button" 
            className={styles.toggleButton} 
            onClick={onToggleMode}
          >
            {isLogin ? 'Regístrate aquí' : 'Inicia sesión'}
          </button>
        </div>
      </div>
    </div>
  );
}
