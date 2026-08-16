import styles from './ValidationDetailUI.module.css';

export default function ValidationDetailUI({ context, prompt, question, response, aiResponse }) {
  const displayPrompt = question || prompt || '';
  const displayResponse = aiResponse || response || '';

  return (
    <article className={styles.detailCard}>
      <h2 className={styles.contextText}>{context}</h2>
      
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

