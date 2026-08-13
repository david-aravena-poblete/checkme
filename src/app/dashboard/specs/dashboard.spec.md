# User Spec: Dashboard Route

## Actor
Usuario autenticado.

## Flujos

### U-01: Ver panel general del Dashboard
- El usuario navega a `/dashboard`.
- El usuario ve una barra de navegación superior.
- El usuario ve un panel de acción rápido con un botón "Plantear nueva duda".
- El usuario ve tarjetas estadísticas mostrando su "Reputación", "Mis Dudas Publicadas" y "Verificaciones Aportadas".
- El usuario ve un menú de pestañas para cambiar entre "Mis Dudas", "Mis Aportes" y "Guardados".
- El usuario ve un panel lateral (o inferior en móvil) con sugerencias de "Dudas recomendadas para verificar".

### U-02: Navegación por pestañas (Empty State)
- El usuario hace clic en la pestaña "Mis Dudas".
- El sistema muestra el estado vacío (Empty State) indicando que no hay dudas, invitándolo a publicar una.
- El usuario hace clic en "Mis Aportes" o "Guardados", visualizando el mismo comportamiento (estado vacío) para este hito inicial.

### U-03: Llamado a la acción rápido
- El usuario ve el botón "Plantear nueva duda" en el panel de acción (`ActionPanelUI`).
- (El clic por ahora no lleva a ninguna parte, o muestra una alerta, pero el botón debe resaltar visualmente).
