// Tipos para autenticación
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  username: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface RegisterResponse {
  access_token: string;
  token_type: string;
  user: User;
  message: string;
}

export interface ProtectedResponse {
  message: string;
  user_info: User;
}

// Tipos para usuarios
export interface User {
  id: number;
  username: string;
  email: string;
  is_active: boolean;
  created_at?: string;
}

export interface UsersResponse {
  users: User[];
}

export interface ApiError {
  detail: string;
} 