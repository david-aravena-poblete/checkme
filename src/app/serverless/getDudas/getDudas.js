import { getStoredPublications } from '@/lib/localStorageDb';

export async function getDoubtsList() {
  try {
    const publications = getStoredPublications();
    // Ordenar descendentemente por fecha de creación
    return publications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } catch (error) {
    console.error('Error fetching validations from LocalStorage:', error);
    return [];
  }
}

