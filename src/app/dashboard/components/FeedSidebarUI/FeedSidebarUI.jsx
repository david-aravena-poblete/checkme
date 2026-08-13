import styles from './FeedSidebarUI.module.css';

export default function FeedSidebarUI({ recommendations = [] }) {
  return (
    <aside className={styles.sidebar}>
      <h3 className={styles.title}>Recomendados para verificar</h3>
      <p className={styles.subtitle}>Respuestas de IA recientes que necesitan auditoría</p>
      
      <div className={styles.feedList}>
        {recommendations.length === 0 ? (
          <p className={styles.emptyFeed}>No hay recomendaciones por ahora.</p>
        ) : (
          recommendations.map(rec => (
            <div key={rec.id} className={styles.feedItem}>
              <span className={styles.categoryBadge}>{rec.category}</span>
              <h4 className={styles.itemTitle}>{rec.title}</h4>
              <span className={styles.status}>{rec.status}</span>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}
