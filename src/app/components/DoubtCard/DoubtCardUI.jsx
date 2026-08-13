import styles from './DoubtCardUI.module.css';

export default function DoubtCardUI({ context, prompt, response, date, status }) {
  // Truncate response text for preview
  const truncatedResponse = response && response.length > 250 
    ? response.substring(0, 250) + '...' 
    : response;

  return (
    <article className={styles.card}>
      {/* Context (Acts as Title) */}
      <h3 className={styles.contextText}>{context}</h3>
      
      {/* Prompt block */}
      <div className={styles.promptBlock}>
        <span className={styles.promptLabel}>Prompt</span>
        <p className={styles.promptText}>{prompt}</p>
      </div>
      
      {/* Response Preview */}
      <div className={styles.responseBlock}>
        <p className={styles.responseText}>{truncatedResponse}</p>
      </div>
      
      {/* Metadata */}
      <div className={styles.meta}>
        <span className={styles.date}>{date}</span>
        <span className={styles.dot}>•</span>
        <span className={`${styles.statusBadge} ${status === 'PENDING' ? styles.statusPending : ''}`}>
          {status === 'PENDING' ? 'En Auditoría' : status}
        </span>
      </div>
    </article>
  );
}
