import { collection, query, where, getCountFromServer, getDocs, doc, getDoc } from 'firebase/firestore';
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

    // 2. Contar "Verificaciones" (Votos emitidos por el usuario)
    const votesRef = collection(db, 'votes');
    const qVerifications = query(votesRef, where('userId', '==', userId));
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

export async function fetchUserDoubts(userId) {
  if (!userId) {
    return [];
  }

  try {
    const publicationsRef = collection(db, 'publications');
    const q = query(publicationsRef, where('authorId', '==', userId));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return [];
    }

    const doubts = snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      const createdAt = data.createdAt?.toDate
        ? data.createdAt.toDate().toISOString()
        : (data.createdAt || new Date().toISOString());

      return {
        id: docSnap.id,
        ...data,
        createdAt,
      };
    });

    // Ordenar descendentemente en memoria para evitar requerir índice compuesto en Firestore
    return doubts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } catch (error) {
    console.error('Error obteniendo dudas del usuario desde Firestore:', error);
    return [];
  }
}

export async function fetchUserVerifications(userId) {
  if (!userId) {
    return [];
  }

  try {
    const votesRef = collection(db, 'votes');
    const qVotes = query(votesRef, where('userId', '==', userId));
    const votesSnapshot = await getDocs(qVotes);

    if (votesSnapshot.empty) {
      return [];
    }

    const verificationsPromises = votesSnapshot.docs.map(async (voteDoc) => {
      const voteData = voteDoc.data();
      const validationId = voteData.validationId;
      if (!validationId) return null;

      // Consultar la publicación correspondiente
      const pubRef = doc(db, 'publications', validationId);
      const pubSnap = await getDoc(pubRef);

      if (!pubSnap.exists()) {
        // Fallback a colección validations si existiera
        const valRef = doc(db, 'validations', validationId);
        const valSnap = await getDoc(valRef);
        if (!valSnap.exists()) return null;

        const valData = valSnap.data();
        return {
          id: valSnap.id,
          ...valData,
          userVote: voteData.type,
          votedAt: voteData.updatedAt || voteData.createdAt || new Date().toISOString(),
          createdAt: valData.createdAt || new Date().toISOString(),
        };
      }

      const pubData = pubSnap.data();
      const createdAt = pubData.createdAt?.toDate
        ? pubData.createdAt.toDate().toISOString()
        : (pubData.createdAt || new Date().toISOString());

      return {
        id: pubSnap.id,
        ...pubData,
        userVote: voteData.type,
        votedAt: voteData.updatedAt || voteData.createdAt || createdAt,
        createdAt,
      };
    });

    const results = await Promise.all(verificationsPromises);
    const validVerifications = results.filter(Boolean);

    // Ordenar descendentemente por fecha de voto/creación
    return validVerifications.sort((a, b) => new Date(b.votedAt || b.createdAt) - new Date(a.votedAt || a.createdAt));
  } catch (error) {
    console.error('Error obteniendo verificaciones del usuario desde Firestore:', error);
    return [];
  }
}


