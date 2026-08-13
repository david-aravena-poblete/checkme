import { doc, getDoc, collection, addDoc, query, where, getDocs, orderBy, updateDoc, increment, setDoc } from 'firebase/firestore';

export async function fetchValidationById(id) {
  try {
    const { db } = await import('@/lib/firebase');
    const docRef = doc(db, 'validations', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    // Si no existe en BD, podríamos buscar en los Mocks, pero como es DB real, retornamos null
    return null;
  } catch (error) {
    console.error('Error fetching validation:', error);
    return null;
  }
}

export async function fetchValidationComments(validationId) {
  try {
    const { db } = await import('@/lib/firebase');
    const commentsRef = collection(db, 'comments');
    const q = query(
      commentsRef, 
      where('validationId', '==', validationId)
    );
    const snapshot = await getDocs(q);
    
    const comments = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Ordenar en memoria para evitar el error de índice compuesto en Firestore
    return comments.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  } catch (error) {
    console.error('Error fetching comments:', error);
    // Para simplificar si faltan índices, retornamos arreglo vacío
    return [];
  }
}

export async function postValidationComment(validationId, text, userId, userName = 'Usuario Anónimo') {
  try {
    const { db } = await import('@/lib/firebase');
    const commentsRef = collection(db, 'comments');
    const docRef = await addDoc(commentsRef, {
      validationId,
      text,
      userId,
      userName,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error posting comment:', error);
    throw error;
  }
}

export async function getUserVote(validationId, userId) {
  try {
    const { db } = await import('@/lib/firebase');
    const voteRef = doc(db, 'votes', `${validationId}_${userId}`);
    const snap = await getDoc(voteRef);
    if (snap.exists()) {
      return snap.data().type; // 'LIKE' o 'DISLIKE'
    }
    return null;
  } catch (error) {
    console.error('Error fetching user vote:', error);
    return null;
  }
}

export async function submitValidationVote(validationId, userId, isLike) {
  try {
    const { db } = await import('@/lib/firebase');
    const newVoteType = isLike ? 'LIKE' : 'DISLIKE';
    
    // Obtener voto anterior
    const voteRef = doc(db, 'votes', `${validationId}_${userId}`);
    const oldVoteSnap = await getDoc(voteRef);
    const oldVoteType = oldVoteSnap.exists() ? oldVoteSnap.data().type : null;

    if (oldVoteType === newVoteType) {
      // Ya votó lo mismo, no hacemos nada
      return false;
    }

    // Calcular los incrementos
    let likesDelta = 0;
    let dislikesDelta = 0;

    if (newVoteType === 'LIKE') {
      likesDelta = 1;
      if (oldVoteType === 'DISLIKE') dislikesDelta = -1;
    } else {
      dislikesDelta = 1;
      if (oldVoteType === 'LIKE') likesDelta = -1;
    }

    // Actualizar contadores
    const valRef = doc(db, 'validations', validationId);
    await updateDoc(valRef, {
      likesCount: increment(likesDelta),
      dislikesCount: increment(dislikesDelta)
    });

    // Guardar nuevo voto
    await setDoc(voteRef, {
      validationId,
      userId,
      type: newVoteType,
      updatedAt: new Date().toISOString()
    });
    
    return true;
  } catch (error) {
    console.error('Error submitting vote:', error);
    throw error;
  }
}
