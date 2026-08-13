# User Spec: Auth Route

## Actor
Usuario que necesita acceder o crear una cuenta.

## Flujos

### U-01: Ver formulario de inicio de sesión
- El usuario navega a `/auth`.
- El usuario ve un formulario con campos para "Email" y "Contraseña".
- El usuario ve un botón "Iniciar Sesión".
- El usuario ve un botón secundario "Crear cuenta".

### U-02: Cambiar a modo registro
- El usuario está en la vista de inicio de sesión (`/auth`).
- El usuario presiona el botón "Crear cuenta".
- El formulario cambia: los botones se actualizan a "Crear Cuenta" (principal) y "Ya tengo cuenta" (secundario).
- Aparece un nuevo campo "Repetir Contraseña".

### U-03: Crear cuenta con contraseñas distintas (Error)
- El usuario está en modo registro.
- El usuario ingresa una contraseña en el campo "Contraseña".
- El usuario ingresa una contraseña diferente en "Repetir Contraseña".
- El usuario presiona el botón "Crear Cuenta".
- El sistema muestra un mensaje de error indicando que las contraseñas no coinciden.
- El proceso de creación no avanza.

### U-04: Crear cuenta exitosamente
- El usuario está en modo registro.
- El usuario ingresa un email válido y la misma contraseña en ambos campos de contraseña.
- El usuario presiona "Crear Cuenta".
- El sistema valida exitosamente las contraseñas y redirige al usuario a la ruta `/dashboard`.

### U-05: Inicio de sesión exitoso
- El usuario está en modo inicio de sesión.
- El usuario ingresa su email y contraseña.
- El usuario presiona "Iniciar Sesión".
- El sistema valida e ingresa al usuario, redirigiendo a la ruta `/dashboard`.
