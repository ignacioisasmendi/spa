'use client';

import { useAuth0 } from '@/lib/auth0-context';
import LoginButton from '@/components/auth/LoginButton';
import LogoutButton from '@/components/auth/LogoutButton';
import Profile from '@/components/auth/Profile';

export default function AuthDemoPage() {
  const { isAuthenticated, isLoading, user, error } = useAuth0();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="w-16 h-16 border-4 border-[#9b5ad7]/20 rounded-full"></div>
            <div className="w-16 h-16 border-4 border-[#9b5ad7] border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <p className="text-gray-600">Cargando estado de autenticación...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Auth0 SPA Demo
          </h1>
          <p className="text-lg text-gray-600">
            Demostración de autenticación con Auth0 SPA SDK
          </p>
        </div>

        {/* Status Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Estado de Autenticación
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">Estado:</span>
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                isAuthenticated 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-200 text-gray-800'
              }`}>
                {isAuthenticated ? '✓ Autenticado' : '✗ No autenticado'}
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">Cargando:</span>
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                isLoading 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-gray-200 text-gray-800'
              }`}>
                {isLoading ? 'Sí' : 'No'}
              </span>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm font-medium text-red-800 mb-1">Error:</p>
                <p className="text-sm text-red-600">{error.message}</p>
              </div>
            )}
          </div>
        </div>

        {/* Actions Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Acciones
          </h2>
          
          <div className="flex flex-wrap gap-4">
            {!isAuthenticated ? (
              <LoginButton />
            ) : (
              <LogoutButton />
            )}
          </div>
        </div>

        {/* User Profile Card */}
        {isAuthenticated && user && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Perfil de Usuario
            </h2>
            
            <Profile />

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Datos completos del usuario:
              </h3>
              <pre className="text-xs text-gray-600 overflow-auto">
                {JSON.stringify(user, null, 2)}
              </pre>
            </div>
          </div>
        )}

        {/* Info Card */}
        <div className="bg-gradient-to-r from-[#9b5ad7] to-[#8a4ac4] rounded-xl shadow-lg p-8 text-white">
          <h2 className="text-2xl font-semibold mb-4">
            ℹ️ Información
          </h2>
          
          <div className="space-y-3 text-sm">
            <p>
              <strong>Flujo de autenticación:</strong> Esta página utiliza el Auth0 SPA SDK 
              para autenticación del lado del cliente.
            </p>
            <p>
              <strong>Callback URL:</strong> /callback
            </p>
            <p>
              <strong>Método de almacenamiento:</strong> Memory (tokens en memoria)
            </p>
            <p>
              <strong>Refresh tokens:</strong> Habilitados
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-white/20">
            <p className="text-sm opacity-90">
              Para más información, consulta la documentación en{' '}
              <code className="bg-white/20 px-2 py-1 rounded">AUTH0_SETUP.md</code>
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="text-[#9b5ad7] hover:text-[#8a4ac4] font-medium transition-colors"
          >
            ← Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
}
