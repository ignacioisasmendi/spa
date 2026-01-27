'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
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
                Iniciar sesión
              </h2>
              <p className="text-gray-600">
                Accedé a tu cuenta de forma segura
              </p>
            </div>

            <div className="space-y-6">
              {/* Auth0 Login Button */}
              <a
                href="/auth/login"
                className="w-full flex items-center justify-center gap-3 bg-[#9b5ad7] text-white py-4 px-6 rounded-lg font-medium hover:bg-[#8a4ac4] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9b5ad7] transition-all shadow-sm hover:shadow-md"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                Continuar con Auth0
              </a>

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

              {/* Features */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-[#9b5ad7] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Autenticación de dos factores disponible</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-[#9b5ad7] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Múltiples opciones de inicio de sesión</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <svg className="w-5 h-5 text-[#9b5ad7] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Protección contra accesos no autorizados</span>
                </div>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                ¿No tenés una cuenta?{' '}
                <a
                  href="/auth/signup"
                  className="font-medium text-[#9b5ad7] hover:text-[#8a4ac4] transition-colors"
                >
                  Crear cuenta
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
