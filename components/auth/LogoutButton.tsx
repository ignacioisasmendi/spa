"use client";

import { useAuth0 } from '@/lib/auth0-context';

export default function LogoutButton() {
  const { logout, isLoading } = useAuth0();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="px-6 py-2.5 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9b5ad7]"
    >
      {isLoading ? 'Cargando...' : 'Cerrar sesión'}
    </button>
  );
}
