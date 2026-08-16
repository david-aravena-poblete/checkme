# User Spec: Validation Route (`/validation/[id]`)

## Actor
- Usuario visitante (no autenticado).
- Usuario autenticado en el sistema.

## Flujos

### V-01: Ver detalle de auditoría
- El usuario navega a `/validation/[id]` directamente o haciendo clic en una tarjeta de duda en Home o Dashboard.
- El sistema muestra la barra de navegación superior y un enlace para regresar ("← Volver a Auditorías").
- El usuario visualiza la tarjeta principal con:
  - El contexto del problema.
  - El prompt o pregunta original realizada a la IA.
  - La respuesta generada por la IA que se está auditando.
- El usuario visualiza el panel lateral con las acciones de auditoría (votos) y la sección de comentarios/feedback.

### V-02: Emitir voto de veracidad
- El usuario observa los botones de veredicto:
  - 👍 "IA Correcta" con su contador actual.
  - 👎 "IA Alucinó / Falló" con su contador actual.
- El usuario hace clic en una opción:
  - La interfaz se actualiza de forma inmediata reflejando su elección (optimistic update).
  - El voto se persiste en la base de datos y se actualizan los contadores globales.
  - El usuario puede cambiar su voto en cualquier momento haciendo clic en la opción contraria.

### V-03: Publicar y consultar comentarios / feedback
- El usuario ve la lista de comentarios aportados previamente por otros miembros de la comunidad con el autor, fecha y análisis.
- El usuario ingresa un texto en el formulario de feedback ("Escribe tu análisis o evidencia sobre esta respuesta...").
- El usuario hace clic en "Añadir Feedback".
- El comentario se envía a la base de datos y se añade automáticamente a la lista de comentarios.
