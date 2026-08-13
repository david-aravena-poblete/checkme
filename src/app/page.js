'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import Navbar from './components/Navbar/Navbar';
import DoubtCardUI from './components/DoubtCard/DoubtCardUI';
import { getValidationsList } from './utils/getDudas/getDudas';

export default function Home() {
  const [validations, setValidations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchValidations() {
      try {
        const data = await getValidationsList();
        setValidations(data);
      } catch (error) {
        console.error('Error al cargar validaciones:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchValidations();
  }, []);

  return (
    <main className={styles.landing}>
      <Navbar />
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Auditoría colectiva de IA</h1>
        <p className={styles.heroSubtitle}>
          Verifica la veracidad de las respuestas generadas por Inteligencia Artificial.
          Sube los prompts y valida los resultados con la comunidad.
        </p>
      </section>

      {isLoading ? (
        <div className={styles.loadingContainer}>
          <p className={styles.loadingText}>
            Cargando auditorías
            <span className={styles.loadingDots}>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
            </span>
          </p>
        </div>
      ) : (
        <section className={styles.validationsSection}>
          <h2 className={styles.sectionTitle}>Últimas Auditorías</h2>
          <div className={styles.gridContainer}>
            {validations.length > 0 ? (
              validations.map((val) => (
                <DoubtCardUI
                  key={val.id}
                  id={val.id}
                  context={val.context}
                  prompt={val.prompt}
                  response={val.response}
                  date={val.date}
                  status={val.status}
                />
              ))
            ) : (
              <p className={styles.emptyState}>No se encontraron validaciones recientes.</p>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
