// Serverless — Spec de comportamiento

async function getDoubtsList() {
  // Intenta importar dinámicamente la instancia de Firestore (db) desde lib/firebase.
  // Construye una referencia a la colección "dudas".
  // Crea un query ordenado por createdAt en orden descendente.
  // Ejecuta el query y obtiene un snapshot.
  // Si el snapshot está vacío, retorna el array de datos mock.
  // Si tiene documentos, mapea cada doc a un objeto con su id y sus datos.
  // Si en cualquier punto ocurre un error (Firebase no configurado, red, etc),
  //   registra un warning en consola y retorna el array de datos mock.
  // Nunca lanza un error hacia el llamador.
}
