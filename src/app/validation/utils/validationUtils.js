import { 
  fetchValidationById, 
  fetchValidationComments, 
  postValidationComment, 
  submitValidationVote, 
  getUserVote 
} from '../serverless/validationApi';

export function getEffectiveUserId(user) {
  if (user?.uid) return user.uid;
  return null;
}

export function getEffectiveUserName(user) {
  if (user?.displayName) return user.displayName;
  if (user?.email) return user.email.split('@')[0];
  return 'Usuario';
}

export async function getValidationDetails(id) {
  const data = await fetchValidationById(id);
  if (!data) return null;
  
  return {
    ...data,
    likesCount: Number(data.likesCount || 0),
    dislikesCount: Number(data.dislikesCount || 0)
  };
}

export async function getComments(validationId) {
  return await fetchValidationComments(validationId);
}

export async function addComment(validationId, text, user = null) {
  if (!user || !user.uid) {
    throw new Error('Debes iniciar sesión para dejar un comentario');
  }
  if (!text || text.trim() === '') {
    throw new Error('El comentario no puede estar vacío');
  }
  
  const userId = user.uid;
  const userName = getEffectiveUserName(user);

  const commentId = await postValidationComment(validationId, text.trim(), userId, userName);
  return {
    id: commentId,
    validationId,
    text: text.trim(),
    userId,
    userName,
    createdAt: new Date().toISOString()
  };
}

export async function castVote(validationId, isLike, user = null) {
  if (!user || !user.uid) {
    throw new Error('Debes iniciar sesión para auditar esta respuesta');
  }
  const success = await submitValidationVote(validationId, user.uid, isLike);
  return success;
}

export async function checkUserVote(validationId, user = null) {
  if (!user || !user.uid) return null;
  const voteType = await getUserVote(validationId, user.uid);
  return voteType; // 'LIKE' | 'DISLIKE' | null
}

export async function editComment(commentId, text, user = null) {
  if (!user || !user.uid) {
    throw new Error('Debes iniciar sesión para editar un comentario.');
  }
  if (!text || text.trim() === '') {
    throw new Error('El comentario no puede estar vacío.');
  }
  const { updateComment } = await import('../serverless/validationApi');
  return await updateComment(commentId, text.trim(), user.uid);
}

export async function removeComment(commentId, user = null) {
  if (!user || !user.uid) {
    throw new Error('Debes iniciar sesión para eliminar un comentario.');
  }
  const { deleteComment } = await import('../serverless/validationApi');
  return await deleteComment(commentId, user.uid);
}

export async function editValidation(validationId, data, user = null) {
  if (!user || !user.uid) {
    throw new Error('Debes iniciar sesión para editar una duda.');
  }
  const { updatePublication } = await import('../serverless/validationApi');
  return await updatePublication(validationId, data, user.uid);
}

export async function removeValidation(validationId, user = null) {
  if (!user || !user.uid) {
    throw new Error('Debes iniciar sesión para eliminar una duda.');
  }
  const { deletePublication } = await import('../serverless/validationApi');
  return await deletePublication(validationId, user.uid);
}


