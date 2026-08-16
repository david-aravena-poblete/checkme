/**
 * Hardcoded & LocalStorage Database Layer for CheckMe (Standalone / Demo mode)
 * All baseline doubts, validations, comments, and votes are hardcoded directly in the code
 * to guarantee that closing/reopening the browser, SSR, or clearing cache never loses data.
 */

const STORAGE_KEYS = {
  PUBLICATIONS: 'checkme_user_publications',
  VOTES: 'checkme_user_votes',
  COMMENTS: 'checkme_user_comments',
  USERS: 'checkme_user_users',
  AUTH_USER: 'checkme_auth_user',
  LOGGED_OUT_FLAG: 'checkme_logged_out',
  DELETED_PUBLICATIONS: 'checkme_deleted_publications',
  DELETED_COMMENTS: 'checkme_deleted_comments',
};

// ==========================================
// HARDCODED BASE DATA (Siempre disponibles)
// ==========================================

export const HARDCODED_PUBLICATIONS = [
  {
    id: 'pub_1',
    authorId: 'user_demo',
    authorEmail: 'demo@checkme.com',
    authorName: 'David A.',
    context: 'Estaba con un cuadro de gripe fuerte con fiebre alta y dolor muscular, y necesitaba saber cuántas pastillas de 1 g podía tomar al día sin intoxicarme. La IA me respondió que hasta 4 gramos diarios (4000 mg), pero me causó duda si esa dosis máxima es realmente segura para el hígado de cualquier adulto o si ya roza un nivel hepatotóxico peligroso.',
    question: '¿Cuál es la dosis máxima diaria recomendada de paracetamol para un adulto sin patologías previas?',
    aiResponse: 'La dosis máxima recomendada para un adulto sano es de 4 gramos (4000 mg) al día, típicamente administrada en tomas de 500 mg a 1 g cada 4 a 6 horas según necesidad.',
    validationCounts: { correct: 12, partiallyCorrect: 1, incorrect: 0 },
    validationCount: 13,
    likesCount: 12,
    dislikesCount: 0,
    createdAt: '2026-08-15T14:30:00.000Z',
    updatedAt: '2026-08-15T14:30:00.000Z'
  },
  {
    id: 'pub_2',
    authorId: 'user_maria',
    authorEmail: 'maria.tech@example.com',
    authorName: 'María Rojas',
    context: 'Estaba refactorizando la arquitectura de una aplicación en Next.js 15 y un compañero de equipo me insistía en que los Route Handlers (/api) estaban obsoletos y que debíamos migrar todo a Server Actions. Le consulté a la IA para contrastar opiniones y me respondió que no los reemplazan, pero me genera la duda de cuáles son los límites técnicos exactos para preferir uno sobre el otro.',
    question: '¿Los Server Actions reemplazan por completo a los Route Handlers (API routes) en Next.js?',
    aiResponse: 'No, no los reemplazan por completo. Los Server Actions están diseñados principalmente para mutaciones originadas desde la UI (formularios, botones), mientras que los Route Handlers son adecuados para construir APIs REST tradicionales consumibles por terceros o webhooks.',
    validationCounts: { correct: 18, partiallyCorrect: 1, incorrect: 0 },
    validationCount: 19,
    likesCount: 18,
    dislikesCount: 0,
    createdAt: '2026-08-15T16:45:00.000Z',
    updatedAt: '2026-08-15T16:45:00.000Z'
  },
  {
    id: 'pub_3',
    authorId: 'user_carlos',
    authorEmail: 'carlos.dev@example.com',
    authorName: 'Carlos M.',
    context: 'Un colega en la oficina me aseguró entusiasmado que Python 4.0 ya había sido lanzado oficialmente con compilación JIT nativa y sin GIL. Le pregunté a la IA para verificar la noticia y me afirmó rotundamente que salió en octubre de 2024. Me causó mucha sospecha porque tenía entendido que Guido van Rossum descartó una versión 4.0 y que esas mejoras eran de la rama 3.13.',
    question: '¿Cuándo fue lanzado Python 4.0 y qué nuevas características incluye?',
    aiResponse: 'Python 4.0 fue lanzado en octubre de 2024 e introdujo compilación JIT nativa por defecto y eliminación completa del GIL (Global Interpreter Lock).',
    validationCounts: { correct: 0, partiallyCorrect: 0, incorrect: 24 },
    validationCount: 24,
    likesCount: 0,
    dislikesCount: 24,
    createdAt: '2026-08-15T18:10:00.000Z',
    updatedAt: '2026-08-15T18:10:00.000Z'
  },
  {
    id: 'pub_4',
    authorId: 'user_demo',
    authorEmail: 'demo@checkme.com',
    authorName: 'David A.',
    context: 'Estudiando para mi examen de astrofísica sobre trayectorias de lanzamiento orbital, quería corroborar el valor numérico exacto de la velocidad de escape terrestre. La IA me arrojó 11.186 km/s, pero me genera la duda de si este cálculo ideal aplica tal cual en la práctica o si la resistencia de la atmósfera modifica significativamente este requerimiento.',
    question: '¿Cuál es la velocidad de escape requerida para salir del campo gravitatorio terrestre desde la superficie?',
    aiResponse: 'La velocidad de escape de la Tierra en la superficie es de aproximadamente 11.186 km/s (alrededor de 40.270 km/h o 25.020 mph), sin considerar la resistencia del aire.',
    validationCounts: { correct: 9, partiallyCorrect: 0, incorrect: 0 },
    validationCount: 9,
    likesCount: 9,
    dislikesCount: 0,
    createdAt: '2026-08-15T19:00:00.000Z',
    updatedAt: '2026-08-15T19:00:00.000Z'
  },
  {
    id: 'pub_5',
    authorId: 'user_matias',
    authorEmail: 'matias.historia@example.com',
    authorName: 'Matías Henríquez',
    context: 'Revisando apuntes con mi hijo para una presentación de historia sobre conflictos monárquicos medievales, le consulté a la IA por las fechas y contendientes de la Guerra de los Cien Años. Me respondió que duró exactamente 100 años y contra el Sacro Imperio, lo cual me generó una duda inmediata porque recordaba que involucraba a Francia e Inglaterra y que se extendió por más tiempo.',
    question: '¿Cuánto duró exactamente la Guerra de los Cien Años y quiénes fueron los contendientes principales?',
    aiResponse: 'La Guerra de los Cien Años duró exactamente 100 años (1337 a 1437) y enfrentó a Inglaterra contra el Sacro Imperio Romano Germánico.',
    validationCounts: { correct: 0, partiallyCorrect: 1, incorrect: 19 },
    validationCount: 20,
    likesCount: 0,
    dislikesCount: 19,
    createdAt: '2026-08-15T20:15:00.000Z',
    updatedAt: '2026-08-15T20:15:00.000Z'
  },
  {
    id: 'pub_6',
    authorId: 'user_nicole',
    authorEmail: 'dra.nicole@example.com',
    authorName: 'Dra. Nicole Castro',
    context: 'Preparando material pedagógico para una clase de farmacología clínica sobre antibióticos betalactámicos, le pedí a la IA que detallara su mecanismo de acción bactericida. La IA me detalló la inhibición de PBPs y la lisis celular osmótica, pero quería someterlo a la validación de la comunidad médica para comprobar si la terminología bioquímica es completamente rigurosa.',
    question: '¿Cómo actúan los antibióticos betalactámicos (penicilinas, cefalosporinas) para eliminar bacterias?',
    aiResponse: 'Los antibióticos betalactámicos inhiben la síntesis de la pared celular bacteriana al unirse irreversiblemente a las proteínas fijadoras de penicilina (PBP), impidiendo el entrecruzamiento de las cadenas de peptidoglicano y provocando la lisis celular.',
    validationCounts: { correct: 15, partiallyCorrect: 0, incorrect: 0 },
    validationCount: 15,
    likesCount: 15,
    dislikesCount: 0,
    createdAt: '2026-08-15T21:00:00.000Z',
    updatedAt: '2026-08-15T21:00:00.000Z'
  }
];


