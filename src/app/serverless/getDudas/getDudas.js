import { collection, getDocs, query, orderBy } from 'firebase/firestore';

const MOCK_DUDAS = [
  // SALUD
  {
    id: '1',
    title: '¿Es cierto que tomar 8 vasos de agua al día es obligatorio?',
    content: 'Me dijeron que si no tomo al menos 8 vasos de agua al día mi cuerpo se deshidrata gravemente. ¿Esto tiene respaldo científico o es un mito urbano que se ha popularizado?',
    category: 'Salud',
    authorName: 'María González',
    authorId: 'user1',
    createdAt: '2025-08-10',
    responsesCount: 5
  },
  {
    id: '2',
    title: '¿El ayuno intermitente realmente ayuda a bajar de peso?',
    content: 'He visto muchos influencers promoviendo el ayuno intermitente como la solución definitiva para perder peso. Algunos dicen que es peligroso. ¿Cuál es la verdad detrás de esta práctica?',
    category: 'Salud',
    authorName: 'Carlos Ruiz',
    authorId: 'user2',
    createdAt: '2025-08-09',
    responsesCount: 3
  },
  {
    id: '3',
    title: '¿Las vacunas causan autismo?',
    content: 'Un familiar me envió un artículo que afirma que las vacunas están relacionadas con el autismo en niños. Quiero saber si esta afirmación tiene algún fundamento científico real.',
    category: 'Salud',
    authorName: 'Ana López',
    authorId: 'user3',
    createdAt: '2025-08-08',
    responsesCount: 12
  },
  // TECNOLOGÍA
  {
    id: '4',
    title: '¿Es verdad que el 5G es peligroso para la salud?',
    content: 'He leído en redes sociales que las antenas 5G emiten radiación nociva que puede causar enfermedades. Varios vecinos están preocupados. ¿Hay evidencia real de esto?',
    category: 'Tecnología',
    authorName: 'Pedro Martínez',
    authorId: 'user4',
    createdAt: '2025-08-10',
    responsesCount: 8
  },
  {
    id: '5',
    title: '¿La inteligencia artificial reemplazará todos los trabajos?',
    content: 'Me dijeron en una conferencia que en 5 años la IA habrá reemplazado el 80% de los empleos actuales. ¿Es esto una exageración o una predicción realista?',
    category: 'Tecnología',
    authorName: 'Laura Sánchez',
    authorId: 'user5',
    createdAt: '2025-08-07',
    responsesCount: 15
  },
  {
    id: '6',
    title: '¿Los celulares escuchan nuestras conversaciones?',
    content: 'Noté que después de hablar sobre un producto, me aparecen anuncios relacionados en el celular. ¿Es coincidencia o realmente los teléfonos escuchan lo que decimos?',
    category: 'Tecnología',
    authorName: 'Roberto Díaz',
    authorId: 'user6',
    createdAt: '2025-08-06',
    responsesCount: 7
  },
  // CIENCIA
  {
    id: '7',
    title: '¿La Tierra realmente es plana?',
    content: 'Un compañero de trabajo insiste en que la Tierra es plana y que las fotos de la NASA son falsas. Me mostró varios videos. ¿Cómo puedo refutar esto con argumentos sólidos?',
    category: 'Ciencia',
    authorName: 'Diego Torres',
    authorId: 'user7',
    createdAt: '2025-08-10',
    responsesCount: 20
  },
  {
    id: '8',
    title: '¿Es cierto que solo usamos el 10% del cerebro?',
    content: 'Esta idea aparece en muchas películas y libros de autoayuda. Dicen que si pudiéramos usar el 100% tendríamos superpoderes. ¿Qué dice la neurociencia al respecto?',
    category: 'Ciencia',
    authorName: 'Sofía Vargas',
    authorId: 'user8',
    createdAt: '2025-08-09',
    responsesCount: 6
  },
  {
    id: '9',
    title: '¿El cambio climático es causado por humanos?',
    content: 'Algunos dicen que el cambio climático es un ciclo natural de la Tierra y que la actividad humana no tiene un impacto significativo. ¿Cuál es el consenso científico actual?',
    category: 'Ciencia',
    authorName: 'Andrés Morales',
    authorId: 'user9',
    createdAt: '2025-08-05',
    responsesCount: 11
  },
  // POLÍTICA
  {
    id: '10',
    title: '¿Es verdad que los impuestos en Chile son los más altos de Latinoamérica?',
    content: 'Un político afirmó en televisión que Chile tiene la carga tributaria más alta de toda Latinoamérica. ¿Esto es correcto o está sacando datos de contexto?',
    category: 'Política',
    authorName: 'Fernanda Rojas',
    authorId: 'user10',
    createdAt: '2025-08-10',
    responsesCount: 4
  },
  {
    id: '11',
    title: '¿Las encuestas electorales son confiables?',
    content: 'En las últimas elecciones, las encuestas fallaron bastante en sus predicciones. ¿Podemos confiar en las encuestas como herramienta para predecir resultados?',
    category: 'Política',
    authorName: 'Miguel Herrera',
    authorId: 'user11',
    createdAt: '2025-08-08',
    responsesCount: 9
  },
  {
    id: '12',
    title: '¿Los gobiernos controlan el clima con tecnología secreta?',
    content: 'Vi un documental que dice que los gobiernos pueden manipular el clima usando chemtrails y tecnología HAARP. ¿Hay algo de verdad en esto?',
    category: 'Política',
    authorName: 'Valentina Cruz',
    authorId: 'user12',
    createdAt: '2025-08-04',
    responsesCount: 6
  },
  // EDUCACIÓN
  {
    id: '13',
    title: '¿Es cierto que los estilos de aprendizaje no existen?',
    content: 'Un profesor nos dijo que la teoría de estilos de aprendizaje (visual, auditivo, kinestésico) no tiene respaldo científico. ¿Es verdad que es un mito educativo?',
    category: 'Educación',
    authorName: 'Camila Fuentes',
    authorId: 'user13',
    createdAt: '2025-08-10',
    responsesCount: 3
  },
  {
    id: '14',
    title: '¿La educación en línea es igual de efectiva que la presencial?',
    content: 'Después de la pandemia muchos dicen que la educación online es igual o mejor que la presencial. Otros dicen que los estudiantes aprenden menos. ¿Qué dicen los estudios?',
    category: 'Educación',
    authorName: 'Javier Mendoza',
    authorId: 'user14',
    createdAt: '2025-08-07',
    responsesCount: 7
  },
  {
    id: '15',
    title: '¿Leer en pantalla es peor que leer en papel?',
    content: 'Me dijeron que la comprensión lectora disminuye significativamente cuando leemos en pantallas digitales comparado con papel impreso. ¿Hay investigación que respalde esto?',
    category: 'Educación',
    authorName: 'Isabella Ramos',
    authorId: 'user15',
    createdAt: '2025-08-03',
    responsesCount: 2
  },
];

export async function getDoubtsList() {
  try {
    const { db } = await import('@/lib/firebase');
    const dudasRef = collection(db, 'dudas');
    const q = query(dudasRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return MOCK_DUDAS;
    }

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.warn('Firebase no configurado, usando datos de demostración:', error.message);
    return MOCK_DUDAS;
  }
}
