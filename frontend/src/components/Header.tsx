interface HeaderProps {
  onLogout: () => void;
  userData: any;
}

export const Header = ({ onLogout, userData }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 bg-secondary-900/80 backdrop-blur-lg border-b border-secondary-700/50 shadow-soft">
      <div className="container-fluid">
        <div className="flex items-center justify-between py-4">
          {/* Logo y título */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_6_319)">
                    <path
                      d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"
                      fill="currentColor"
                      className="text-primary-400"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_6_319"><rect width="48" height="48" fill="white"></rect></clipPath>
                  </defs>
                </svg>
              </div>
              <h1 className="text-display text-xl md:text-2xl text-gradient">
                Panel de Control
              </h1>
            </div>
          </div>

          {/* Navegación */}
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6">
              <a 
                className="text-body text-secondary-200 hover:text-primary-400 transition-colors duration-200 font-medium"
                href="#"
              >
                Inicio
              </a>
              <a 
                className="text-body text-secondary-200 hover:text-primary-400 transition-colors duration-200 font-medium"
                href="#"
              >
                Perfil
              </a>
              <a 
                className="text-body text-secondary-200 hover:text-primary-400 transition-colors duration-200 font-medium"
                href="#"
              >
                Configuración
              </a>
            </nav>

            {/* Perfil de usuario y logout */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full gradient-primary flex items-center justify-center shadow-soft">
                  <span className="text-body font-bold text-white text-sm md:text-base">
                    {userData?.user_info?.username?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-body text-secondary-100 font-medium">
                    {userData?.user_info?.username || 'Usuario'}
                  </p>
                  <p className="text-xs text-secondary-400">
                    {userData?.user_info?.email || 'usuario@email.com'}
                  </p>
                </div>
              </div>
              
              <button
                onClick={onLogout}
                className="btn-error btn-sm"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}; 