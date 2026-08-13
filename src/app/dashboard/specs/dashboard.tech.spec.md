# Tech Spec: Dashboard Route

## Capa de Lógica y Estado (`src/app/dashboard/page.js`)

- **Estado:**
  - `activeTab: "DUDAS" | "APORTES" | "GUARDADOS"` (default: `"DUDAS"`)
  - `stats: { reputation: number, doubts: number, verifications: number }`
  - `recommendations: Array<{ id: string, title: string }>`
  - `isLoading: boolean`

- **Comportamiento:**
  - En `useEffect`, llama a `getDashboardData()` para obtener `stats` y `recommendations`.
  - Mantiene la lógica de `handleTabChange`.
  - Importa y orquesta los componentes UI.

## Componentes UI (`src/app/dashboard/components/`)
- **`StatCardUI`**: Recibe `{ title, value, icon }`.
- **`TabsUI`**: Recibe `{ activeTab, onTabChange }`.
- **`ActionPanelUI`**: Botón y mensaje CTA superior.
- **`EmptyStateUI`**: Recibe `{ message, ctaText }`.
- **`FeedSidebarUI`**: Recibe `recommendations`.

## Capas Utils y Serverless
- **`dashboardApi.js`**: Exporta `fetchUserStats()` y `fetchRecommendations()`.
- **`getDashboardData.js`**: Orquesta las peticiones al API simulado y formatea.
