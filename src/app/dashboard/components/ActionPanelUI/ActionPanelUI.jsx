import styles from './ActionPanelUI.module.css';

export default function ActionPanelUI({ onOpenPublish }) {
  return (
    <div className={styles.panel}>
      <div className={styles.content}>
        <h3 className={styles.title}>¿Dudas de la respuesta de una IA?</h3>
        <p className={styles.subtitle}>
          Pega el prompt y la respuesta para que la comunidad audite su veracidad.
        </p>
      </div>
      <button className={styles.ctaButton} onClick={onOpenPublish}>
        Plantear nueva duda
      </button>
    </div>
  );
}
