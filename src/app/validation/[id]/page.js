'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar/Navbar';
import ValidationDetailUI from '../components/ValidationDetailUI/ValidationDetailUI';
import AuditActionsUI from '../components/AuditActionsUI/AuditActionsUI';
import FeedbackSectionUI from '../components/FeedbackSectionUI/FeedbackSectionUI';
import EditDoubtModalUI from '@/app/components/EditDoubtModalUI/EditDoubtModalUI';
import { 
  getValidationDetails, 
  getComments, 
  addComment, 
  editComment, 
  removeComment, 
  editValidation, 
  removeValidation, 
  castVote, 
  checkUserVote 
} from '../utils/validationUtils';
import { useAuth } from '@/app/context/AuthContext';
import styles from './page.module.css';
import Link from 'next/link';

export default function ValidationPage({ params }) {
  const router = useRouter();
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

  // Estados para modal de edición de duda
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSavingDoubt, setIsSavingDoubt] = useState(false);

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
    if (!user) {
      alert('Debes iniciar sesión para auditar esta respuesta.');
      return;
    }

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
    if (!user) {
      alert('Debes iniciar sesión para dejar feedback.');
      return;
    }

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

  const handleEditComment = async (commentId, newText) => {
    if (!user) return;
    try {
      await editComment(commentId, newText, user);
      setComments(prev => 
        prev.map(c => c.id === commentId ? { ...c, text: newText, updatedAt: new Date().toISOString() } : c)
      );
    } catch (err) {
      alert(err.message || 'Error al editar comentario.');
      throw err;
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!user) return;
    try {
      await removeComment(commentId, user);
      setComments(prev => prev.filter(c => c.id !== commentId));
    } catch (err) {
      alert(err.message || 'Error al eliminar comentario.');
    }
  };

  const handleSaveEditedValidation = async (formData) => {
    try {
      setIsSavingDoubt(true);
      if (!user) throw new Error('Debes estar autenticado.');
      if (!formData.context?.trim() || !formData.question?.trim() || !formData.aiResponse?.trim()) {
        throw new Error('Todos los campos son obligatorios.');
      }

      await editValidation(id, formData, user);
      setValidation(prev => ({
        ...prev,
        context: formData.context.trim(),
        question: formData.question.trim(),
        prompt: formData.question.trim(),
        aiResponse: formData.aiResponse.trim(),
        response: formData.aiResponse.trim(),
      }));
      setIsEditModalOpen(false);
      alert('¡Duda actualizada con éxito!');
    } catch (err) {
      alert(err.message || 'Error al actualizar la duda.');
    } finally {
      setIsSavingDoubt(false);
    }
  };

  const handleDeleteValidation = async () => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta duda? Serás redirigido al dashboard.');
    if (!confirmDelete) return;

    try {
      if (!user) throw new Error('Debes estar autenticado.');
      await removeValidation(id, user);
      alert('Duda eliminada correctamente.');
      router.push('/dashboard');
    } catch (err) {
      alert(err.message || 'Error al eliminar la duda.');
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

  const isAuthor = Boolean(user && user.uid === validation.authorId);

  return (
    <main className={styles.main}>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.navBarRow}>
          <Link href="/dashboard" className={styles.dashboardButton}>
            &larr; Volver al Dashboard
          </Link>
          <Link href="/" className={styles.backLink}>
            Ver todas las auditorías
          </Link>
        </div>
        
        <div className={styles.contentGrid}>
          {/* Columna Izquierda: Detalle principal */}
          <section className={styles.mainSection}>
            <ValidationDetailUI 
              context={validation.context}
              question={validation.question}
              prompt={validation.prompt}
              aiResponse={validation.aiResponse}
              response={validation.response}
              isAuthor={isAuthor}
              onEdit={() => setIsEditModalOpen(true)}
              onDelete={handleDeleteValidation}
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
              isAuthenticated={!!user}
            />
            
            <FeedbackSectionUI 
              comments={comments}
              onSubmitComment={handleAddComment}
              onEditComment={handleEditComment}
              onDeleteComment={handleDeleteComment}
              isSubmitting={isSubmittingComment}
              isAuthenticated={!!user}
              currentUserId={user?.uid}
            />
          </aside>
        </div>
      </div>

      <EditDoubtModalUI
        isOpen={isEditModalOpen}
        initialData={validation}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEditedValidation}
        isSaving={isSavingDoubt}
      />
    </main>
  );
}



