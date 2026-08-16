'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './FeedbackSectionUI.module.css';

export default function FeedbackSectionUI({ 
  comments, 
  onSubmitComment, 
  onEditComment,
  onDeleteComment,
  isSubmitting, 
  isAuthenticated = false,
  currentUserId = null
}) {
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      onSubmitComment(newComment);
      setNewComment('');
    }
  };

  const handleStartEdit = (comment) => {
    setEditingCommentId(comment.id);
    setEditingText(comment.text);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditingText('');
  };

  const handleSaveEdit = async (commentId) => {
    if (!editingText.trim() || !onEditComment) return;
    try {
      setIsSavingEdit(true);
      await onEditComment(commentId, editingText.trim());
      setEditingCommentId(null);
      setEditingText('');
    } catch (error) {
      alert(error.message || 'Error al actualizar comentario');
    } finally {
      setIsSavingEdit(false);
    }
  };

  const handleDelete = (commentId) => {
    const confirmDelete = window.confirm('¿Deseas eliminar este comentario?');
    if (confirmDelete && onDeleteComment) {
      onDeleteComment(commentId);
    }
  };

  return (
    <section className={styles.section}>
      <h3 className={styles.title}>Comentarios y Feedback ({comments.length})</h3>
      
      {isAuthenticated ? (
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
      ) : (
        <div className={styles.authPrompt}>
          <p className={styles.authPromptText}>
            Inicia sesión para aportar tu análisis o evidencia técnica sobre esta auditoría.
          </p>
          <Link href="/auth" className={styles.authLink}>Iniciar Sesión</Link>
        </div>
      )}

      <div className={styles.commentsList}>
        {comments.length === 0 ? (
          <p className={styles.emptyState}>No hay comentarios aún. Sé el primero en auditar.</p>
        ) : (
          comments.map((comment) => {
            const isAuthor = currentUserId && comment.userId === currentUserId;
            const isEditingThis = editingCommentId === comment.id;

            return (
              <div key={comment.id} className={styles.commentItem}>
                <div className={styles.commentHeader}>
                  <div className={styles.commentAuthorGroup}>
                    <span className={styles.userName}>{comment.userName}</span>
                    <span className={styles.date}>
                      {new Date(comment.createdAt).toLocaleDateString('es-CL')}
                    </span>
                  </div>

                  {isAuthor && !isEditingThis && (
                    <div className={styles.commentActions}>
                      <button
                        type="button"
                        className={styles.commentActionBtn}
                        onClick={() => handleStartEdit(comment)}
                        title="Editar comentario"
                      >
                        ✏️ Editar
                      </button>
                      <button
                        type="button"
                        className={`${styles.commentActionBtn} ${styles.deleteActionBtn}`}
                        onClick={() => handleDelete(comment.id)}
                        title="Eliminar comentario"
                      >
                        🗑️ Eliminar
                      </button>
                    </div>
                  )}
                </div>

                {isEditingThis ? (
                  <div className={styles.editInlineForm}>
                    <textarea
                      className={styles.editInlineTextarea}
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      rows={3}
                      disabled={isSavingEdit}
                      required
                    />
                    <div className={styles.editInlineButtons}>
                      <button
                        type="button"
                        className={styles.cancelEditBtn}
                        onClick={handleCancelEdit}
                        disabled={isSavingEdit}
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        className={styles.saveEditBtn}
                        onClick={() => handleSaveEdit(comment.id)}
                        disabled={isSavingEdit || !editingText.trim()}
                      >
                        {isSavingEdit ? 'Guardando...' : 'Guardar'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className={styles.commentText}>{comment.text}</p>
                )}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
