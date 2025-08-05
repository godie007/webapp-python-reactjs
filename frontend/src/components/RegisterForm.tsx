import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { apiService } from '../services/api';
import type { RegisterRequest } from '../types/api';
import { showToast } from './Toast';

const schema = yup.object({
  email: yup.string().email('Email inválido').required('El email es requerido'),
  username: yup.string().min(3, 'El usuario debe tener al menos 3 caracteres').required('El usuario es requerido'),
  password: yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es requerida'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Las contraseñas deben coincidir').required('Confirma tu contraseña'),
}).required();

interface RegisterFormProps {
  onRegisterSuccess: (token: string) => void;
  onSwitchToLogin: () => void;
}

export const RegisterForm = ({ onRegisterSuccess, onSwitchToLogin }: RegisterFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterRequest & { confirmPassword: string }>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegisterRequest & { confirmPassword: string }) => {
    setIsLoading(true);
    setError(null);
    
    console.log('🚀 Starting registration process...', { email: data.email, username: data.username });

    try {
      const { confirmPassword, ...registerData } = data;
      console.log('📤 Sending registration request...', registerData);
      
      const response = await apiService.register(registerData);
      console.log('📥 Registration response received:', response);
      
      // Verificar si requiere confirmación de email
      if (response.access_token === "" || response.message.includes("confirmar")) {
        console.log('✅ User created but email confirmation required');
        // Usuario creado pero requiere confirmación de email
        showToast.success(response.message);
        // Limpiar formulario y redirigir al login
        reset();
        onSwitchToLogin();
      } else {
        console.log('✅ User created and authenticated automatically');
        // Usuario creado y autenticado automáticamente
        localStorage.setItem('token', response.access_token);
        showToast.success('¡Usuario registrado exitosamente!');
        onRegisterSuccess(response.access_token);
      }
    } catch (err: any) {
      console.error('❌ Registration error:', err);
      console.error('❌ Error response:', err.response);
      console.error('❌ Error message:', err.message);
      
      const errorMessage = err.response?.data?.detail || err.message || 'Error al registrar usuario';
      console.error('❌ Final error message:', errorMessage);
      
      setError(errorMessage);
      showToast.error(errorMessage);
    } finally {
      console.log('🏁 Registration process finished');
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
                Crear Cuenta
              </h1>
              <p className="text-body text-secondary-300 responsive-text">
                Completa tus datos para registrarte
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
                <label htmlFor="username" className="form-label">
                  <span className="text-primary-400 mr-2">→</span>
                  Nombre de usuario
                </label>
                <input
                  {...register('username')}
                  type="text"
                  className="form-input"
                  placeholder="Tu nombre de usuario"
                  autoComplete="username"
                />
                {errors.username && (
                  <p className="form-error">
                    <span className="text-error-400">⚠</span>
                    {errors.username.message}
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
                  placeholder="Mínimo 6 caracteres"
                  autoComplete="new-password"
                />
                {errors.password && (
                  <p className="form-error">
                    <span className="text-error-400">⚠</span>
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">
                  <span className="text-primary-400 mr-2">→</span>
                  Confirmar contraseña
                </label>
                <input
                  {...register('confirmPassword')}
                  type="password"
                  className="form-input"
                  placeholder="Repite tu contraseña"
                  autoComplete="new-password"
                />
                {errors.confirmPassword && (
                  <p className="form-error">
                    <span className="text-error-400">⚠</span>
                    {errors.confirmPassword.message}
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
                    Creando cuenta...
                  </>
                ) : (
                  <>
                    <span className="mr-2">🚀</span>
                    Crear Cuenta
                  </>
                )}
              </button>

              <div className="text-center pt-4 border-t border-secondary-600/30">
                <p className="text-body text-secondary-400 responsive-text">
                  ¿Ya tienes cuenta?{' '}
                  <button
                    type="button"
                    onClick={onSwitchToLogin}
                    className="text-primary-400 hover:text-primary-300 transition-colors font-medium hover-glow"
                  >
                    Inicia sesión
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