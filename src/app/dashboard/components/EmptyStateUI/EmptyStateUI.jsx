import styles from './EmptyStateUI.module.css';

export default function EmptyStateUI({ title, message, ctaText, onCtaClick }) {
  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>
        <span className={styles.icon}>📭</span>
      </div>
      <h4 className={styles.title}>{title}</h4>
      <p className={styles.message}>{message}</p>
      {ctaText && (
        <button className={styles.ctaButton} onClick={onCtaClick}>
          {ctaText}
        </button>
      )}
    </div>
  );
}
