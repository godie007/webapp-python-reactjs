import axios from 'axios';
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, ProtectedResponse, UsersResponse } from '../types/api';

// Configurar la URL base según el entorno
const API_BASE_URL = import.meta.env.PROD 
  ? '/api'  // En producción, usar rutas relativas
  : 'http://localhost:3000/api'; // En desarrollo, usar localhost

// Crear instancia de axios
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token a las peticiones
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Solo redirigir si no estamos en el proceso de login
    if (error.response?.status === 401 && !error.config.url?.includes('/login') && !error.config.url?.includes('/register')) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const apiService = {
  // Registro
  register: async (userData: RegisterRequest): Promise<RegisterResponse> => {
    console.log('🌐 API Service: Making registration request to /register');
    console.log('🌐 API Service: Request data:', userData);
    console.log('🌐 API Service: Base URL:', API_BASE_URL);
    
    try {
      const response = await apiClient.post<RegisterResponse>('/register', userData);
      console.log('🌐 API Service: Registration successful:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('🌐 API Service: Registration failed:', error);
      console.error('🌐 API Service: Error response:', error.response);
      throw error;
    }
  },

  // Login
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/login', credentials);
    return response.data;
  },

  // Obtener información protegida
  getProtectedData: async (): Promise<ProtectedResponse> => {
    const response = await apiClient.get<ProtectedResponse>('/protected');
    return response.data;
  },

  // Obtener todos los usuarios
  getUsers: async (): Promise<UsersResponse> => {
    const response = await apiClient.get<UsersResponse>('/users');
    return response.data;
  },

  // Health check
  healthCheck: async (): Promise<any> => {
    const response = await apiClient.get('/health');
    return response.data;
  },
};

export default apiClient; 