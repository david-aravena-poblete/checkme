import styles from './TabsUI.module.css';

export default function TabsUI({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'DUDAS', label: 'Mis Dudas' },
    { id: 'APORTES', label: 'Mis Aportes' },
    { id: 'GUARDADOS', label: 'Guardados' }
  ];

  return (
    <div className={styles.tabsContainer}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
