import { 
  getStoredPublicationById, 
  getStoredComments, 
  saveStoredComment, 
  getUserStoredVote, 
  saveStoredVote 
} from '@/lib/localStorageDb';

export async function fetchValidationById(id) {
  try {
    const pub = getStoredPublicationById(id);
    if (!pub) return null;

    return {
      ...pub,
      prompt: pub.question || pub.prompt || '',
      question: pub.question || pub.prompt || '',
      response: pub.aiResponse || pub.response || '',
      aiResponse: pub.aiResponse || pub.response || '',
      likesCount: pub.likesCount ?? pub.validationCounts?.correct ?? 0,
      dislikesCount: pub.dislikesCount ?? pub.validationCounts?.incorrect ?? 0,
    };
  } catch (error) {
    console.error('Error fetching validation from LocalStorage:', error);
    return null;
  }
}

export async function fetchValidationComments(validationId) {
  try {
    return getStoredComments(validationId);
  } catch (error) {
    console.error('Error fetching comments from LocalStorage:', error);
    return [];
  }
}

export async function postValidationComment(validationId, text, userId, userName = 'Usuario Anónimo') {
  try {
    const newComment = saveStoredComment({
      validationId,
      text,
      userId,
      userName,
      createdAt: new Date().toISOString()
    });
    return newComment.id;
  } catch (error) {
    console.error('Error posting comment to LocalStorage:', error);
    throw error;
  }
}

export async function getUserVote(validationId, userId) {
  if (!userId) return null;
  try {
    return getUserStoredVote(validationId, userId);
  } catch (error) {
    console.error('Error fetching user vote from LocalStorage:', error);
    return null;
  }
}

export async function submitValidationVote(validationId, userId, isLike) {
  if (!userId) {
    throw new Error('Debes contar con un identificador de usuario para votar');
  }

  try {
    return saveStoredVote(validationId, userId, isLike);
  } catch (error) {
    console.error('Error submitting vote to LocalStorage:', error);
    throw error;
  }
}

export async function updateComment(commentId, newText, userId) {
  const { editStoredComment } = await import('@/lib/localStorageDb');
  return editStoredComment(commentId, newText, userId);
}

export async function deleteComment(commentId, userId) {
  const { deleteStoredComment } = await import('@/lib/localStorageDb');
  return deleteStoredComment(commentId, userId);
}

export async function updatePublication(publicationId, data, userId) {
  const { editStoredPublication } = await import('@/lib/localStorageDb');
  return editStoredPublication(publicationId, data, userId);
}

export async function deletePublication(publicationId, userId) {
  const { deleteStoredPublication } = await import('@/lib/localStorageDb');
  return deleteStoredPublication(publicationId, userId);
}



