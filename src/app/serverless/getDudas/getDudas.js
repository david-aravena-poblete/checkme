import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function getDoubtsList() {
  try {
    const validationsRef = collection(db, 'publications');
    const q = query(validationsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return [];
    }

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      // Ensure we convert Firestore Timestamps to ISO strings or something serializable if needed,
      // but usually the util layer handles formatting. The current util formatDate handles date strings or timestamps.
      createdAt: doc.data().createdAt?.toDate ? doc.data().createdAt.toDate().toISOString() : doc.data().createdAt,
    }));
  } catch (error) {
    console.error('Error fetching validations from Firestore:', error);
    throw new Error('No se pudieron cargar las validaciones.');
  }
}
