// Behavior Spec: Publish Modal

export function PublishModalUI({ isOpen, onClose, onSubmit, isPublishing }) {
  // 1. Si !isOpen, retornar null para no renderizar
  // 2. Manejar estados locales (contextText, promptText, responseText)
  // 3. Crear handleClose: limpiar estados y llamar a onClose()
  // 4. Crear handleSubmit: prevenir evento por defecto, llamar a onSubmit con los datos. 
  //    (Nota: El cierre y limpieza de form se maneja tras promesa exitosa desde el padre).
  // 5. Renderizar backdrop (fondo oscurecido)
  // 6. Renderizar tarjeta modal
  // 7. Renderizar form
  //    a. Textarea para contexto
  //    b. Textarea para prompt
  //    c. Textarea para response
  // 8. Renderizar footer con botones:
  //    a. "Cancelar" (onClick = handleClose, disabled = isPublishing)
  //    b. "Publicar" (type="submit", text="Publicando..." if isPublishing, disabled = isPublishing)
}
