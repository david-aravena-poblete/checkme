# User Spec: Validation Route (`/validation/[id]`)

## Actor
- Usuario visitante (no autenticado).
- Usuario autenticado en el sistema.

## Flujos

### V-01: Ver detalle de auditoría
- El usuario navega a `/validation/[id]` directamente o haciendo clic en una tarjeta de duda en Home o Dashboard.
- El sistema muestra la barra de navegación superior, un botón principal ("← Volver al Dashboard") y un enlace para regresar a todas las auditorías ("Ver todas las auditorías").
- El usuario visualiza la tarjeta principal con:
  - El contexto del problema.
  - El prompt o pregunta original realizada a la IA.
  - La respuesta generada por la IA que se está auditando.
- El usuario visualiza el panel lateral con las acciones de auditoría (votos) y la sección de comentarios/feedback.

### V-02: Emitir voto de veracidad
- **Requisito**: Requiere usuario autenticado.
- Si el usuario no está autenticado:
  - Los botones de auditoría aparecen deshabilitados y se muestra un aviso invitando a iniciar sesión con enlace a `/auth`.
- Si el usuario está autenticado:
  - Inicialmente (o al presionar "Cambiar"), el usuario observa ambas opciones (👍 "IA Correcta", 👎 "IA Alucinó / Falló") habilitadas.
  - Al seleccionar una opción, la otra opción desaparece de la vista y se visualiza únicamente la opción elegida, acompañada del texto "Puedes cambiar tu voto si lo deseas" y un botón "Cambiar".
  - Al presionar el botón "Cambiar", vuelven a mostrarse ambas opciones para que el usuario pueda seleccionar o modificar su voto.
  - El voto se persiste en la base de datos y se actualizan los contadores globales.



### V-03: Publicar y consultar comentarios / feedback
- Todos los usuarios pueden consultar la lista de comentarios aportados previamente por la comunidad con el autor, fecha y análisis.
- **Publicar feedback**: Requiere usuario autenticado.
  - Si el usuario no está autenticado, se muestra un aviso con enlace a `/auth` para iniciar sesión.
  - Si el usuario está autenticado, se despliega el formulario de ingreso de feedback ("Escribe tu análisis o evidencia sobre esta respuesta...").
  - Al enviar el comentario, este se persiste en la base de datos y se añade automáticamente a la lista.

### V-04: Editar y eliminar mi duda en vista de detalle
- Si el usuario autenticado es el autor de la publicación (`authorId === user.uid`), la tarjeta principal muestra botones "✏️ Editar Duda" y "🗑️ Eliminar Duda".
- Al presionar "Editar Duda", se abre el modal de edición para modificar contexto, prompt y respuesta.
- Al presionar "Eliminar Duda", se pide confirmación, se elimina la publicación y se redirige al usuario a `/dashboard`.

### V-05: Editar y eliminar mis comentarios / feedbacks
- Para cada comentario cuyo autor sea el usuario autenticado (`userId === user.uid`), se visualizan los botones "✏️ Editar" y "🗑️ Eliminar".
- Al presionar "Editar", se activa la edición en línea del comentario con opciones para "Guardar" y "Cancelar".
- Al presionar "Eliminar", se solicita confirmación y se elimina el comentario de la lista y del almacenamiento.


