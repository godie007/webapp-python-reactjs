import { useEffect, useState } from 'react';
import { showToast } from './Toast';

export const EmailVerification = () => {
  const [isVerifying, setIsVerifying] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState<'success' | 'error' | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get('message');
    const status = urlParams.get('status') as 'success' | 'error';

    if (message && status) {
      setVerificationStatus(status);
      
      if (status === 'success') {
        showToast.success(message);
      } else {
        showToast.error(message);
      }
    }
    
    setIsVerifying(false);
  }, []);

  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-monokai">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-[#f8f8f2]">Verificando email...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-monokai py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-sm w-full">
        <div className="card p-6 border-glow">
          <div className="text-center">
            {verificationStatus === 'success' ? (
              <>
                <div className="text-4xl mb-4">✅</div>
                <h2 className="text-xl font-bold text-[#f8f8f2] text-shadow mb-2">
                  ¡Email Verificado!
                </h2>
                <p className="text-sm text-[#75715e] mb-6">
                  Tu cuenta ha sido verificada exitosamente. Ya puedes iniciar sesión.
                </p>
                <button
                  onClick={() => window.location.href = '/login'}
                  className="btn-primary w-full"
                >
                  Ir al Login
                </button>
              </>
            ) : (
              <>
                <div className="text-4xl mb-4">❌</div>
                <h2 className="text-xl font-bold text-[#f8f8f2] text-shadow mb-2">
                  Error de Verificación
                </h2>
                <p className="text-sm text-[#75715e] mb-6">
                  Hubo un problema al verificar tu email. El enlace puede haber expirado.
                </p>
                <button
                  onClick={() => window.location.href = '/register'}
                  className="btn-primary w-full"
                >
                  Registrarse Nuevamente
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 