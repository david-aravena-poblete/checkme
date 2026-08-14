import {
  addDoc,
  collection,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../../../lib/firebase';

export async function createPublication(payload) {
  const publicationsRef = collection(db, 'publications');

  const publication = {
    authorId: payload.authorId,
    context: payload.context,
    question: payload.question,
    aiResponse: payload.aiResponse,
    validationCounts: {
      correct: 0,
      partiallyCorrect: 0,
      incorrect: 0,
    },
    validationCount: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const docRef = await addDoc(publicationsRef, publication);

  return docRef.id;
}