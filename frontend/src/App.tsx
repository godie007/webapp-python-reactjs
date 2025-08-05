import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { Dashboard } from './components/Dashboard';
import { EmailVerification } from './components/EmailVerification';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    // Verificar si hay un token almacenado
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLoginSuccess = (_token: string) => {
    setIsAuthenticated(true);
  };

  const handleRegisterSuccess = (_token: string) => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  const handleSwitchToRegister = () => {
    setShowRegister(true);
  };

  const handleSwitchToLogin = () => {
    setShowRegister(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner-lg mx-auto mb-4"></div>
          <p className="text-body text-secondary-300">Cargando aplicación...</p>
        </div>
      </div>
    );
  }

  // Verificar si estamos en la página de verificación de email
  const urlParams = new URLSearchParams(window.location.search);
  const isEmailVerification = urlParams.get('message') && urlParams.get('status');

  return (
    <div className="App min-h-screen">
      <Toaster />
      {isEmailVerification ? (
        <EmailVerification />
      ) : isAuthenticated ? (
        <Dashboard onLogout={handleLogout} />
      ) : showRegister ? (
        <RegisterForm onRegisterSuccess={handleRegisterSuccess} onSwitchToLogin={handleSwitchToLogin} />
      ) : (
        <LoginForm onLoginSuccess={handleLoginSuccess} onSwitchToRegister={handleSwitchToRegister} />
      )}
    </div>
  );
}

export default App;
