# Tech Spec: Auth Route

## Modelos y Tipos

```typescript
type AuthMode = "LOGIN" | "REGISTER";
```

## Capa de Lógica y Estado (`src/app/auth/page.js`)

- **Estado:**
  - `mode: AuthMode` (default: `"LOGIN"`)
  - `email: string` (default: `""`)
  - `password: string` (default: `""`)
  - `confirmPassword: string` (default: `""`)
  - `error: string | null` (default: `null`)

- **Eventos:**
  - `toggleMode()`: Cambia el valor de `mode` entre `"LOGIN"` y `"REGISTER"`. Limpia `error` y `confirmPassword`.
  - `handleSubmit(e)`: Previene default. Si `mode === "REGISTER"`, valida que `password === confirmPassword`. Si no, setea `error`. Si es exitoso, redirige a `/dashboard` usando `useRouter`.

## Capa de Componentes Presentacionales (`src/app/auth/components/AuthForm/AuthFormUI.jsx`)

- **Props:**
  - `mode: AuthMode`
  - `email: string`
  - `password: string`
  - `confirmPassword: string`
  - `error: string | null`
  - `onEmailChange: (value: string) => void`
  - `onPasswordChange: (value: string) => void`
  - `onConfirmPasswordChange: (value: string) => void`
  - `onToggleMode: () => void`
  - `onSubmit: (e: React.FormEvent) => void`

- **Reglas:**
  - Renderiza campos dependiendo de `mode`.
  - Emite los cambios a través de las funciones `onChange`.
  - Renderiza `error` si existe.

## Mapeo U-Specs -> Tech-Specs
- **U-01:** `page.js` inicializa con `mode = "LOGIN"`. `AuthFormUI` renderiza sin campo "Repetir Contraseña".
- **U-02:** Usuario hace clic en "Crear cuenta", llama `onToggleMode`. `mode` cambia a `"REGISTER"`, y `AuthFormUI` muestra "Repetir Contraseña".
- **U-03:** Al hacer submit, `handleSubmit` verifica `password !== confirmPassword`, setea `error`.
- **U-04/U-05:** `handleSubmit` verifica datos, limpia errores, llama `router.push('/dashboard')`.
