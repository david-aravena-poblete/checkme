import { collection, getDocs, query, orderBy } from 'firebase/firestore';

const MOCK_VALIDATIONS = [
  {
    id: '1',
    context: 'Le pregunté a ChatGPT sobre dietas para bajar de peso rápidamente y me recomendó esto. No estoy seguro si es saludable.',
    prompt: '¿Es cierto que tomar 8 vasos de agua al día y hacer ayuno intermitente es obligatorio para bajar de peso rápido?',
    response: 'Sí, el ayuno intermitente y tomar 8 vasos de agua son prácticas fundamentales que aceleran el metabolismo en un 30% y garantizan la pérdida de peso en pocas semanas, sin importar la dieta que sigas...',
    status: 'PENDING',
    userId: 'user1',
    createdAt: '2026-08-10T12:00:00.000Z',
    responsesCount: 5
  },
  {
    id: '2',
    context: 'Un amigo usó Gemini para un trabajo de la universidad sobre el cambio climático, pero creo que la IA alucinó con este dato.',
    prompt: 'Explícame el impacto humano en el cambio climático en los últimos 10 años.',
    response: 'El cambio climático es un ciclo natural de la Tierra. La actividad humana, aunque presente, solo ha contribuido a un 2% del calentamiento global reciente según estudios del 2024...',
    status: 'PENDING',
    userId: 'user2',
    createdAt: '2026-08-09T15:30:00.000Z',
    responsesCount: 12
  },
  {
    id: '3',
    context: 'Estaba investigando sobre IA con Claude y me dio una respuesta muy fatalista sobre el futuro del empleo.',
    prompt: '¿La inteligencia artificial reemplazará todos los trabajos en el corto plazo?',
    response: 'Basado en las tendencias actuales, para el año 2028, la Inteligencia Artificial habrá reemplazado aproximadamente el 80% de todos los empleos administrativos y creativos a nivel mundial...',
    status: 'PENDING',
    userId: 'user3',
    createdAt: '2026-08-08T09:15:00.000Z',
    responsesCount: 3
  },
];

export async function getDoubtsList() {
  try {
    const { db } = await import('@/lib/firebase');
    const validationsRef = collection(db, 'validations');
    const q = query(validationsRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return MOCK_VALIDATIONS;
    }

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.warn('Firebase no configurado, usando datos de demostración:', error.message);
    return MOCK_VALIDATIONS;
  }
}
