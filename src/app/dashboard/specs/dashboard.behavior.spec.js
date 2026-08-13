// Behavior Spec: Dashboard Route

// Capa Lógica
export default function DashboardPage() {
  // 1. Inicializar estado activeTab = 'DUDAS'
  // 2. Inicializar estado isLoading, stats, recommendations
  // 3. useEffect para cargar datos (Llamar a utils/getDashboardData)
  // 4. Renderizar Navbar
  // 5. Renderizar layout Grid (Main Content y Sidebar)
  // 6. Main Content: ActionPanelUI, StatCardUI (x3), TabsUI, EmptyStateUI condicional según la tab.
  // 7. Sidebar: FeedSidebarUI pasando las recomendaciones.
}

// Utils
export async function getDashboardData() {
  // 1. Llamar a fetchUserStats de dashboardApi
  // 2. Llamar a fetchRecommendations de dashboardApi
  // 3. Retornar objeto combinado
}

// Serverless (API mock)
export async function fetchUserStats() {
  // Retornar { reputation: 120, doubts: 0, verifications: 0 } con setTimeout para simular red.
}
export async function fetchRecommendations() {
  // Retornar arreglo de dudas dummy.
}
