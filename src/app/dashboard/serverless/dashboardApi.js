import { collection, query, where, getCountFromServer } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function fetchUserStats(userId) {
  if (!userId) {
    return { reputation: 0, doubts: 0, verifications: 0 };
  }

  try {
    // 1. Contar "Mis Dudas" (Publicaciones hechas por el usuario)
    const publicationsRef = collection(db, 'publications');
    const qDoubts = query(publicationsRef, where('authorId', '==', userId));
    const snapshotDoubts = await getCountFromServer(qDoubts);
    const doubtsCount = snapshotDoubts.data().count;

    // 2. Contar "Verificaciones" (Aportes/votos hechos por el usuario)
    // Aunque la colección 'validations' no exista aún, Firestore no fallará y retornará 0
    const validationsRef = collection(db, 'validations');
    const qVerifications = query(validationsRef, where('userId', '==', userId));
    const snapshotVerifications = await getCountFromServer(qVerifications);
    const verificationsCount = snapshotVerifications.data().count;

    return {
      reputation: 0, // Placeholder hasta definir la lógica de reputación
      doubts: doubtsCount,
      verifications: verificationsCount
    };
  } catch (error) {
    console.error('Error obteniendo estadísticas reales de Firestore:', error);
    return { reputation: 0, doubts: 0, verifications: 0 };
  }
}
