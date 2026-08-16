# User Spec: Dashboard Route

## Actor
Usuario autenticado.

## Flujos

### U-01: Ver panel general del Dashboard
- El usuario navega a `/dashboard`.
- El usuario ve una barra de navegación superior.
- El usuario ve un panel de acción rápido con un botón "Plantear nueva duda".
- El usuario ve tarjetas estadísticas mostrando su "Reputación", "Mis Dudas Publicadas" y "Verificaciones Aportadas".
- El usuario ve un menú de pestañas para cambiar entre "Mis Dudas" y "Mis Verificaciones".
- El usuario ve un panel lateral (o inferior en móvil) con sugerencias de "Dudas recomendadas para verificar".

### U-02: Navegación por pestañas y visualización de dudas y verificaciones
- El usuario hace clic en la pestaña "Mis Dudas":
  - Si el usuario tiene dudas publicadas: El sistema muestra una cuadrícula con sus publicaciones (`DoubtCardUI`).
  - Si el usuario NO tiene dudas: El sistema muestra el estado vacío (`EmptyStateUI`) indicando que no hay dudas, invitándolo a publicar una.
- El usuario hace clic en "Mis Verificaciones":
  - Si el usuario ha emitido votos/auditorías: El sistema muestra una cuadrícula con las publicaciones que ha verificado (`DoubtCardUI`).
  - Si el usuario NO ha verificado publicaciones: El sistema muestra el estado vacío (`EmptyStateUI`) invitándolo a auditar publicaciones de la comunidad.

### U-03: Llamado a la acción rápido
- El usuario ve el botón "Plantear nueva duda" en el panel de acción (`ActionPanelUI`).
- (El clic por ahora no lleva a ninguna parte, o muestra una alerta, pero el botón debe resaltar visualmente).
