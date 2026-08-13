import { saveValidationRequestToDB } from '../serverless/publishApi';

/**
 * Recibe los datos crudos del formulario, añade los atributos del modelo 
 * de negocio (fechas, status, userId) y llama a la base de datos.
 * 
 * @param {Object} formData { context, prompt, response }
 */
export async function publishValidation(formData) {
  // Validación básica
  if (!formData.prompt || !formData.response) {
    throw new Error('El prompt y la respuesta son obligatorios');
  }

  // En el futuro, el userId vendrá del contexto de Auth (Firebase Auth / local storage)
  // Por ahora hardcodeamos un user ID genérico como especificamos.
  let userId = 'user-123';
  if (typeof window !== 'undefined') {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      const parsedAuth = JSON.parse(storedAuth);
      if (parsedAuth.isAuthenticated) {
        userId = 'auth-user';
      }
    }
  }

  const payload = {
    context: formData.context,
    prompt: formData.prompt,
    response: formData.response,
    status: 'PENDING',
    createdAt: new Date().toISOString(),
    userId: userId
  };

  const docId = await saveValidationRequestToDB(payload);
  return { success: true, docId };
}
