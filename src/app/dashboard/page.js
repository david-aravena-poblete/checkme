'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import StatCardUI from './components/StatCardUI/StatCardUI';
import ActionPanelUI from './components/ActionPanelUI/ActionPanelUI';
import TabsUI from './components/TabsUI/TabsUI';
import EmptyStateUI from './components/EmptyStateUI/EmptyStateUI';
import FeedSidebarUI from './components/FeedSidebarUI/FeedSidebarUI';
import PublishModalUI from './components/PublishModalUI/PublishModalUI';
import { getDashboardData } from './utils/getDashboardData';
import { publishValidation } from './utils/publishValidation';
import styles from './page.module.css';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('DUDAS');
  const [stats, setStats] = useState({ reputation: 0, doubts: 0, verifications: 0 });
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  useEffect(() => {
    async function loadData() {
      const data = await getDashboardData();
      setStats(data.stats);
      setRecommendations(data.recommendations);
      setIsLoading(false);
    }
    loadData();
  }, []);

  const getEmptyStateMessage = () => {
    switch (activeTab) {
      case 'DUDAS':
        return {
          title: 'Aún no hay validaciones',
          message: 'Parece que no has publicado ninguna respuesta de IA para validar. ¡Anímate y súbela!',
          cta: 'Plantear nueva duda'
        };
      case 'APORTES':
        return {
          title: 'Sin aportes por ahora',
          message: 'No has contribuido a verificar respuestas generadas por IA. Revisa las recomendaciones.',
          cta: 'Ver recomendaciones'
        };
      case 'GUARDADOS':
        return {
          title: 'No hay elementos guardados',
          message: 'Cuando veas una respuesta de IA interesante, guárdala para auditarla más tarde.',
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

    const user = auth.currentUser;

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
    }
  } catch (error) {
    alert(error.message || 'Hubo un error al crear la publicación.');
  } finally {
    setIsPublishing(false);
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
              {isLoading ? (
                <div className={styles.loading}>Cargando panel...</div>
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
              )}
            </div>
          </section>

          {/* Sidebar Area */}
          <aside className={styles.sidebar}>
            {isLoading ? (
              <div className={styles.loading}>Cargando recomendaciones...</div>
            ) : (
              <FeedSidebarUI recommendations={recommendations} />
            )}
          </aside>
        </div>
      </div>

      <PublishModalUI 
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        onSubmit={handlePublishSubmit}
        isPublishing={isPublishing}
      />
    </main>
  );
}
