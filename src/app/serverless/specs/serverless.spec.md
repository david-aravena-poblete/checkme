# Serverless — Spec de Usuario

## Descripción
Funciones que interactúan directamente con Firebase SDK (Firestore) para obtener datos persistidos.

## Módulo: `getDudas`

### Comportamientos

#### 1. Obtener lista de dudas
- Se consulta la colección `dudas` en Firestore ordenada por fecha de creación descendente.
- Si Firestore tiene datos, se retornan como array de dudas.
- Si la colección está vacía, se retornan datos mock de demostración.
- Si Firebase no está configurado o falla la conexión, se retornan datos mock.

#### 2. Fallback a datos mock
- Los datos mock contienen 15 dudas distribuidas en 5 categorías: Salud, Tecnología, Ciencia, Política, Educación.
- Cada duda mock tiene: id, title, content, category, authorName, authorId, createdAt, responsesCount.

---

## Criterios de aceptación

| ID | Criterio |
|----|----------|
| S-01 | `getDoubtsList` siempre retorna un array |
| S-02 | Cada elemento del array tiene los campos: id, title, content, category, authorName, authorId, createdAt, responsesCount |
| S-03 | Con Firebase configurado y datos existentes, retorna datos de Firestore |
| S-04 | Con Firebase configurado y colección vacía, retorna mock |
| S-05 | Con Firebase no configurado, retorna mock sin lanzar error |
| S-06 | Los datos mock contienen al menos 15 dudas |
| S-07 | Los datos mock cubren al menos 5 categorías distintas |
