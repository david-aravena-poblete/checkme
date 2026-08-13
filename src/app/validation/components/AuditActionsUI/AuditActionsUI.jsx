import styles from './AuditActionsUI.module.css';

export default function AuditActionsUI({ likesCount, dislikesCount, onVote, userVote, isVoting }) {
  return (
    <div className={styles.actionsContainer}>
      <h3 className={styles.title}>Auditar Respuesta</h3>
      <p className={styles.subtitle}>¿La información generada por la IA es correcta y veraz?</p>
      
      <div className={styles.buttonsWrapper}>
        <button 
          className={`${styles.voteButton} ${styles.likeButton} ${userVote === 'LIKE' ? styles.activeLike : ''}`}
          onClick={() => onVote(true)}
          disabled={userVote === 'LIKE' || isVoting}
        >
          <span className={styles.icon}>👍</span>
          <span className={styles.text}>IA Correcta</span>
          <span className={styles.count}>{likesCount}</span>
        </button>
        
        <button 
          className={`${styles.voteButton} ${styles.dislikeButton} ${userVote === 'DISLIKE' ? styles.activeDislike : ''}`}
          onClick={() => onVote(false)}
          disabled={userVote === 'DISLIKE' || isVoting}
        >
          <span className={styles.icon}>👎</span>
          <span className={styles.text}>IA Alucinó / Falló</span>
          <span className={styles.count}>{dislikesCount}</span>
        </button>
      </div>
      {userVote && <p className={styles.votedMessage}>Puedes cambiar tu voto si lo deseas.</p>}
    </div>
  );
}
