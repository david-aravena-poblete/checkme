# User Spec: Publish Validation Modal

## Actor
Usuario autenticado en el Dashboard.

## Flujos

### P-01: Abrir modal
- El usuario hace clic en "Plantear nueva duda" (en ActionPanelUI) o en "Plantear nueva duda" (en EmptyStateUI).
- Se abre una ventana modal emergente con fondo semi-transparente oscurecido.
- El modal tiene el título "Auditar Respuesta de IA".

### P-02: Llenar y enviar formulario
- El usuario ingresa texto en el campo "Contexto" expresando por qué hizo la pregunta a la IA y qué duda o sospecha le genera la respuesta.
- El usuario pega la pregunta en el campo "Pregunta realizada a la IA".
- El usuario pega la respuesta en el campo "Respuesta generada por la IA".
- El usuario hace clic en "Publicar para Validar".
- (Por ahora) El modal se cierra automáticamente y se asume éxito, mostrando un _log_ o alerta limpia.

### P-03: Cerrar modal
- El usuario hace clic en el botón "Cancelar" o en la "X" (opcional).
- El modal desaparece sin guardar datos.
