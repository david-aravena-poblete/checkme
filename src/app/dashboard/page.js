'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import StatCardUI from './components/StatCardUI/StatCardUI';
import ActionPanelUI from './components/ActionPanelUI/ActionPanelUI';
import TabsUI from './components/TabsUI/TabsUI';
import EmptyStateUI from './components/EmptyStateUI/EmptyStateUI';
import PublishModalUI from './components/PublishModalUI/PublishModalUI';
import EditDoubtModalUI from '@/app/components/EditDoubtModalUI/EditDoubtModalUI';
import DoubtCardUI from '@/app/components/DoubtCard/DoubtCardUI';
import { getDashboardData } from './utils/getDashboardData';
import { publishValidation } from './utils/publishValidation';
import { updateUserDoubt, deleteUserDoubt } from './serverless/dashboardApi';
import { useAuth } from '@/app/context/AuthContext';
import styles from './page.module.css';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  
  const [activeTab, setActiveTab] = useState('DUDAS');
  const [stats, setStats] = useState({ reputation: 0, doubts: 0, verifications: 0 });
  const [myDoubts, setMyDoubts] = useState([]);
  const [myVerifications, setMyVerifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  // Estados para edición de dudas
  const [editingDoubt, setEditingDoubt] = useState(null);
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  const refreshData = async (userId) => {
    if (!userId) return;
    const data = await getDashboardData(userId);
    setStats(data.stats);
    setMyDoubts(data.myDoubts || []);
    setMyVerifications(data.myVerifications || []);
  };

  useEffect(() => {
    async function loadData() {
      if (!user) return;
      setIsLoading(true);
      await refreshData(user.uid);
      setIsLoading(false);
    }
    
    if (!loading) {
      loadData();
    }
  }, [user, loading]);

  const getEmptyStateMessage = () => {
    switch (activeTab) {
      case 'DUDAS':
        return {
          title: 'Aún no hay validaciones',
          message: 'Parece que no has publicado ninguna respuesta de IA para validar. ¡Anímate y súbela!',
          cta: 'Plantear nueva duda'
        };
      case 'VERIFICACIONES':
        return {
          title: 'Sin verificaciones por ahora',
          message: 'No has auditado ninguna respuesta de IA. ¡Explora las publicaciones de la comunidad y aporta tu veredicto!',
          cta: null
        };
      default:
        return { title: 'Vacío', message: '', cta: null };
    }
  };

  const emptyState = getEmptyStateMessage();

  const handlePublishSubmit = async (data) => {
    try {
      setIsPublishing(true);

      if (!user) {
        throw new Error('Debes iniciar sesión para publicar.');
      }

      if (!data.context?.trim()) {
        throw new Error('Debes ingresar el contexto.');
      }

      if (!data.question?.trim()) {
        throw new Error('Debes ingresar la pregunta realizada a la IA.');
      }

      if (!data.aiResponse?.trim()) {
        throw new Error('Debes ingresar la respuesta de la IA.');
      }

      const result = await publishValidation(data, user);

      if (result.success) {
        setIsPublishModalOpen(false);
        alert('¡Publicación creada con éxito!');
        await refreshData(user.uid);
      }
    } catch (error) {
      alert(error.message || 'Hubo un error al crear la publicación.');
    } finally {
      setIsPublishing(false);
    }
  };

  const handleOpenEditDoubt = (doubt) => {
    setEditingDoubt(doubt);
  };

  const handleSaveEditedDoubt = async (formData) => {
    try {
      setIsSavingEdit(true);
      if (!user) throw new Error('Debes estar autenticado.');
      if (!formData.context?.trim() || !formData.question?.trim() || !formData.aiResponse?.trim()) {
        throw new Error('Todos los campos son obligatorios.');
      }

      await updateUserDoubt(formData.id, formData, user.uid);
      setEditingDoubt(null);
      alert('¡Duda actualizada con éxito!');
      await refreshData(user.uid);
    } catch (error) {
      alert(error.message || 'Error al actualizar la duda.');
    } finally {
      setIsSavingEdit(false);
    }
  };

  const handleDeleteDoubt = async (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta duda? Esta acción no se puede deshacer.');
    if (!confirmDelete) return;

    try {
      if (!user) throw new Error('Debes estar autenticado.');
      await deleteUserDoubt(id, user.uid);
      alert('Duda eliminada correctamente.');
      await refreshData(user.uid);
    } catch (error) {
      alert(error.message || 'Error al eliminar la duda.');
    }
  };

  return (
    <main className={styles.main}>
      <Navbar />
      
      <div className={styles.container}>
        <div className={styles.layoutGrid}>
          {/* Main Content Area */}
          <section className={styles.mainContent}>
            <ActionPanelUI onOpenPublish={() => setIsPublishModalOpen(true)} />
            
            <div className={styles.statsGrid}>
              <StatCardUI title="Reputación" value={stats.reputation} icon="⭐" />
              <StatCardUI title="Mis Dudas" value={stats.doubts} icon="❓" />
              <StatCardUI title="Verificaciones" value={stats.verifications} icon="✅" />
            </div>

            <TabsUI activeTab={activeTab} onTabChange={setActiveTab} />

            <div className={styles.tabContent}>
              {isLoading || loading ? (
                <div className={styles.loading}>Cargando panel...</div>
              ) : activeTab === 'DUDAS' ? (
                myDoubts.length > 0 ? (
                  <div className={styles.doubtsGrid}>
                    {myDoubts.map((doubt) => (
                      <DoubtCardUI
                        key={doubt.id}
                        id={doubt.id}
                        context={doubt.context}
                        question={doubt.question}
                        aiResponse={doubt.aiResponse}
                        date={doubt.date}
                        status={doubt.status}
                        validationCounts={doubt.validationCounts}
                        onEdit={() => handleOpenEditDoubt(doubt)}
                        onDelete={() => handleDeleteDoubt(doubt.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyStateUI 
                    title={emptyState.title} 
                    message={emptyState.message} 
                    ctaText={emptyState.cta} 
                    onCtaClick={
                      emptyState.cta === 'Plantear nueva duda' 
                        ? () => setIsPublishModalOpen(true) 
                        : undefined
                    }
                  />
                )
              ) : activeTab === 'VERIFICACIONES' ? (
                myVerifications.length > 0 ? (
                  <div className={styles.doubtsGrid}>
                    {myVerifications.map((item) => (
                      <DoubtCardUI
                        key={item.id}
                        id={item.id}
                        context={item.context}
                        question={item.question}
                        aiResponse={item.aiResponse}
                        date={item.date}
                        status={item.status}
                        validationCounts={item.validationCounts}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyStateUI 
                    title={emptyState.title} 
                    message={emptyState.message} 
                    ctaText={emptyState.cta} 
                  />
                )
              ) : null}
            </div>
          </section>
        </div>
      </div>

      <PublishModalUI 
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        onSubmit={handlePublishSubmit}
        isPublishing={isPublishing}
      />

      <EditDoubtModalUI
        isOpen={Boolean(editingDoubt)}
        initialData={editingDoubt}
        onClose={() => setEditingDoubt(null)}
        onSave={handleSaveEditedDoubt}
        isSaving={isSavingEdit}
      />
    </main>
  );
}