export const HARDCODED_COMMENTS = [
  // pub_1
  {
    id: 'comm_1_1',
    validationId: 'pub_1',
    userId: 'user_maria',
    userName: 'María Rojas (Farmacéutica)',
    text: 'Información verificada con las guías clínicas del ISP y la FDA. La dosis límite es de 4000 mg/24h en adultos sanos. Exceder esta cantidad genera riesgo severo de daño hepatotóxico.',
    createdAt: '2026-08-15T15:00:00.000Z'
  },
  {
    id: 'comm_1_2',
    validationId: 'pub_1',
    userId: 'user_andres',
    userName: 'Dr. Andrés Soto',
    text: 'Totalmente de acuerdo. Es importante recordar no combinarlo con otros antigripales o analgésicos compuestos que ya incluyan paracetamol.',
    createdAt: '2026-08-15T15:20:00.000Z'
  },
  {
    id: 'comm_1_3',
    validationId: 'pub_1',
    userId: 'user_valentina',
    userName: 'Valentina Gómez',
    text: 'Revisé la literatura médica de UpToDate y coincide punto por punto con los intervalos de 4 a 6 horas.',
    createdAt: '2026-08-15T15:45:00.000Z'
  },

  // pub_2
  {
    id: 'comm_2_1',
    validationId: 'pub_2',
    userId: 'user_gonzalo',
    userName: 'Gonzalo Silva (Tech Lead)',
    text: 'Respuesta impecable. Los Route Handlers manejan el protocolo HTTP estándar (GET, POST con request/response crudo para Stripe, webhooks y APIs externas), mientras que Server Actions son funciones asíncronas RPC optimizadas para React.',
    createdAt: '2026-08-15T17:10:00.000Z'
  },
  {
    id: 'comm_2_2',
    validationId: 'pub_2',
    userId: 'user_demo',
    userName: 'David A.',
    text: 'Excelente aclaración. En nuestro proyecto usamos Server Actions para mutaciones y formularios, y Route Handlers para endpoints de integración.',
    createdAt: '2026-08-15T17:30:00.000Z'
  },
  {
    id: 'comm_2_3',
    validationId: 'pub_2',
    userId: 'user_felipe',
    userName: 'Felipe Bravo',
    text: 'Agrego que para subida directa de archivos multipart muy pesados o streaming de datos en tiempo real, los Route Handlers ofrecen mayor control.',
    createdAt: '2026-08-15T17:50:00.000Z'
  },

  // pub_3
  {
    id: 'comm_3_1',
    validationId: 'pub_3',
    userId: 'user_demo',
    userName: 'David A.',
    text: '¡Totalmente falso! Python 4.0 no existe. Guido van Rossum ha aclarado en reiteradas ocasiones que no habrá un Python 4 en el futuro cercano, y las versiones actuales corresponden a la rama 3.12 y 3.13.',
    createdAt: '2026-08-15T18:25:00.000Z'
  },
  {
    id: 'comm_3_2',
    validationId: 'pub_3',
    userId: 'user_roberto',
    userName: 'Roberto Díaz (Python Core Contributor)',
    text: 'La IA mezcló el PEP 703 (free-threaded Python en 3.13) y el compilador JIT experimental con una inexistente versión 4.0. Alucinación clara y peligrosa.',
    createdAt: '2026-08-15T18:40:00.000Z'
  },
  {
    id: 'comm_3_3',
    validationId: 'pub_3',
    userId: 'user_ana',
    userName: 'Ana Sepúlveda',
    text: 'Error evidente. Gran ejemplo de por qué CheckMe es fundamental para auditar estas alucinaciones.',
    createdAt: '2026-08-15T19:00:00.000Z'
  },

  // pub_4
  {
    id: 'comm_4_1',
    validationId: 'pub_4',
    userId: 'user_eduardo',
    userName: 'Prof. Eduardo Valdés (Físico)',
    text: 'Cálculo analítico exacto: v = sqrt(2GM/R) ≈ 11.186 km/s. La IA acertó y además aclaró pertinentemente que es despreciando el arrastre atmosférico.',
    createdAt: '2026-08-15T19:20:00.000Z'
  },
  {
    id: 'comm_4_2',
    validationId: 'pub_4',
    userId: 'user_camila',
    userName: 'Camila N. (Astronomía)',
    text: 'Coincide con los manuales de astrodinámica y mecánica orbital de la NASA y la ESA.',
    createdAt: '2026-08-15T19:40:00.000Z'
  },

  // pub_5
  {
    id: 'comm_5_1',
    validationId: 'pub_5',
    userId: 'user_matias',
    userName: 'Matías Henríquez (Historiador)',
    text: 'Doble error grave de la IA: duró 116 años (1337 a 1453) y el conflicto fue entre los reinos de Inglaterra y Francia (dinastías Plantagenet y Valois), no con el Sacro Imperio.',
    createdAt: '2026-08-15T20:30:00.000Z'
  },
  {
    id: 'comm_5_2',
    validationId: 'pub_5',
    userId: 'user_beatriz',
    userName: 'Beatriz Loyola',
    text: 'Alucinación típica donde el modelo asume literalmente el nombre "Cien Años" e inventa los bandos. Totalmente desaprobado.',
    createdAt: '2026-08-15T20:45:00.000Z'
  },
  {
    id: 'comm_5_3',
    validationId: 'pub_5',
    userId: 'user_lucas',
    userName: 'Lucas P.',
    text: 'Verificado con la Enciclopedia Británica. La respuesta generada por la IA es completamente errónea.',
    createdAt: '2026-08-15T21:00:00.000Z'
  },

  // pub_6
  {
    id: 'comm_6_1',
    validationId: 'pub_6',
    userId: 'user_nicole',
    userName: 'Dra. Nicole Castro',
    text: 'Excelente explicación farmacológica a nivel molecular. Describe con precisión las PBPs, el peptidoglicano y la lisis osmótica bacteriana.',
    createdAt: '2026-08-15T21:15:00.000Z'
  },
  {
    id: 'comm_6_2',
    validationId: 'pub_6',
    userId: 'user_ignacio',
    userName: 'Ignacio Vera (Bioquímico)',
    text: 'Mecanismo bactericida descrito a la perfección según el tratado de Goodman & Gilman. 100% veraz.',
    createdAt: '2026-08-15T21:30:00.000Z'
  }
];

