'use client';

import { useState, useEffect, use } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import ValidationDetailUI from '../components/ValidationDetailUI/ValidationDetailUI';
import AuditActionsUI from '../components/AuditActionsUI/AuditActionsUI';
import FeedbackSectionUI from '../components/FeedbackSectionUI/FeedbackSectionUI';
import { getValidationDetails, getComments, addComment, castVote, checkUserVote } from '../utils/validationUtils';
import styles from './page.module.css';
import Link from 'next/link';

export default function ValidationPage({ params }) {
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;
  
  const [validation, setValidation] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [userVote, setUserVote] = useState(null); // 'LIKE' o 'DISLIKE' o null
  const [isVoting, setIsVoting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const valData = await getValidationDetails(id);
        if (!valData) {
          setError('Validación no encontrada');
        } else {
          setValidation(valData);
          // Consultar en paralelo comentarios y el voto del usuario actual
          const [commData, voteData] = await Promise.all([
            getComments(id),
            checkUserVote(id)
          ]);
          setComments(commData);
          setUserVote(voteData);
        }
      } catch (err) {
        console.error(err);
        setError('Error al cargar la validación');
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const handleVote = async (isLike) => {
    const newVoteType = isLike ? 'LIKE' : 'DISLIKE';
    if (userVote === newVoteType || isVoting) return; // Evitar doble submit o votar lo mismo
    
    setIsVoting(true);
    const previousVote = userVote;
    
    // Optistic update
    setUserVote(newVoteType);
    setValidation(prev => {
      let lCount = prev.likesCount;
      let dCount = prev.dislikesCount;
      
      if (newVoteType === 'LIKE') {
        lCount++;
        if (previousVote === 'DISLIKE') dCount--;
      } else {
        dCount++;
        if (previousVote === 'LIKE') lCount--;
      }
      return { ...prev, likesCount: lCount, dislikesCount: dCount };
    });

    try {
      const success = await castVote(id, isLike);
      if (!success) {
        // Rollback si por alguna razón falla (ej: ya había votado igual simultáneamente)
        // No es estrictamente necesario aquí dado que controlamos el state arriba.
      }
    } catch (err) {
      console.error(err);
      // Rollback
      setUserVote(previousVote);
      alert("Hubo un error al guardar tu voto.");
    } finally {
      setIsVoting(false);
    }
  };

  const handleAddComment = async (text) => {
    try {
      setIsSubmittingComment(true);
      const newComment = await addComment(id, text);
      setComments(prev => [...prev, newComment]);
    } catch (err) {
      alert('Error al añadir el comentario');
      console.error(err);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  if (isLoading) {
    return (
      <main className={styles.main}>
        <Navbar />
        <div className={styles.centerContainer}>Cargando validación...</div>
      </main>
    );
  }

  if (error || !validation) {
    return (
      <main className={styles.main}>
        <Navbar />
        <div className={styles.centerContainer}>
          <h2>{error}</h2>
          <Link href="/" className={styles.backLink}>Volver al Inicio</Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <Navbar />
      <div className={styles.container}>
        <Link href="/" className={styles.backLink}>&larr; Volver a Auditorías</Link>
        
        <div className={styles.contentGrid}>
          {/* Columna Izquierda: Detalle principal */}
          <section className={styles.mainSection}>
            <ValidationDetailUI 
              context={validation.context}
              prompt={validation.prompt}
              response={validation.response}
            />
          </section>

          {/* Columna Derecha: Interacción */}
          <aside className={styles.sidebar}>
            <AuditActionsUI 
              likesCount={validation.likesCount}
              dislikesCount={validation.dislikesCount}
              onVote={handleVote}
              userVote={userVote}
              isVoting={isVoting}
            />
            
            <FeedbackSectionUI 
              comments={comments}
              onSubmitComment={handleAddComment}
              isSubmitting={isSubmittingComment}
            />
          </aside>
        </div>
      </div>
    </main>
  );
}
