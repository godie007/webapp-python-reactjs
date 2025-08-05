import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { apiService } from '../services/api';
import type { LoginRequest } from '../types/api';
import { showToast } from './Toast';

const schema = yup.object({
  email: yup.string().email('Email inválido').required('El email es requerido'),
  password: yup.string().required('La contraseña es requerida'),
}).required();

interface LoginFormProps {
  onLoginSuccess: (token: string) => void;
  onSwitchToRegister: () => void;
}

export const LoginForm = ({ onLoginSuccess, onSwitchToRegister }: LoginFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiService.login(data);
      localStorage.setItem('token', response.access_token);
      showToast.success('¡Bienvenido! Sesión iniciada correctamente');
      onLoginSuccess(response.access_token);
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || 'Error al iniciar sesión';
      setError(errorMessage);
      showToast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="container-compact">
        <div className="panel-elevated responsive-padding">
          {/* Header con mejor tipografía y espaciado */}
          <div className="text-center mb-8">
            <div className="mb-4">
              <h1 className="text-display text-3xl sm:text-4xl text-gradient mb-2">
                Bienvenido
              </h1>
              <p className="text-body text-secondary-300 responsive-text">
                Accede a tu cuenta para continuar
              </p>
            </div>
          </div>
          
          {/* Formulario con mejor estructura */}
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  <span className="text-primary-400 mr-2">→</span>
                  Correo electrónico
                </label>
                <input
                  {...register('email')}
                  type="email"
                  className="form-input"
                  placeholder="tu@email.com"
                  autoComplete="email"
                />
                {errors.email && (
                  <p className="form-error">
                    <span className="text-error-400">⚠</span>
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  <span className="text-primary-400 mr-2">→</span>
                  Contraseña
                </label>
                <input
                  {...register('password')}
                  type="password"
                  className="form-input"
                  placeholder="Ingresa tu contraseña"
                  autoComplete="current-password"
                />
                {errors.password && (
                  <p className="form-error">
                    <span className="text-error-400">⚠</span>
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            {error && (
              <div className="card-error p-4 border border-error-500/30 rounded-lg">
                <p className="form-error">
                  <span className="text-error-400">❌</span>
                  {error}
                </p>
              </div>
            )}

            <div className="space-y-4">
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full btn-lg"
              >
                {isLoading ? (
                  <>
                    <div className="loading-spinner mr-3"></div>
                    Iniciando sesión...
                  </>
                ) : (
                  <>
                    <span className="mr-2">🚀</span>
                    Iniciar Sesión
                  </>
                )}
              </button>

              <div className="text-center pt-4 border-t border-secondary-600/30">
                <p className="text-body text-secondary-400 responsive-text">
                  ¿No tienes cuenta?{' '}
                  <button
                    type="button"
                    onClick={onSwitchToRegister}
                    className="text-primary-400 hover:text-primary-300 transition-colors font-medium hover-glow"
                  >
                    Regístrate aquí
                  </button>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}; 