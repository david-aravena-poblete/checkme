import styles from './SearchInputUI.module.css';

export default function SearchInputUI({ value, onChange, placeholder }) {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span className={styles.icon}>⌕</span>
        <input
          type="text"
          className={styles.input}
          value={value}
          onChange={onChange}
          placeholder={placeholder || 'Buscar por título...'}
        />
      </div>
    </div>
  );
}
