// Behavior Spec: Auth Route

// Capa de Lógica y Estado
export default function AuthPage() {
  // 1. Inicializar estado (mode, email, password, confirmPassword, error)
  // 2. Crear manejador onToggleMode que alterne entre LOGIN y REGISTER
  // 3. Crear manejador onSubmit que:
  //    a. Prevenga comportamiento por defecto del formulario
  //    b. Si está en REGISTER, verifique si password == confirmPassword
  //       - Si no, setear error y terminar.
  //    c. Si todo está correcto o si es LOGIN, hacer push a '/dashboard'.
  // 4. Retornar el componente AuthFormUI pasándole el estado y los manejadores
}

// Capa Presentacional: AuthFormUI
export function AuthFormUI({ mode, email, password, confirmPassword, error, onEmailChange, onPasswordChange, onConfirmPasswordChange, onToggleMode, onSubmit }) {
  // 1. Renderizar título dependiendo del mode (Iniciar Sesión vs Crear Cuenta)
  // 2. Renderizar form con evento onSubmit
  // 3. Renderizar input email
  // 4. Renderizar input password
  // 5. Si mode === 'REGISTER', renderizar input confirmPassword
  // 6. Si hay error, renderizar bloque de error
  // 7. Renderizar botón de submit (texto dinámico según mode)
  // 8. Renderizar botón para cambiar modo con onToggleMode
}
