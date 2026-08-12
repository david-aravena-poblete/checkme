import styles from './CategoryColumnUI.module.css';
import SearchInputUI from '../SearchInput/SearchInputUI';
import DoubtCardUI from '../DoubtCard/DoubtCardUI';

export default function CategoryColumnUI({ categoryName, doubts, count, searchValue, onSearchChange }) {
  return (
    <section className={styles.column}>
      <div className={styles.header}>
        <h2 className={styles.categoryName}>{categoryName}</h2>
        <span className={styles.count}>{count}</span>
      </div>
      <SearchInputUI
        value={searchValue}
        onChange={onSearchChange}
        placeholder={`Buscar en ${categoryName}...`}
      />
      <div className={styles.list}>
        {doubts && doubts.length > 0 ? (
          doubts.map((doubt) => (
            <DoubtCardUI
              key={doubt.id}
              title={doubt.title}
              content={doubt.content}
              authorName={doubt.authorName}
              date={doubt.date}
              responsesCount={doubt.responsesCount}
            />
          ))
        ) : (
          <p className={styles.emptyState}>No se encontraron dudas</p>
        )}
      </div>
    </section>
  );
}
