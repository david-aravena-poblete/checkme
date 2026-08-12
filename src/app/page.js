'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import NavbarUI from './components/Navbar/NavbarUI';
import CategoryColumnUI from './components/CategoryColumn/CategoryColumnUI';
import { getDudasByCategory } from './utils/getDudas/getDudas';

export default function Home() {
  const [dudasByCategory, setDudasByCategory] = useState({});
  const [searchTerms, setSearchTerms] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDudas() {
      try {
        const data = await getDudasByCategory();
        setDudasByCategory(data);
      } catch (error) {
        console.error('Error al cargar dudas:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchDudas();
  }, []);

  function handleSearchChange(category, value) {
    setSearchTerms((prev) => ({
      ...prev,
      [category]: value,
    }));
  }

  function getFilteredDoubts(category, doubts) {
    const term = searchTerms[category]?.toLowerCase() || '';
    if (!term) return doubts;
    return doubts.filter((doubt) =>
      doubt.title.toLowerCase().includes(term)
    );
  }

  return (
    <main className={styles.landing}>
      <NavbarUI />
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Explora las dudas de la comunidad</h1>
        <p className={styles.heroSubtitle}>
          Verifica la veracidad de la información. Navega por categorías y
          descubre lo que otros están cuestionando.
        </p>
      </section>

      {isLoading ? (
        <div className={styles.loadingContainer}>
          <p className={styles.loadingText}>
            Cargando dudas
            <span className={styles.loadingDots}>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
            </span>
          </p>
        </div>
      ) : (
        <div className={styles.categoriesContainer}>
          {Object.entries(dudasByCategory).map(([category, doubts]) => (
            <CategoryColumnUI
              key={category}
              categoryName={category}
              doubts={getFilteredDoubts(category, doubts)}
              count={doubts.length}
              searchValue={searchTerms[category] || ''}
              onSearchChange={(e) => handleSearchChange(category, e.target.value)}
            />
          ))}
        </div>
      )}
    </main>
  );
}
