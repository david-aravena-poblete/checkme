import Link from 'next/link';
import styles from './DoubtCardUI.module.css';

export default function DoubtCardUI({ id, context, question, aiResponse, date, status, validationCounts }) {
  // Función auxiliar para truncar texto
  const truncateText = (text, maxLength) => {
    return text && text.length > maxLength 
      ? text.substring(0, maxLength) + '...' 
      : text;
  };

  const counts = validationCounts || { correct: 0, partiallyCorrect: 0, incorrect: 0 };

  return (
    <Link href={`/validation/${id}`} className={styles.cardLink}>
      <article className={styles.card}>
        
        {/* Context block */}
        <div className={styles.contentBlock}>
          <span className={styles.blockLabel}>Contexto:</span>
          <p className={styles.contextText}>{truncateText(context, 100)}</p>
        </div>
        
        {/* Question block */}
        <div className={styles.contentBlock}>
          <span className={styles.blockLabel}>Pregunta para la IA:</span>
          <p className={styles.questionText}>{truncateText(question, 100)}</p>
        </div>
        
        {/* Response block */}
        <div className={styles.responseBlock}>
          <span className={styles.blockLabel}>Respuesta de la IA:</span>
          <p className={styles.responseText}>{truncateText(aiResponse, 150)}</p>
        </div>
        
        {/* Metadata */}
        <div className={styles.meta}>
          <span className={styles.date}>{date}</span>
          <span className={styles.dot}>•</span>
          <div className={styles.votes}>
            <span className={styles.votesLabel}>Validaciones:</span>
            <span className={styles.voteItem} title="Correcto">✅ {counts.correct}</span>
            <span className={styles.voteItem} title="Parcialmente Correcto">⚠️ {counts.partiallyCorrect}</span>
            <span className={styles.voteItem} title="Incorrecto">❌ {counts.incorrect}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
