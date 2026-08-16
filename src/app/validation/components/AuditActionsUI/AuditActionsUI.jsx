'use client';

import { useState } from 'react';
import styles from './AuditActionsUI.module.css';
import Link from 'next/link';

export default function AuditActionsUI({ 
  likesCount, 
  dislikesCount, 
  onVote, 
  userVote, 
  isVoting, 
  isAuthenticated = false 
}) {
  const [isChanging, setIsChanging] = useState(false);

  const handleVoteClick = (isLike) => {
    onVote(isLike);
    setIsChanging(false);
  };

  // Cuando el usuario ya votó y no ha presionado "Cambiar", mostramos exclusivamente la opción seleccionada
  const showOnlySelected = isAuthenticated && Boolean(userVote) && !isChanging;

  return (
    <div className={styles.actionsContainer}>
      <h3 className={styles.title}>Auditar Respuesta</h3>
      <p className={styles.subtitle}>¿La información generada por la IA es correcta y veraz?</p>
      
      <div className={styles.buttonsWrapper}>
        {(!showOnlySelected || userVote === 'LIKE') && (
          <button 
            type="button"
            className={`${styles.voteButton} ${styles.likeButton} ${userVote === 'LIKE' ? styles.activeLike : ''}`}
            onClick={() => handleVoteClick(true)}
            disabled={!isAuthenticated || (showOnlySelected && userVote === 'LIKE') || isVoting}
            title={!isAuthenticated ? 'Inicia sesión para votar' : undefined}
          >
            <span className={styles.icon}>👍</span>
            <span className={styles.text}>IA Correcta</span>
            <span className={styles.count}>{likesCount}</span>
          </button>
        )}
        
        {(!showOnlySelected || userVote === 'DISLIKE') && (
          <button 
            type="button"
            className={`${styles.voteButton} ${styles.dislikeButton} ${userVote === 'DISLIKE' ? styles.activeDislike : ''}`}
            onClick={() => handleVoteClick(false)}
            disabled={!isAuthenticated || (showOnlySelected && userVote === 'DISLIKE') || isVoting}
            title={!isAuthenticated ? 'Inicia sesión para votar' : undefined}
          >
            <span className={styles.icon}>👎</span>
            <span className={styles.text}>IA Alucinó / Falló</span>
            <span className={styles.count}>{dislikesCount}</span>
          </button>
        )}
      </div>

      {isAuthenticated ? (
        showOnlySelected ? (
          <div className={styles.changeActionRow}>
            <p className={styles.votedMessage}>Puedes cambiar tu voto si lo deseas.</p>
            <button
              type="button"
              className={styles.changeButton}
              onClick={() => setIsChanging(true)}
              disabled={isVoting}
            >
              Cambiar
            </button>
          </div>
        ) : isChanging ? (
          <p className={styles.promptSelectMessage}>Selecciona una opción para actualizar tu veredicto.</p>
        ) : null
      ) : (
        <div className={styles.authPrompt}>
          <p className={styles.authPromptText}>Debes iniciar sesión para emitir tu veredicto sobre esta respuesta.</p>
          <Link href="/auth" className={styles.authLink}>Iniciar Sesión</Link>
        </div>
      )}
    </div>
  );
}
