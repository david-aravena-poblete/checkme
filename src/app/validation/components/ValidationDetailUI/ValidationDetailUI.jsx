'use client';

import styles from './ValidationDetailUI.module.css';

export default function ValidationDetailUI({ 
  context, 
  prompt, 
  question, 
  response, 
  aiResponse,
  isAuthor = false,
  onEdit,
  onDelete
}) {
  const displayPrompt = question || prompt || '';
  const displayResponse = aiResponse || response || '';

  return (
    <article className={styles.detailCard}>
      <div className={styles.headerRow}>
        <h2 className={styles.contextText}>{context}</h2>
        {isAuthor && (
          <div className={styles.authorActions}>
            {onEdit && (
              <button
                type="button"
                className={`${styles.actionButton} ${styles.editButton}`}
                onClick={onEdit}
                title="Editar esta duda"
              >
                ✏️ Editar Duda
              </button>
            )}
            {onDelete && (
              <button
                type="button"
                className={`${styles.actionButton} ${styles.deleteButton}`}
                onClick={onDelete}
                title="Eliminar esta duda"
              >
                🗑️ Eliminar Duda
              </button>
            )}
          </div>
        )}
      </div>
      
      <div className={styles.promptBlock}>
        <span className={styles.promptLabel}>Prompt (Input del Usuario)</span>
        <p className={styles.promptText}>{displayPrompt}</p>
      </div>
      
      <div className={styles.responseBlock}>
        <span className={styles.responseLabel}>Respuesta Generada por IA</span>
        <p className={styles.responseText}>{displayResponse}</p>
      </div>
    </article>
  );
}
