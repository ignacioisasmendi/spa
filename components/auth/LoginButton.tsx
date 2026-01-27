"use client";

import { useAuth0 } from '@/lib/auth0-context';

export default function LoginButton() {
  const { loginWithRedirect, isLoading } = useAuth0();

  const handleLogin = async () => {
    try {
      await loginWithRedirect();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <button
      onClick={handleLogin}
      disabled={isLoading}
      className="px-6 py-2.5 bg-[#9b5ad7] text-white rounded-lg font-medium hover:bg-[#8a4ac4] disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9b5ad7]"
    >
      {isLoading ? 'Cargando...' : 'Iniciar sesión'}
    </button>
  );
}
