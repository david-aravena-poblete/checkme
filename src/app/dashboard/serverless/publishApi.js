import { saveStoredPublication } from '@/lib/localStorageDb';

export async function createPublication(payload) {
  const publication = {
    authorId: payload.authorId,
    authorName: payload.authorName || 'Usuario',
    authorEmail: payload.authorEmail || '',
    context: payload.context,
    question: payload.question,
    aiResponse: payload.aiResponse,
    validationCounts: {
      correct: 0,
      partiallyCorrect: 0,
      incorrect: 0,
    },
    validationCount: 0,
    likesCount: 0,
    dislikesCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const saved = saveStoredPublication(publication);
  return saved.id;
}