# Tech Spec: Validation Route (`/validation/[id]`)

## Capa de Lógica y Estado (`src/app/validation/[id]/page.js`)

- **Estado:**
  - `validation: ValidationDetail | null`
  - `comments: Array<Comment>` (default: `[]`)
  - `userVote: 'LIKE' | 'DISLIKE' | null`
  - `isLoading: boolean`
  - `isVoting: boolean`
  - `isSubmittingComment: boolean`
  - `error: string | null`

- **Comportamiento:**
  - Obtiene el parámetro dinámico `id` mediante `use(params)`.
  - En `useEffect`, llama a `getValidationDetails(id)`, `getComments(id)` y `checkUserVote(id, userId)` en paralelo.
  - `handleVote(isLike)`: Ejecuta optimistic update local del voto y contadores, y llama a `castVote(id, isLike, user)`. En caso de error, revierte el estado local.
  - `handleAddComment(text)`: Llama a `addComment(id, text, user)` y agrega el nuevo comentario a la lista local.

## Componentes UI (`src/app/validation/components/`)

- **`ValidationDetailUI`**:
  - Props: `{ context: string, prompt?: string, question?: string, response?: string, aiResponse?: string }`
  - Renderiza context, prompt/question y response/aiResponse con tarjetas semánticas.

- **`AuditActionsUI`**:
  - Props: `{ likesCount: number, dislikesCount: number, onVote: (isLike: boolean) => void, userVote: string | null, isVoting: boolean }`
  - Renderiza botones interactivos de auditoría con contadores y estado activo.

- **`FeedbackSectionUI`**:
  - Props: `{ comments: Array<Comment>, onSubmitComment: (text: string) => void, isSubmitting: boolean }`
  - Renderiza formulario de ingreso de feedback y lista de comentarios.

## Capas Utils y Serverless

- **`validationUtils.js` (Utils)**:
  - `getValidationDetails(id)`: Llama a `fetchValidationById(id)`, provee defaults seguros para contadores y campos.
  - `getComments(validationId)`: Llama a `fetchValidationComments(validationId)`.
  - `addComment(validationId, text, user)`: Extrae información del usuario (`uid`, `displayName` o `email`) y llama a `postValidationComment`.
  - `castVote(validationId, isLike, user)`: Llama a `submitValidationVote`.
  - `checkUserVote(validationId, user)`: Llama a `getUserVote`.

- **`validationApi.js` (Serverless)**:
  - `fetchValidationById(id)`: Consulta `doc(db, 'publications', id)`.
  - `fetchValidationComments(validationId)`: Consulta `collection(db, 'comments')` con `where('validationId', '==', validationId)` y ordena por `createdAt` ascendente.
  - `postValidationComment(validationId, text, userId, userName)`: Agrega documento a `comments`.
  - `getUserVote(validationId, userId)`: Consulta `doc(db, 'votes', `${validationId}_${userId}`)`.
  - `submitValidationVote(validationId, userId, isLike)`: Registra en `votes` y actualiza contadores `likesCount`/`dislikesCount` en `publications`.
