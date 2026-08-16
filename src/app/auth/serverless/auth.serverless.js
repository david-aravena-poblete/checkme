import { 
  findStoredUser, 
  saveStoredUser, 
  setStoredAuthUser, 
  clearStoredAuthUser 
} from '@/lib/localStorageDb';

export const loginServerless = async (email, password) => {
  const normalizedEmail = email.trim().toLowerCase();
  const existingUser = findStoredUser(normalizedEmail);

  if (!existingUser) {
    // Si no existe, para agilizar las pruebas en modo demo, creamos el usuario automáticamente
    const newUser = saveStoredUser({
      email: normalizedEmail,
      password: password,
      displayName: normalizedEmail.split('@')[0],
    });
    setStoredAuthUser(newUser);
    return { user: newUser };
  }

  if (existingUser.password && existingUser.password !== password) {
    throw new Error('Contraseña incorrecta.');
  }

  setStoredAuthUser(existingUser);
  return { user: existingUser };
};

export const registerServerless = async (email, password) => {
  const normalizedEmail = email.trim().toLowerCase();
  const existingUser = findStoredUser(normalizedEmail);

  if (existingUser) {
    throw new Error('El correo electrónico ya está registrado.');
  }

  const newUser = saveStoredUser({
    email: normalizedEmail,
    password: password,
    displayName: normalizedEmail.split('@')[0],
  });

  setStoredAuthUser(newUser);
  return { user: newUser };
};

export const logoutServerless = async () => {
  clearStoredAuthUser();
  return true;
};

