import { createPublication } from '../serverless/publishApi';

export async function publishValidation(formData, user) {
  const payload = {
    authorId: user.uid,
    authorName: user.displayName || (user.email ? user.email.split('@')[0] : 'Usuario'),
    authorEmail: user.email || '',
    context: formData.context.trim(),
    question: formData.question.trim(),
    aiResponse: formData.aiResponse.trim(),
  };

  const publicationId = await createPublication(payload);

  return {
    success: true,
    publicationId,
  };
}