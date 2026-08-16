import { loginServerless, registerServerless, logoutServerless } from '../serverless/auth.serverless';

export const loginUser = async (email, password) => {
  try {
    const result = await loginServerless(email, password);
    return { success: true, user: result.user };
  } catch (error) {
    console.error('Error in loginUser:', error);
    return { success: false, error: error.message || 'Error al iniciar sesión.' };
  }
};

export const registerUser = async (email, password) => {
  try {
    const result = await registerServerless(email, password);
    return { success: true, user: result.user };
  } catch (error) {
    console.error('Error in registerUser:', error);
    return { success: false, error: error.message || 'Error al registrarse.' };
  }
};

export const logoutUser = async () => {
  try {
    await logoutServerless();
    return { success: true };
  } catch (error) {
    console.error('Error in logoutUser:', error);
    return { success: false, error: error.message || 'Error al cerrar sesión.' };
  }
};

