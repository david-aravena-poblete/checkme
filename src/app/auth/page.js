'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthFormUI from './components/AuthForm/AuthFormUI';

export default function AuthPage() {
  const router = useRouter();
  
  const [mode, setMode] = useState('LOGIN');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleToggleMode = () => {
    setMode(prev => (prev === 'LOGIN' ? 'REGISTER' : 'LOGIN'));
    setError(null);
    setConfirmPassword(''); // Clear it when toggling just in case
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (mode === 'REGISTER') {
      if (password !== confirmPassword) {
        setError('Las contraseñas no coinciden.');
        return;
      }
    }

    // Aquí en el futuro se llamaría a la capa utils -> serverless.
    // Por ahora, asumimos éxito y redirigimos.
    console.log(`Éxito en ${mode} con ${email}`);
    localStorage.setItem('isAuthenticated', 'true');
    router.push('/dashboard');
  };

  return (
    <AuthFormUI
      mode={mode}
      email={email}
      password={password}
      confirmPassword={confirmPassword}
      error={error}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onConfirmPasswordChange={setConfirmPassword}
      onToggleMode={handleToggleMode}
      onSubmit={handleSubmit}
    />
  );
}
