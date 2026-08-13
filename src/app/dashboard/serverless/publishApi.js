import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

/**
 * Guarda una nueva solicitud de validación de IA en Firestore
 * @param {Object} payload Objeto con los datos a guardar
 * @returns {Promise<string>} El ID del documento creado
 */
export async function saveValidationRequestToDB(payload) {
  try {
    const validationsRef = collection(db, 'validations');
    const docRef = await addDoc(validationsRef, payload);
    return docRef.id;
  } catch (error) {
    console.error('Error saving validation request to DB:', error);
    throw error;
  }
}
