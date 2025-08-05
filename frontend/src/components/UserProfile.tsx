import type { ProtectedResponse } from '../types/api';

interface UserProfileProps {
  userData: ProtectedResponse | null;
}

export const UserProfile = ({ userData }: UserProfileProps) => {
  if (!userData) return null;

  return (
    <div className="card-elevated responsive-padding">
      <div className="flex flex-col items-center text-center space-y-6">
        {/* Avatar */}
        <div className="relative">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full gradient-primary flex items-center justify-center shadow-large">
            <span className="text-display text-4xl md:text-5xl text-white">
              {userData.user_info.username.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-success-500 rounded-full border-4 border-secondary-900 flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>

        {/* Información del usuario */}
        <div className="space-y-3">
          <div>
            <h1 className="text-display text-2xl md:text-3xl text-gradient mb-2">
              {userData.user_info.username}
            </h1>
            <p className="text-body text-secondary-300 responsive-text">
              {userData.user_info.email}
            </p>
          </div>

          {/* Estado del usuario */}
          <div className="flex items-center justify-center gap-2">
            <div className="badge-success">
              <div className="w-2 h-2 bg-success-400 rounded-full mr-2"></div>
              Usuario Activo
            </div>
          </div>
        </div>

        {/* Información adicional */}
        <div className="grid-responsive-3 w-full max-w-2xl">
          <div className="card-glass text-center">
            <div className="text-2xl text-primary-400 mb-2">📧</div>
            <p className="text-body text-secondary-200 font-medium">Email Verificado</p>
            <p className="text-xs text-secondary-400">Cuenta activa</p>
          </div>
          
          <div className="card-glass text-center">
            <div className="text-2xl text-success-400 mb-2">🔐</div>
            <p className="text-body text-secondary-200 font-medium">Sesión Segura</p>
            <p className="text-xs text-secondary-400">Autenticado</p>
          </div>
          
          <div className="card-glass text-center">
            <div className="text-2xl text-accent-400 mb-2">⚡</div>
            <p className="text-body text-secondary-200 font-medium">Acceso Rápido</p>
            <p className="text-xs text-secondary-400">Panel disponible</p>
          </div>
        </div>
      </div>
    </div>
  );
}; 