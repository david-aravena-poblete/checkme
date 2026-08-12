import styles from './DoubtCardUI.module.css';

export default function DoubtCardUI({ title, content, authorName, date, responsesCount }) {
  return (
    <article className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.content}>{content}</p>
      <div className={styles.meta}>
        <span className={styles.author}>{authorName}</span>
        <span className={styles.dot}>•</span>
        <span className={styles.date}>{date}</span>
        {responsesCount > 0 && (
          <span className={styles.responsesCount}>
            💬 {responsesCount}
          </span>
        )}
      </div>
    </article>
  );
}
