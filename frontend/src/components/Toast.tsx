import { toast } from 'react-hot-toast';

// Configuración personalizada para los toasts con el nuevo sistema de diseño
const baseConfig = {
  duration: 4000,
  position: 'top-right' as const,
  style: {
    background: 'rgba(15, 23, 42, 0.95)',
    color: '#f8fafc',
    border: '1px solid rgba(148, 163, 184, 0.2)',
    borderRadius: '12px',
    fontFamily: 'Inter, system-ui, sans-serif',
    fontSize: '14px',
    padding: '16px 20px',
    boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 2px 10px -2px rgba(0, 0, 0, 0.05)',
    backdropFilter: 'blur(10px)',
  },
};

const successConfig = {
  ...baseConfig,
  iconTheme: {
    primary: '#22c55e',
    secondary: '#0f172a',
  },
  style: {
    ...baseConfig.style,
    border: '1px solid rgba(34, 197, 94, 0.3)',
    background: 'rgba(15, 23, 42, 0.95)',
    boxShadow: '0 10px 40px -10px rgba(34, 197, 94, 0.2), 0 2px 10px -2px rgba(0, 0, 0, 0.05)',
  },
};

const errorConfig = {
  ...baseConfig,
  iconTheme: {
    primary: '#ef4444',
    secondary: '#0f172a',
  },
  style: {
    ...baseConfig.style,
    border: '1px solid rgba(239, 68, 68, 0.3)',
    background: 'rgba(15, 23, 42, 0.95)',
    boxShadow: '0 10px 40px -10px rgba(239, 68, 68, 0.2), 0 2px 10px -2px rgba(0, 0, 0, 0.05)',
  },
};

const warningConfig = {
  ...baseConfig,
  iconTheme: {
    primary: '#f59e0b',
    secondary: '#0f172a',
  },
  style: {
    ...baseConfig.style,
    border: '1px solid rgba(245, 158, 11, 0.3)',
    background: 'rgba(15, 23, 42, 0.95)',
    boxShadow: '0 10px 40px -10px rgba(245, 158, 11, 0.2), 0 2px 10px -2px rgba(0, 0, 0, 0.05)',
  },
};

const infoConfig = {
  ...baseConfig,
  iconTheme: {
    primary: '#0ea5e9',
    secondary: '#0f172a',
  },
  style: {
    ...baseConfig.style,
    border: '1px solid rgba(14, 165, 233, 0.3)',
    background: 'rgba(15, 23, 42, 0.95)',
    boxShadow: '0 10px 40px -10px rgba(14, 165, 233, 0.2), 0 2px 10px -2px rgba(0, 0, 0, 0.05)',
  },
};

export const showToast = {
  success: (message: string) => toast.success(message, successConfig),
  error: (message: string) => toast.error(message, errorConfig),
  warning: (message: string) => toast(message, { ...warningConfig, icon: '⚠️' }),
  info: (message: string) => toast(message, { ...infoConfig, icon: 'ℹ️' }),
  loading: (message: string) => toast.loading(message, baseConfig),
  dismiss: () => toast.dismiss(),
}; 