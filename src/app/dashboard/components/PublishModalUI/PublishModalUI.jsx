import { useState } from 'react';
import styles from './PublishModalUI.module.css';

export default function PublishModalUI({
  isOpen,
  onClose,
  onSubmit,
  isPublishing,
}) {
  const [context, setContext] = useState('');
  const [question, setQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  if (!isOpen) return null;

  const handleClose = () => {
    setContext('');
    setQuestion('');
    setAiResponse('');
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      context,
      question,
      aiResponse,
    });
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Auditar respuesta de IA</h2>

          <button
            type="button"
            className={styles.closeButton}
            onClick={handleClose}
            disabled={isPublishing}
          >
            &times;
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="context" className={styles.label}>
              Contexto
            </label>

            <textarea
              id="context"
              className={styles.textarea}
              placeholder="Ej: Le pedí a la IA que me explicara cómo funcionan los agujeros negros, pero creo que se equivocó en una parte..."
              value={context}
              onChange={(e) => setContext(e.target.value)}
              required
              rows={3}
              disabled={isPublishing}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="question" className={styles.label}>
              Pregunta realizada a la IA
            </label>

            <textarea
              id="question"
              className={styles.textarea}
              placeholder="Pega la pregunta exacta que le hiciste a la IA..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
              rows={3}
              disabled={isPublishing}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="aiResponse" className={styles.label}>
              Respuesta de la IA
            </label>

            <textarea
              id="aiResponse"
              className={styles.textarea}
              placeholder="Pega la respuesta completa que quieres someter a validación..."
              value={aiResponse}
              onChange={(e) => setAiResponse(e.target.value)}
              required
              rows={5}
              disabled={isPublishing}
            />
          </div>

          <div className={styles.footer}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={handleClose}
              disabled={isPublishing}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isPublishing}
            >
              {isPublishing ? 'Publicando...' : 'Publicar para validar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}