# Tech Spec: Dashboard Route

## Capa de Lógica y Estado (`src/app/dashboard/page.js`)

- **Estado:**
  - `activeTab: "DUDAS" | "VERIFICACIONES"` (default: `"DUDAS"`)
  - `stats: { reputation: number, doubts: number, verifications: number }`
  - `myDoubts: Array<{ id: string, context: string, question: string, aiResponse: string, date: string, validationCounts: object }>` (default: `[]`)
  - `myVerifications: Array<{ id: string, context: string, question: string, aiResponse: string, date: string, validationCounts: object, userVote: string }>` (default: `[]`)
  - `isLoading: boolean`

- **Comportamiento:**
  - En `useEffect`, llama a `getDashboardData(userId)` para obtener `stats`, `myDoubts` y `myVerifications`.
  - Mantiene la lógica de `handleTabChange`.
  - Si `activeTab === 'DUDAS'`, renderiza `DoubtCardUI` si `myDoubts.length > 0`, o `EmptyStateUI` si está vacío.
  - Si `activeTab === 'VERIFICACIONES'`, renderiza `DoubtCardUI` si `myVerifications.length > 0`, o `EmptyStateUI` si está vacío.
  - Al publicar exitosamente desde el modal, vuelve a llamar a `getDashboardData(userId)` para refrescar los datos.

## Componentes UI (`src/app/dashboard/components/` & `@/app/components/`)
- **`StatCardUI`**: Recibe `{ title, value, icon }`.
- **`TabsUI`**: Recibe `{ activeTab, onTabChange }`.
- **`ActionPanelUI`**: Botón y mensaje CTA superior.
- **`EmptyStateUI`**: Recibe `{ title, message, ctaText, onCtaClick }`.
- **`DoubtCardUI`**: (`@/app/components/DoubtCard/DoubtCardUI`): Renderiza tarjeta individual de duda recibiendo `{ id, context, question, aiResponse, date, status, validationCounts }`.

## Capas Utils y Serverless
- **`dashboardApi.js` (Serverless)**: Exporta `fetchUserStats(userId)`, `fetchUserDoubts(userId)` y `fetchUserVerifications(userId)` interactuando con LocalStorage (`publications`, `votes`).
- **`getDashboardData.js` (Utils)**: Orquesta `fetchUserStats`, `fetchUserDoubts` y `fetchUserVerifications`, formatea fechas en formato regional (es-CL) y retorna `{ stats, myDoubts, myVerifications }`.


