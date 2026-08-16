import { 
  fetchValidationById, 
  fetchValidationComments, 
  postValidationComment, 
  submitValidationVote, 
  getUserVote 
} from '../serverless/validationApi';

export function getEffectiveUserId(user) {
  if (user?.uid) return user.uid;
  if (typeof window === 'undefined') return 'server-user';
  let anonymousId = localStorage.getItem('checkme_anon_id');
  if (!anonymousId) {
    anonymousId = 'anon_' + Math.random().toString(36).substring(2, 11);
    localStorage.setItem('checkme_anon_id', anonymousId);
  }
  return anonymousId;
}

export function getEffectiveUserName(user) {
  if (user?.displayName) return user.displayName;
  if (user?.email) return user.email.split('@')[0];
  return 'Usuario Anónimo';
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
  if (!text || text.trim() === '') throw new Error('El comentario no puede estar vacío');
  
  const userId = getEffectiveUserId(user);
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
  const userId = getEffectiveUserId(user);
  const success = await submitValidationVote(validationId, userId, isLike);
  return success;
}

export async function checkUserVote(validationId, user = null) {
  const userId = getEffectiveUserId(user);
  const voteType = await getUserVote(validationId, userId);
  return voteType; // 'LIKE' | 'DISLIKE' | null
}
