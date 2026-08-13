import { 
  fetchValidationById, 
  fetchValidationComments, 
  postValidationComment,
  submitValidationVote,
  getUserVote
} from '../serverless/validationApi';

export function getLocalUserId() {
  if (typeof window === 'undefined') return 'server-user';
  let userId = localStorage.getItem('checkme_user_id');
  if (!userId) {
    userId = 'anon_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('checkme_user_id', userId);
  }
  return userId;
}

export async function getValidationDetails(id) {
  const data = await fetchValidationById(id);
  if (!data) return null;
  
  // Format dates if needed, or set default values
  return {
    ...data,
    likesCount: data.likesCount || 0,
    dislikesCount: data.dislikesCount || 0
  };
}

export async function getComments(validationId) {
  return await fetchValidationComments(validationId);
}

export async function addComment(validationId, text) {
  if (!text || text.trim() === '') throw new Error('El comentario no puede estar vacío');
  
  // Obtener usuario
  let userId = getLocalUserId();
  let userName = 'Usuario Anónimo';
  
  if (typeof window !== 'undefined') {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      const parsedAuth = JSON.parse(storedAuth);
      if (parsedAuth.isAuthenticated) {
        userId = parsedAuth.user?.email || 'auth-user';
        userName = 'Miembro Verificado';
      }
    }
  }

  const commentId = await postValidationComment(validationId, text, userId, userName);
  return {
    id: commentId,
    validationId,
    text,
    userId,
    userName,
    createdAt: new Date().toISOString()
  };
}

export async function castVote(validationId, isLike) {
  const userId = getLocalUserId();
  const success = await submitValidationVote(validationId, userId, isLike);
  return success;
}

export async function checkUserVote(validationId) {
  const userId = getLocalUserId();
  const voteType = await getUserVote(validationId, userId);
  return voteType; // 'LIKE' | 'DISLIKE' | null
}
