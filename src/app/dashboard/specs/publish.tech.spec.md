# Tech Spec: Publish Validation Modal

## Capa de Lógica y Estado (`src/app/dashboard/page.js`)

- **Estado extendido:**
  - `isPublishModalOpen: boolean` (default: `false`)

- **Eventos:**
  - `openPublishModal()`: setea a `true`.
  - `closePublishModal()`: setea a `false`.
  - Se pasan estos handlers a `ActionPanelUI` y `EmptyStateUI` como `onOpenPublish`.

## Capa de Componente Presentacional (`src/app/dashboard/components/PublishModalUI/`)

- **`PublishModalUI.jsx` props:**
  - `isOpen: boolean`
  - `onClose: () => void`
  - `onSubmit: (data: { context: string, prompt: string, response: string }) => void`

- **Estado Local del Modal:**
  - `contextText: string`
  - `promptText: string`
  - `responseText: string`
  - Al hacer onSubmit o onClose, limpiar estos estados.

- **Estilos:**
  - Utilizar posición `fixed` con z-index alto.
  - Fondo `rgba(0,0,0,0.7)` con backdrop-filter `blur(4px)`.
  - `textarea` con colores de `var(--input-bg)` y bordes sutiles.

## Capas Utils y Serverless

- **`publishValidation.js` (Utils):**
  - Transforma los datos crudos (`context`, `prompt`, `response`).
  - Agrega metadatos: `createdAt` (timestamp), `status` ('PENDING'), `userId`.
  - Llama a la capa serverless.

- **`publishApi.js` (Serverless):**
  - Importa `db` de `src/lib/firebase.js`.
  - Implementa `saveValidationRequestToDB(payload)` usando `addDoc`.
