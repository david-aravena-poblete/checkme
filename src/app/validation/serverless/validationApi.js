import { doc, getDoc, collection, addDoc, query, where, getDocs, updateDoc, increment, setDoc } from 'firebase/firestore';

export async function fetchValidationById(id) {
  try {
    const { db } = await import('@/lib/firebase');
    
    // 1. Intentar consultar en la colección principal 'publications'
    const pubRef = doc(db, 'publications', id);
    const pubSnap = await getDoc(pubRef);
    if (pubSnap.exists()) {
      const data = pubSnap.data();
      const createdAt = data.createdAt?.toDate 
        ? data.createdAt.toDate().toISOString() 
        : (data.createdAt || new Date().toISOString());

      return {
        id: pubSnap.id,
        ...data,
        createdAt,
        // Sincronizar nombres alternativos de campos para compatibilidad
        prompt: data.question || data.prompt || '',
        question: data.question || data.prompt || '',
        response: data.aiResponse || data.response || '',
        aiResponse: data.aiResponse || data.response || '',
        likesCount: data.likesCount ?? data.validationCounts?.correct ?? 0,
        dislikesCount: data.dislikesCount ?? data.validationCounts?.incorrect ?? 0,
      };
    }

    // 2. Fallback a la colección 'validations' si existe
    const valRef = doc(db, 'validations', id);
    const valSnap = await getDoc(valRef);
    if (valSnap.exists()) {
      const data = valSnap.data();
      return {
        id: valSnap.id,
        ...data,
        prompt: data.question || data.prompt || '',
        question: data.question || data.prompt || '',
        response: data.aiResponse || data.response || '',
        aiResponse: data.aiResponse || data.response || '',
        likesCount: data.likesCount || 0,
        dislikesCount: data.dislikesCount || 0,
      };
    }

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
  if (!userId) return null;
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
  if (!userId) {
    throw new Error('Debes contar con un identificador de usuario para votar');
  }

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

    // Actualizar contadores en la publicación
    const pubRef = doc(db, 'publications', validationId);
    const pubSnap = await getDoc(pubRef);
    
    if (pubSnap.exists()) {
      const updatePayload = {
        likesCount: increment(likesDelta),
        dislikesCount: increment(dislikesDelta),
      };

      // Si existe validationCounts, sincronizar también
      if (likesDelta !== 0) {
        updatePayload['validationCounts.correct'] = increment(likesDelta);
      }
      if (dislikesDelta !== 0) {
        updatePayload['validationCounts.incorrect'] = increment(dislikesDelta);
      }

      await updateDoc(pubRef, updatePayload);
    } else {
      const valRef = doc(db, 'validations', validationId);
      const valSnap = await getDoc(valRef);
      if (valSnap.exists()) {
        await updateDoc(valRef, {
          likesCount: increment(likesDelta),
          dislikesCount: increment(dislikesDelta)
        });
      }
    }

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