export const HARDCODED_VOTES = [
  {
    id: 'pub_1_user_demo',
    validationId: 'pub_1',
    userId: 'user_demo',
    type: 'LIKE',
    updatedAt: '2026-08-15T15:10:00.000Z'
  },
  {
    id: 'pub_2_user_demo',
    validationId: 'pub_2',
    userId: 'user_demo',
    type: 'LIKE',
    updatedAt: '2026-08-15T17:35:00.000Z'
  },
  {
    id: 'pub_3_user_demo',
    validationId: 'pub_3',
    userId: 'user_demo',
    type: 'DISLIKE',
    updatedAt: '2026-08-15T18:20:00.000Z'
  },
  {
    id: 'pub_4_user_demo',
    validationId: 'pub_4',
    userId: 'user_demo',
    type: 'LIKE',
    updatedAt: '2026-08-15T19:15:00.000Z'
  },
  {
    id: 'pub_5_user_demo',
    validationId: 'pub_5',
    userId: 'user_demo',
    type: 'DISLIKE',
    updatedAt: '2026-08-15T20:40:00.000Z'
  },
  {
    id: 'pub_6_user_demo',
    validationId: 'pub_6',
    userId: 'user_demo',
    type: 'LIKE',
    updatedAt: '2026-08-15T21:20:00.000Z'
  }
];

