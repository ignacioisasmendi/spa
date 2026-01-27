'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth0 } from '@/lib/auth0-context';
import Image from 'next/image';

export default function CallbackPage() {
  const router = useRouter();
  const { handleRedirectCallback, isAuthenticated, error } = useAuth0();
  const [isProcessing, setIsProcessing] = useState(true);
  const [callbackError, setCallbackError] = useState<string | null>(null);

  useEffect(() => {
    const processCallback = async () => {
      try {
        // Check if there's a code or error in the URL
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        const urlError = params.get('error');
        const errorDescription = params.get('error_description');

        if (urlError) {
          console.error('Auth0 error:', urlError, errorDescription);
          setCallbackError(errorDescription || urlError);
          setIsProcessing(false);
          
          // Redirect to home after showing error
          setTimeout(() => {
            router.push('/');
          }, 3000);
          return;
        }

        if (code) {
          // Handle the Auth0 callback
          await handleRedirectCallback();
          
          // Redirect to dashboard after successful authentication
          router.push('/dashboard');
        } else {
          // No code in URL, check if already authenticated
          if (isAuthenticated) {
            router.push('/dashboard');
          } else {
            router.push('/');
          }
        }
      } catch (err) {
        console.error('Error processing callback:', err);
        setCallbackError(
          err instanceof Error ? err.message : 'Failed to process authentication'
        );
        setIsProcessing(false);
        
        // Redirect to home after showing error
        setTimeout(() => {
          router.push('/');
        }, 3000);
      }
    };

    processCallback();
  }, [handleRedirectCallback, isAuthenticated, router]);

  if (callbackError || error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fafafa] via-[#f5f5f5] to-[#f0f0f0]">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Error de autenticación
            </h1>
            <p className="text-gray-600 mb-6">
              {callbackError || error?.message || 'Ocurrió un error al iniciar sesión'}
            </p>
            <p className="text-sm text-gray-500">
              Redirigiendo a la página principal...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isProcessing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fafafa] via-[#f5f5f5] to-[#f0f0f0]">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <Image
              src="/logo.svg"
              alt="Planer"
              width={64}
              height={64}
              className="mx-auto mb-6 animate-pulse"
            />
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Iniciando sesión...
            </h1>
            <p className="text-gray-600 mb-6">
              Estamos procesando tu autenticación
            </p>
            
            {/* Loading spinner */}
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="w-12 h-12 border-4 border-[#9b5ad7]/20 rounded-full"></div>
                <div className="w-12 h-12 border-4 border-[#9b5ad7] border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
              </div>
            </div>

            <div className="mt-8 space-y-2">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-[#9b5ad7] rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-[#9b5ad7] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-[#9b5ad7] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
