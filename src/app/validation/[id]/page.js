'use client';

import { useState, useEffect, use } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import ValidationDetailUI from '../components/ValidationDetailUI/ValidationDetailUI';
import AuditActionsUI from '../components/AuditActionsUI/AuditActionsUI';
import FeedbackSectionUI from '../components/FeedbackSectionUI/FeedbackSectionUI';
import { getValidationDetails, getComments, addComment, castVote, checkUserVote } from '../utils/validationUtils';
import { useAuth } from '@/app/context/AuthContext';
import styles from './page.module.css';
import Link from 'next/link';

export default function ValidationPage({ params }) {
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;
  const { user, loading: authLoading } = useAuth();
  
  const [validation, setValidation] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [userVote, setUserVote] = useState(null); // 'LIKE' | 'DISLIKE' | null
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
            checkUserVote(id, user)
          ]);
          setComments(commData);
          setUserVote(voteData);
        }
      } catch (err) {
        console.error('Error al cargar la validación:', err);
        setError('Error al cargar la validación');
      } finally {
        setIsLoading(false);
      }
    }

    if (!authLoading) {
      fetchData();
    }
  }, [id, user, authLoading]);

  const handleVote = async (isLike) => {
    const newVoteType = isLike ? 'LIKE' : 'DISLIKE';
    if (userVote === newVoteType || isVoting) return; // Evitar doble submit o votar lo mismo
    
    setIsVoting(true);
    const previousVote = userVote;
    
    // Optimistic update
    setUserVote(newVoteType);
    setValidation(prev => {
      if (!prev) return prev;
      let lCount = Number(prev.likesCount || 0);
      let dCount = Number(prev.dislikesCount || 0);
      
      if (newVoteType === 'LIKE') {
        lCount++;
        if (previousVote === 'DISLIKE') dCount--;
      } else {
        dCount++;
        if (previousVote === 'LIKE') lCount--;
      }
      return { ...prev, likesCount: Math.max(0, lCount), dislikesCount: Math.max(0, dCount) };
    });

    try {
      const success = await castVote(id, isLike, user);
      if (!success) {
        // Rollback si por alguna razón falló
        setUserVote(previousVote);
      }
    } catch (err) {
      console.error('Error al emitir voto:', err);
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
      const newComment = await addComment(id, text, user);
      setComments(prev => [...prev, newComment]);
    } catch (err) {
      alert('Error al añadir el comentario');
      console.error(err);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  if (isLoading || authLoading) {
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
          <h2>{error || 'Validación no encontrada'}</h2>
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
              question={validation.question}
              prompt={validation.prompt}
              aiResponse={validation.aiResponse}
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

