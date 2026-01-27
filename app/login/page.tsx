'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useAuth0 } from '@/lib/auth0-context';

export default function LoginPage() {
  const { loginWithRedirect, isLoading } = useAuth0();

  useEffect(() => {
    // Automatically redirect to Auth0 when the page loads
    const initiateLogin = async () => {
      try {
        await loginWithRedirect();
      } catch (error) {
        console.error('Failed to initiate login:', error);
      }
    };

    if (!isLoading) {
      initiateLogin();
    }
  }, [loginWithRedirect, isLoading]);
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Brand Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#fafafa] via-[#f5f5f5] to-[#f0f0f0] relative overflow-hidden">
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20 max-w-xl mx-auto">
          {/* Logo */}
          <div className="mb-12">
            <Image
              src="/logo.svg"
              alt="Planer"
              width={56}
              height={56}
              className="mb-6"
            />
            <h1 className="text-4xl xl:text-5xl font-semibold text-gray-900 leading-tight mb-4">
              Gestioná todas tus redes en un solo lugar
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Planificá, programá y publicá contenido en todas tus plataformas desde una única herramienta. Ahorrá tiempo y mejorá tus resultados.
            </p>
          </div>

          {/* Decorative elements */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#9b5ad7]/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-[#9b5ad7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Calendario unificado</h3>
                <p className="text-sm text-gray-600">Visualizá todo tu contenido en un solo lugar</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#9b5ad7]/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-[#9b5ad7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Programación inteligente</h3>
                <p className="text-sm text-gray-600">Publicá en el momento ideal para tu audiencia</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#9b5ad7]/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-[#9b5ad7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Análisis detallados</h3>
                <p className="text-sm text-gray-600">Entendé qué funciona y optimizá tu estrategia</p>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle gradient orb */}
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-[#9b5ad7]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-[#9b5ad7]/5 rounded-full blur-3xl" />
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-8 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center">
            <Image
              src="/logo.svg"
              alt="Planer"
              width={48}
              height={48}
              className="mx-auto mb-4"
            />
            <h2 className="text-2xl font-semibold text-gray-900">Planer</h2>
          </div>

          <div className="bg-white">
            <div className="mb-8">
              <h2 className="text-3xl font-semibold text-gray-900 mb-2">
                Redirigiendo...
              </h2>
              <p className="text-gray-600">
                Te estamos redirigiendo a la página de inicio de sesión segura
              </p>
            </div>

            <div className="space-y-6">
              {/* Loading State */}
              <div className="flex items-center justify-center py-8">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-[#9b5ad7]/20 rounded-full"></div>
                  <div className="w-16 h-16 border-4 border-[#9b5ad7] border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-[#9b5ad7]/5 border border-[#9b5ad7]/10 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <svg
                      className="w-5 h-5 text-[#9b5ad7]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-1">
                      Inicio de sesión seguro
                    </h3>
                    <p className="text-sm text-gray-600">
                      Utilizamos Auth0 para garantizar la máxima seguridad de tu cuenta. 
                      Podés iniciar sesión con tu email o con tus cuentas sociales.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
