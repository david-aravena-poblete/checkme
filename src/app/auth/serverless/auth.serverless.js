import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { app } from '@/lib/firebase';

const auth = getAuth(app);

export const loginServerless = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const registerServerless = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const logoutServerless = async () => {
  return await signOut(auth);
};
