// Behavior Spec: Dashboard Route

// Capa Lógica
export default function DashboardPage() {
  // 1. Inicializar estado activeTab = 'DUDAS'
  // 2. Inicializar estado isLoading, stats, myDoubts = [], myVerifications = []
  // 3. useEffect para cargar datos (Llamar a utils/getDashboardData(userId))
  // 4. Renderizar Navbar
  // 5. Renderizar layout Grid (Main Content)
  // 6. Main Content: ActionPanelUI, StatCardUI (x3), TabsUI
  // 7. Tab Content:
  //    - Si activeTab === 'DUDAS' y myDoubts.length > 0: Renderizar cuadrícula con DoubtCardUI por cada duda
  //    - Si activeTab === 'DUDAS' y myDoubts.length === 0: Renderizar EmptyStateUI
  //    - Si activeTab === 'VERIFICACIONES' y myVerifications.length > 0: Renderizar cuadrícula con DoubtCardUI por cada verificación
  //    - Si activeTab === 'VERIFICACIONES' y myVerifications.length === 0: Renderizar EmptyStateUI
  // 8. Al publicar en PublishModalUI, refrescar getDashboardData(userId)
}

// Utils
export async function getDashboardData(userId) {
  // 1. Llamar a fetchUserStats(userId), fetchUserDoubts(userId) y fetchUserVerifications(userId) en paralelo
  // 2. Formatear fechas de las dudas y verificaciones a formato local legible
  // 3. Retornar objeto combinado { stats, myDoubts, myVerifications }
}

// Serverless (Firestore)
export async function fetchUserStats(userId) {
  // Contar dudas (publications con authorId == userId) y verificaciones (votes con userId == userId) en Firestore
}
export async function fetchUserDoubts(userId) {
  // Consultar publicaciones donde authorId == userId, mapear datos y ordenar en memoria descendentemente
}
export async function fetchUserVerifications(userId) {
  // Consultar colección votes donde userId == userId, obtener publicaciones asociadas y ordenar en memoria descendentemente
}


