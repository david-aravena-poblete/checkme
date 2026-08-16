'use client';

import { useState, useEffect } from 'react';
import styles from './EditDoubtModalUI.module.css';

export default function EditDoubtModalUI({
  isOpen,
  initialData,
  onClose,
  onSave,
  isSaving = false,
}) {
  const [context, setContext] = useState('');
  const [question, setQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  useEffect(() => {
    if (initialData) {
      setContext(initialData.context || '');
      setQuestion(initialData.question || initialData.prompt || '');
      setAiResponse(initialData.aiResponse || initialData.response || '');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: initialData?.id,
      context,
      question,
      aiResponse,
    });
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Editar Duda Publicada</h2>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            disabled={isSaving}
          >
            &times;
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="edit-context" className={styles.label}>
              Contexto (¿Por qué hiciste esta pregunta y qué duda te genera?)
            </label>
            <textarea
              id="edit-context"
              className={styles.textarea}
              placeholder="Explica el motivo y la duda generada..."
              value={context}
              onChange={(e) => setContext(e.target.value)}
              required
              rows={3}
              disabled={isSaving}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="edit-question" className={styles.label}>
              Pregunta realizada a la IA
            </label>
            <textarea
              id="edit-question"
              className={styles.textarea}
              placeholder="Pega la pregunta formulada a la IA..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
              rows={3}
              disabled={isSaving}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="edit-aiResponse" className={styles.label}>
              Respuesta de la IA
            </label>
            <textarea
              id="edit-aiResponse"
              className={styles.textarea}
              placeholder="Pega la respuesta de la IA a auditar..."
              value={aiResponse}
              onChange={(e) => setAiResponse(e.target.value)}
              required
              rows={5}
              disabled={isSaving}
            />
          </div>

          <div className={styles.footer}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
              disabled={isSaving}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSaving}
            >
              {isSaving ? 'Guardando cambios...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