export const HARDCODED_USERS = [
  {
    uid: 'user_demo',
    email: 'demo@checkme.com',
    password: 'password123',
    displayName: 'David A. (Demo)',
    createdAt: '2026-08-01T10:00:00.000Z'
  },
  {
    uid: 'user_maria',
    email: 'maria.tech@example.com',
    password: 'password123',
    displayName: 'María Rojas',
    createdAt: '2026-08-02T10:00:00.000Z'
  }
];

// Helper safely accessing localStorage
function isClient() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function getItem(key, defaultValue) {
  if (!isClient()) return defaultValue;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : defaultValue;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return defaultValue;
  }
}

function setItem(key, value) {
  if (!isClient()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing ${key} to localStorage:`, error);
  }
}

export function initLocalStorageSeed() {
  // No-op necesario porque las funciones de consulta combinan los datos hardcodeados directamente
}

// Evento de broadcast para actualizar componentes ante cambios de autenticación
export function notifyAuthChange(user) {
  if (isClient()) {
    window.dispatchEvent(new CustomEvent('checkme_auth_changed', { detail: user }));
  }
}

// --- PUBLICACIONES ---
export function getStoredPublications() {
  const deletedPubIds = getItem(STORAGE_KEYS.DELETED_PUBLICATIONS, []);
  const userPubs = getItem(STORAGE_KEYS.PUBLICATIONS, []);
  
  const hardcodedWithOverrides = HARDCODED_PUBLICATIONS
    .filter((h) => !deletedPubIds.includes(h.id))
    .map((hardcodedPub) => {
      const override = userPubs.find((p) => p.id === hardcodedPub.id);
      return override ? { ...hardcodedPub, ...override } : hardcodedPub;
    });

  const customNewPubs = userPubs.filter(
    (p) => !HARDCODED_PUBLICATIONS.some((h) => h.id === p.id) && !deletedPubIds.includes(p.id)
  );

  return [...customNewPubs, ...hardcodedWithOverrides];
}

export function getStoredPublicationById(id) {
  const publications = getStoredPublications();
  return publications.find((p) => p.id === id) || null;
}

export function saveStoredPublication(publicationData) {
  const userPubs = getItem(STORAGE_KEYS.PUBLICATIONS, []);
  const newPublication = {
    id: publicationData.id || `pub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    ...publicationData,
    validationCounts: publicationData.validationCounts || { correct: 0, partiallyCorrect: 0, incorrect: 0 },
    validationCount: publicationData.validationCount || 0,
    likesCount: publicationData.likesCount || 0,
    dislikesCount: publicationData.dislikesCount || 0,
    createdAt: publicationData.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  setItem(STORAGE_KEYS.PUBLICATIONS, [newPublication, ...userPubs]);
  return newPublication;
}

export function updateStoredPublication(id, updaterFn) {
  const allPubs = getStoredPublications();
  const current = allPubs.find((p) => p.id === id);
  if (!current) return null;

  const updated = {
    ...current,
    ...updaterFn(current),
    updatedAt: new Date().toISOString()
  };

  const userPubs = getItem(STORAGE_KEYS.PUBLICATIONS, []);
  const existingIdx = userPubs.findIndex((p) => p.id === id);

  if (existingIdx !== -1) {
    userPubs[existingIdx] = updated;
  } else {
    userPubs.push(updated);
  }

  setItem(STORAGE_KEYS.PUBLICATIONS, userPubs);
  return updated;
}

export function editStoredPublication(id, updatedFields, userId) {
  const allPubs = getStoredPublications();
  const target = allPubs.find((p) => p.id === id);
  if (!target) throw new Error('Publicación no encontrada.');
  if (target.authorId !== userId) throw new Error('No tienes permisos para editar esta duda.');

  return updateStoredPublication(id, () => ({
    context: updatedFields.context?.trim() || target.context,
    question: updatedFields.question?.trim() || target.question,
    aiResponse: updatedFields.aiResponse?.trim() || target.aiResponse,
    updatedAt: new Date().toISOString(),
  }));
}

export function deleteStoredPublication(id, userId) {
  const allPubs = getStoredPublications();
  const target = allPubs.find((p) => p.id === id);
  if (!target) throw new Error('Publicación no encontrada.');
  if (target.authorId !== userId) throw new Error('No tienes permisos para eliminar esta duda.');

  // 1. Agregar a la lista de eliminados
  const deletedPubIds = getItem(STORAGE_KEYS.DELETED_PUBLICATIONS, []);
  if (!deletedPubIds.includes(id)) {
    deletedPubIds.push(id);
    setItem(STORAGE_KEYS.DELETED_PUBLICATIONS, deletedPubIds);
  }

  // 2. Limpiar de userPubs si estaba ahí
  const userPubs = getItem(STORAGE_KEYS.PUBLICATIONS, []);
  const filteredPubs = userPubs.filter((p) => p.id !== id);
  setItem(STORAGE_KEYS.PUBLICATIONS, filteredPubs);

  // 3. Eliminar comentarios asociados
  const userComments = getItem(STORAGE_KEYS.COMMENTS, []);
  const filteredComments = userComments.filter((c) => c.validationId !== id);
  setItem(STORAGE_KEYS.COMMENTS, filteredComments);

  // 4. Eliminar votos asociados
  const userVotes = getItem(STORAGE_KEYS.VOTES, []);
  const filteredVotes = userVotes.filter((v) => v.validationId !== id);
  setItem(STORAGE_KEYS.VOTES, filteredVotes);

  return true;
}

// --- COMENTARIOS ---
export function getStoredComments(validationId) {
  const deletedCommentIds = getItem(STORAGE_KEYS.DELETED_COMMENTS, []);
  const userComments = getItem(STORAGE_KEYS.COMMENTS, []);

  const hardcodedWithOverrides = HARDCODED_COMMENTS
    .filter((h) => !deletedCommentIds.includes(h.id))
    .map((hardcodedComment) => {
      const override = userComments.find((c) => c.id === hardcodedComment.id);
      return override ? { ...hardcodedComment, ...override } : hardcodedComment;
    });

  const customNewComments = userComments.filter(
    (c) => !HARDCODED_COMMENTS.some((h) => h.id === c.id) && !deletedCommentIds.includes(c.id)
  );

  const allComments = [...customNewComments, ...hardcodedWithOverrides];

  if (!validationId) return allComments;
  return allComments
    .filter((c) => c.validationId === validationId)
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
}

export function saveStoredComment(commentData) {
  const userComments = getItem(STORAGE_KEYS.COMMENTS, []);
  const newComment = {
    id: commentData.id || `comm_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    ...commentData,
    createdAt: commentData.createdAt || new Date().toISOString()
  };

  userComments.push(newComment);
  setItem(STORAGE_KEYS.COMMENTS, userComments);
  return newComment;
}

export function editStoredComment(commentId, newText, userId) {
  const allComments = getStoredComments();
  const target = allComments.find((c) => c.id === commentId);
  if (!target) throw new Error('Comentario no encontrado.');
  if (target.userId !== userId) throw new Error('No tienes permisos para editar este comentario.');

  const updatedComment = {
    ...target,
    text: newText.trim(),
    updatedAt: new Date().toISOString()
  };

  const userComments = getItem(STORAGE_KEYS.COMMENTS, []);
  const existingIdx = userComments.findIndex((c) => c.id === commentId);

  if (existingIdx !== -1) {
    userComments[existingIdx] = updatedComment;
  } else {
    userComments.push(updatedComment);
  }

  setItem(STORAGE_KEYS.COMMENTS, userComments);
  return updatedComment;
}

export function deleteStoredComment(commentId, userId) {
  const allComments = getStoredComments();
  const target = allComments.find((c) => c.id === commentId);
  if (!target) throw new Error('Comentario no encontrado.');
  if (target.userId !== userId) throw new Error('No tienes permisos para eliminar este comentario.');

  const deletedCommentIds = getItem(STORAGE_KEYS.DELETED_COMMENTS, []);
  if (!deletedCommentIds.includes(commentId)) {
    deletedCommentIds.push(commentId);
    setItem(STORAGE_KEYS.DELETED_COMMENTS, deletedCommentIds);
  }

  const userComments = getItem(STORAGE_KEYS.COMMENTS, []);
  const filtered = userComments.filter((c) => c.id !== commentId);
  setItem(STORAGE_KEYS.COMMENTS, filtered);

  return true;
}


// --- VOTOS ---
export function getStoredVotes() {
  const userVotes = getItem(STORAGE_KEYS.VOTES, []);
  
  // Combinar los votos hardcodeados con los votos emitidos por el usuario
  const mergedVotesMap = new Map();
  HARDCODED_VOTES.forEach((v) => mergedVotesMap.set(`${v.validationId}_${v.userId}`, v));
  userVotes.forEach((v) => mergedVotesMap.set(`${v.validationId}_${v.userId}`, v));

  return Array.from(mergedVotesMap.values());
}

export function getUserStoredVote(validationId, userId) {
  if (!validationId || !userId) return null;
  const votes = getStoredVotes();
  const vote = votes.find((v) => v.validationId === validationId && v.userId === userId);
  return vote ? vote.type : null;
}

export function saveStoredVote(validationId, userId, isLike) {
  const newVoteType = isLike ? 'LIKE' : 'DISLIKE';
  const votes = getStoredVotes();
  const oldVote = votes.find((v) => v.validationId === validationId && v.userId === userId);
  const oldVoteType = oldVote ? oldVote.type : null;

  if (oldVoteType === newVoteType) {
    return false; // Ya votó lo mismo
  }

  let likesDelta = 0;
  let dislikesDelta = 0;

  if (newVoteType === 'LIKE') {
    likesDelta = 1;
    if (oldVoteType === 'DISLIKE') dislikesDelta = -1;
  } else {
    dislikesDelta = 1;
    if (oldVoteType === 'LIKE') likesDelta = -1;
  }

  // Guardar o actualizar en user votes
  const userVotes = getItem(STORAGE_KEYS.VOTES, []);
  const voteIndex = userVotes.findIndex((v) => v.validationId === validationId && v.userId === userId);

  const newVoteRecord = {
    id: `${validationId}_${userId}`,
    validationId,
    userId,
    type: newVoteType,
    updatedAt: new Date().toISOString()
  };

  if (voteIndex !== -1) {
    userVotes[voteIndex] = newVoteRecord;
  } else {
    userVotes.push(newVoteRecord);
  }
  setItem(STORAGE_KEYS.VOTES, userVotes);

  // Actualizar contadores en la publicación
  updateStoredPublication(validationId, (pub) => {
    const lCount = Math.max(0, (pub.likesCount || 0) + likesDelta);
    const dCount = Math.max(0, (pub.dislikesCount || 0) + dislikesDelta);
    const counts = pub.validationCounts || { correct: 0, partiallyCorrect: 0, incorrect: 0 };
    
    return {
      likesCount: lCount,
      dislikesCount: dCount,
      validationCounts: {
        ...counts,
        correct: Math.max(0, (counts.correct || 0) + (likesDelta > 0 ? 1 : (oldVoteType === 'LIKE' ? -1 : 0))),
        incorrect: Math.max(0, (counts.incorrect || 0) + (dislikesDelta > 0 ? 1 : (oldVoteType === 'DISLIKE' ? -1 : 0)))
      }
    };
  });

  return true;
}

// --- USUARIOS Y AUTENTICACIÓN ---
export function getStoredUsers() {
  const userUsers = getItem(STORAGE_KEYS.USERS, []);
  const mergedUsersMap = new Map();
  HARDCODED_USERS.forEach((u) => mergedUsersMap.set(u.email.toLowerCase(), u));
  userUsers.forEach((u) => mergedUsersMap.set(u.email.toLowerCase(), u));

  return Array.from(mergedUsersMap.values());
}

export function findStoredUser(email) {
  const users = getStoredUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
}

export function saveStoredUser(userData) {
  const userUsers = getItem(STORAGE_KEYS.USERS, []);
  const newUser = {
    uid: userData.uid || `user_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    email: userData.email,
    password: userData.password,
    displayName: userData.displayName || userData.email.split('@')[0],
    createdAt: new Date().toISOString()
  };

  userUsers.push(newUser);
  setItem(STORAGE_KEYS.USERS, userUsers);
  return newUser;
}

export function getStoredAuthUser() {
  if (!isClient()) {
    // En SSR devolvemos el usuario demo por defecto
    return HARDCODED_USERS[0];
  }

  // Si el usuario cerró sesión explícitamente
  if (window.localStorage.getItem(STORAGE_KEYS.LOGGED_OUT_FLAG) === 'true') {
    return null;
  }

  const storedAuth = getItem(STORAGE_KEYS.AUTH_USER, null);
  if (storedAuth) return storedAuth;

  // Por defecto, sesión demo activa
  setItem(STORAGE_KEYS.AUTH_USER, HARDCODED_USERS[0]);
  return HARDCODED_USERS[0];
}

export function setStoredAuthUser(user) {
  if (isClient()) {
    window.localStorage.removeItem(STORAGE_KEYS.LOGGED_OUT_FLAG);
  }
  setItem(STORAGE_KEYS.AUTH_USER, user);
  notifyAuthChange(user);
}

export function clearStoredAuthUser() {
  if (isClient()) {
    window.localStorage.setItem(STORAGE_KEYS.LOGGED_OUT_FLAG, 'true');
    window.localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
    notifyAuthChange(null);
  }
}
