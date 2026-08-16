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
- Al hacer clic, se abre el modal de publicación de nuevas dudas.

### U-04: Editar y eliminar mis dudas
- En la pestaña "Mis Dudas", cada tarjeta (`DoubtCardUI`) incluye botones de acción "✏️ Editar" y "🗑️ Eliminar".
- Al presionar "Editar", se abre `EditDoubtModalUI` con los datos cargados permitiendo modificar contexto, pregunta y respuesta de la IA.
- Al presionar "Eliminar", se solicita confirmación al usuario y se borra la duda junto con sus comentarios y votos asociados.

