import { useState } from 'react';
import styles from './FeedbackSectionUI.module.css';

export default function FeedbackSectionUI({ comments, onSubmitComment, isSubmitting }) {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      onSubmitComment(newComment);
      setNewComment('');
    }
  };

  return (
    <section className={styles.section}>
      <h3 className={styles.title}>Comentarios y Feedback ({comments.length})</h3>
      
      <form className={styles.form} onSubmit={handleSubmit}>
        <textarea
          className={styles.textarea}
          placeholder="Escribe tu análisis o evidencia sobre esta respuesta..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          required
          rows={3}
        />
        <div className={styles.formFooter}>
          <button type="submit" className={styles.submitButton} disabled={isSubmitting || !newComment.trim()}>
            {isSubmitting ? 'Enviando...' : 'Añadir Feedback'}
          </button>
        </div>
      </form>

      <div className={styles.commentsList}>
        {comments.length === 0 ? (
          <p className={styles.emptyState}>No hay comentarios aún. Sé el primero en auditar.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className={styles.commentItem}>
              <div className={styles.commentHeader}>
                <span className={styles.userName}>{comment.userName}</span>
                <span className={styles.date}>
                  {new Date(comment.createdAt).toLocaleDateString('es-CL')}
                </span>
              </div>
              <p className={styles.commentText}>{comment.text}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
