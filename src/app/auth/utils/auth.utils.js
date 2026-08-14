import { loginServerless, registerServerless, logoutServerless } from '../serverless/auth.serverless';

/**
 * Handles Firebase Auth error codes and returns a user-friendly message.
 */
const getAuthErrorMessage = (error) => {
  switch (error.code) {
    case 'auth/invalid-email':
      return 'El correo electrónico no es válido.';
    case 'auth/user-disabled':
      return 'El usuario ha sido deshabilitado.';
    case 'auth/user-not-found':
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
      return 'Correo o contraseña incorrectos.';
    case 'auth/email-already-in-use':
      return 'El correo electrónico ya está registrado.';
    case 'auth/weak-password':
      return 'La contraseña es demasiado débil (mínimo 6 caracteres).';
    default:
      return error.message || 'Ocurrió un error inesperado. Intenta de nuevo.';
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await loginServerless(email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('Error in loginUser:', error);
    return { success: false, error: getAuthErrorMessage(error) };
  }
};

export const registerUser = async (email, password) => {
  try {
    const userCredential = await registerServerless(email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('Error in registerUser:', error);
    return { success: false, error: getAuthErrorMessage(error) };
  }
};

export const logoutUser = async () => {
  try {
    await logoutServerless();
    return { success: true };
  } catch (error) {
    console.error('Error in logoutUser:', error);
    return { success: false, error: getAuthErrorMessage(error) };
  }
};
