import { useState } from 'react';
import styles from './PublishModalUI.module.css';

export default function PublishModalUI({ isOpen, onClose, onSubmit, isPublishing }) {
  const [contextText, setContextText] = useState('');
  const [promptText, setPromptText] = useState('');
  const [responseText, setResponseText] = useState('');

  if (!isOpen) return null;

  const handleClose = () => {
    setContextText('');
    setPromptText('');
    setResponseText('');
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      context: contextText,
      prompt: promptText,
      response: responseText,
    });
    // El form se limpia desde afuera o después de éxito.
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Auditar Respuesta de IA</h2>
          <button className={styles.closeButton} onClick={handleClose}>&times;</button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="contextText" className={styles.label}>
              Contextualiza lo que quieres validar
            </label>
            <textarea
              id="contextText"
              className={styles.textarea}
              placeholder="Ej: Le pedí a la IA que me explicara cómo funcionan los agujeros negros, pero creo que se equivocó en una parte..."
              value={contextText}
              onChange={(e) => setContextText(e.target.value)}
              required
              rows={3}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="promptText" className={styles.label}>
              Prompt entregado a la IA
            </label>
            <textarea
              id="promptText"
              className={styles.textarea}
              placeholder="Pega la pregunta exacta que le hiciste..."
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              required
              rows={3}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="responseText" className={styles.label}>
              Respuesta generada por la IA
            </label>
            <textarea
              id="responseText"
              className={styles.textarea}
              placeholder="Pega la respuesta completa que quieres someter a validación..."
              value={responseText}
              onChange={(e) => setResponseText(e.target.value)}
              required
              rows={5}
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
              {isPublishing ? 'Publicando...' : 'Publicar para Validar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
