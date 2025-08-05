# 📖 Guía de Desarrollo - WebApp Python

> **Guía completa para desarrolladores que quieren contribuir o extender el template**

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)](https://vercel.com/)

## 📋 Tabla de Contenidos

- [🎯 Introducción](#-introducción)
- [🛠️ Configuración del Entorno](#️-configuración-del-entorno)
- [🏗️ Arquitectura del Código](#️-arquitectura-del-código)
- [🎨 Frontend Development](#-frontend-development)
- [🔧 Backend Development](#-backend-development)
- [📊 Base de Datos](#-base-de-datos)
- [🧪 Testing](#-testing)
- [🔍 Debugging](#-debugging)
- [📦 Build y Deploy](#-build-y-deploy)
- [🤝 Contribución](#-contribución)

## 🎯 Introducción

Esta guía está diseñada para desarrolladores que quieren entender, extender o contribuir al template **WebApp Python**. Cubre todos los aspectos del desarrollo, desde la configuración inicial hasta el despliegue en producción.

### 🎯 Objetivos de la Guía

- ✅ **Entender la arquitectura** del proyecto
- ✅ **Configurar el entorno** de desarrollo
- ✅ **Desarrollar nuevas funcionalidades** siguiendo las mejores prácticas
- ✅ **Mantener la calidad** del código
- ✅ **Contribuir efectivamente** al proyecto

## 🛠️ Configuración del Entorno

### **Prerrequisitos del Sistema**

#### **Software Requerido**
```bash
# Node.js (versión LTS)
node --version  # >= 18.0.0

# Python (versión 3.9+)
python --version  # >= 3.9.0

# Git
git --version  # >= 2.30.0

# npm o yarn
npm --version  # >= 8.0.0
```

#### **Herramientas Recomendadas**
- **VS Code** con extensiones:
  - TypeScript and JavaScript Language Features
  - Python
  - Tailwind CSS IntelliSense
  - ESLint
  - Prettier
  - Auto Rename Tag
  - Bracket Pair Colorizer

### **Configuración Inicial**

#### **1. Clonar y Configurar**
```bash
# Clonar el repositorio
git clone https://github.com/your-username/webapp-python.git
cd webapp-python

# Instalar dependencias frontend
cd frontend
npm install

# Instalar dependencias backend
cd ../backend
pip install -r requirements.txt
```

#### **2. Variables de Entorno**
```bash
# Backend
cp backend/env.example backend/.env

# Frontend
cp frontend/.env.example frontend/.env
```

#### **3. Configurar Base de Datos**
```bash
# Crear base de datos local (opcional)
createdb webapp_python_dev

# O usar Supabase
# 1. Crear proyecto en Supabase
# 2. Obtener DATABASE_URL
# 3. Configurar en backend/.env
```

### **Scripts de Desarrollo**

#### **Scripts Frontend**
```bash
# Desarrollo
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run preview      # Preview del build
npm run lint         # Linting
npm run lint:fix     # Auto-fix linting
npm run type-check   # Verificación de tipos
```

#### **Scripts Backend**
```bash
# Desarrollo
python main.py       # Servidor de desarrollo
python -m pytest     # Ejecutar tests
python -m pytest --cov=app  # Tests con coverage
```

## 🏗️ Arquitectura del Código

### **Estructura del Proyecto**

```
webapp-python/
├── 📁 frontend/                    # Aplicación React
│   ├── 📁 src/
│   │   ├── 📁 components/          # Componentes reutilizables
│   │   │   ├── 📄 Header.tsx       # Header principal
│   │   │   ├── 📄 LoginForm.tsx    # Formulario de login
│   │   │   ├── 📄 RegisterForm.tsx # Formulario de registro
│   │   │   ├── 📄 Dashboard.tsx    # Dashboard principal
│   │   │   ├── 📄 UserProfile.tsx  # Perfil de usuario
│   │   │   └── 📄 Toast.tsx        # Notificaciones
│   │   ├── 📁 services/            # Servicios de API
│   │   │   └── 📄 api.ts           # Cliente HTTP
│   │   ├── 📁 types/               # Definiciones TypeScript
│   │   │   └── 📄 api.ts           # Tipos de API
│   │   ├── 📁 utils/               # Utilidades
│   │   ├── 📄 App.tsx              # Componente principal
│   │   ├── 📄 main.tsx             # Punto de entrada
│   │   └── 📄 index.css            # Estilos globales
│   ├── 📁 public/                  # Assets estáticos
│   ├── 📄 package.json             # Dependencias
│   ├── 📄 vite.config.ts           # Configuración Vite
│   ├── 📄 tailwind.config.js       # Configuración Tailwind
│   └── 📄 vercel.json              # Configuración Vercel
├── 📁 backend/                     # API FastAPI
│   ├── 📁 app/
│   │   ├── 📁 models/              # Modelos de datos
│   │   │   ├── 📄 auth_models.py   # Modelos de autenticación
│   │   │   └── 📄 user_models.py   # Modelos de usuario
│   │   ├── 📁 services/            # Lógica de negocio
│   │   │   ├── 📄 auth_service.py  # Servicio de auth
│   │   │   ├── 📄 token_service.py # Servicio de tokens
│   │   │   └── 📄 user_service.py  # Servicio de usuarios
│   │   ├── 📁 repositories/        # Acceso a datos
│   │   │   ├── 📄 auth_repository.py
│   │   │   └── 📄 user_repository.py
│   │   ├── 📁 utils/               # Utilidades
│   │   │   └── 📄 dependencies.py  # Dependencias FastAPI
│   │   └── 📄 main.py              # Aplicación principal
│   ├── 📄 requirements.txt          # Dependencias Python
│   └── 📄 main.py                  # Punto de entrada
└── 📁 docs/                        # Documentación
```

### **Patrones de Diseño**

#### **Frontend Patterns**
- **Component-Based Architecture**: Componentes reutilizables
- **Custom Hooks**: Lógica reutilizable
- **Service Layer**: Separación de lógica de negocio
- **Type Safety**: TypeScript para todo el código

#### **Backend Patterns**
- **Repository Pattern**: Acceso a datos abstracto
- **Service Layer**: Lógica de negocio
- **Dependency Injection**: Inyección de dependencias
- **Model-View-Controller**: Separación de responsabilidades

## 🎨 Frontend Development

### **Tecnologías Frontend**

#### **React 18 con TypeScript**
```typescript
// Ejemplo de componente funcional
interface UserProfileProps {
  user: User;
  onUpdate: (user: User) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  return (
    <div className="card-elevated">
      <h2 className="text-display">{user.name}</h2>
      {/* Componente JSX */}
    </div>
  );
};
```

#### **Tailwind CSS**
```css
/* Clases utilitarias */
.panel-elevated {
  @apply bg-white rounded-lg shadow-lg border border-gray-200 p-6;
}

.btn-primary {
  @apply bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors;
}
```

### **Gestión de Estado**

#### **React Hooks**
```typescript
// Custom hook para autenticación
const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      const response = await api.login(credentials);
      setUser(response.user);
      localStorage.setItem('token', response.token);
    } catch (error) {
      toast.error('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, login, logout };
};
```

#### **Context API**
```typescript
// AuthContext para estado global
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuth();
  
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};
```

### **Formularios y Validación**

#### **React Hook Form + Yup**
```typescript
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  email: yup.string().email('Email inválido').required('Email requerido'),
  password: yup.string().min(8, 'Mínimo 8 caracteres').required('Contraseña requerida'),
});

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data: LoginFormData) => {
    // Lógica de envío
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label className="form-label">Email</label>
        <input {...register('email')} className="form-input" />
        {errors.email && <span className="form-error">{errors.email.message}</span>}
      </div>
    </form>
  );
};
```

### **Ruteo y Navegación**

#### **React Router v6**
```typescript
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
```

## 🔧 Backend Development

### **FastAPI Framework**

#### **Estructura de Endpoints**
```python
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="WebApp Python API",
    description="API profesional para aplicaciones web",
    version="1.0.0"
)

# Configuración CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Endpoints
@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now()}

@app.post("/api/auth/login")
async def login(credentials: LoginRequest):
    # Lógica de autenticación
    pass
```

#### **Modelos Pydantic**
```python
from pydantic import BaseModel, EmailStr, validator
from typing import Optional

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    name: str
    
    @validator('password')
    def validate_password(cls, v):
        if len(v) < 8:
            raise ValueError('Password must be at least 8 characters')
        return v

class UserResponse(BaseModel):
    id: int
    email: str
    name: str
    created_at: datetime
    
    class Config:
        from_attributes = True
```

#### **Autenticación JWT**
```python
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt

security = HTTPBearer()

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(
            credentials.credentials, 
            JWT_SECRET, 
            algorithms=[JWT_ALGORITHM]
        )
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token"
            )
        return user_id
    except jwt.PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )

@app.get("/api/protected")
async def protected_route(current_user: int = Depends(get_current_user)):
    return {"message": "This is a protected route", "user_id": current_user}
```

### **Servicios y Lógica de Negocio**

#### **Service Layer Pattern**
```python
class AuthService:
    def __init__(self, user_repository: UserRepository):
        self.user_repository = user_repository
    
    async def authenticate_user(self, email: str, password: str) -> Optional[User]:
        user = await self.user_repository.get_by_email(email)
        if user and self.verify_password(password, user.password_hash):
            return user
        return None
    
    def create_access_token(self, user: User) -> str:
        payload = {
            "sub": str(user.id),
            "email": user.email,
            "exp": datetime.utcnow() + timedelta(hours=24)
        }
        return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
    
    def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        return bcrypt.verify(plain_password, hashed_password)
```

#### **Repository Pattern**
```python
class UserRepository:
    def __init__(self, db: Database):
        self.db = db
    
    async def create(self, user_data: UserCreate) -> User:
        query = """
            INSERT INTO users (email, password_hash, name, created_at)
            VALUES (:email, :password_hash, :name, :created_at)
            RETURNING id, email, name, created_at
        """
        values = {
            "email": user_data.email,
            "password_hash": self.hash_password(user_data.password),
            "name": user_data.name,
            "created_at": datetime.utcnow()
        }
        
        result = await self.db.fetch_one(query, values)
        return User(**result)
    
    async def get_by_email(self, email: str) -> Optional[User]:
        query = "SELECT * FROM users WHERE email = :email"
        result = await self.db.fetch_one(query, {"email": email})
        return User(**result) if result else None
```

## 📊 Base de Datos

### **Supabase Integration**

#### **Configuración**
```python
# backend/app/config/database.py
from supabase import create_client, Client
from os import getenv

SUPABASE_URL = getenv("SUPABASE_URL")
SUPABASE_KEY = getenv("SUPABASE_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
```

#### **Modelos de Base de Datos**
```sql
-- Tabla de usuarios
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);
```

#### **Operaciones de Base de Datos**
```python
class UserRepository:
    def __init__(self, supabase: Client):
        self.supabase = supabase
    
    async def create_user(self, user_data: UserCreate) -> User:
        response = self.supabase.table('users').insert({
            'email': user_data.email,
            'password_hash': self.hash_password(user_data.password),
            'name': user_data.name
        }).execute()
        
        return User(**response.data[0])
    
    async def get_user_by_email(self, email: str) -> Optional[User]:
        response = self.supabase.table('users').select('*').eq('email', email).execute()
        return User(**response.data[0]) if response.data else None
```

## 🧪 Testing

### **Frontend Testing**

#### **Jest + React Testing Library**
```typescript
// __tests__/components/LoginForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginForm } from '../LoginForm';

describe('LoginForm', () => {
  it('should render login form', () => {
    render(<LoginForm onLoginSuccess={jest.fn()} />);
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('should show validation errors', async () => {
    render(<LoginForm onLoginSuccess={jest.fn()} />);
    
    const submitButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    });
  });
});
```

#### **Testing de Hooks**
```typescript
// __tests__/hooks/useAuth.test.ts
import { renderHook, act } from '@testing-library/react';
import { useAuth } from '../useAuth';

describe('useAuth', () => {
  it('should initialize with null user', () => {
    const { result } = renderHook(() => useAuth());
    
    expect(result.current.user).toBeNull();
    expect(result.current.loading).toBe(true);
  });

  it('should login user successfully', async () => {
    const { result } = renderHook(() => useAuth());
    
    await act(async () => {
      await result.current.login({ email: 'test@example.com', password: 'password' });
    });
    
    expect(result.current.user).toBeTruthy();
    expect(result.current.loading).toBe(false);
  });
});
```

### **Backend Testing**

#### **pytest + FastAPI TestClient**
```python
# tests/test_auth.py
import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_login_success():
    response = client.post("/api/auth/login", json={
        "email": "test@example.com",
        "password": "password123"
    })
    assert response.status_code == 200
    assert "access_token" in response.json()

def test_login_invalid_credentials():
    response = client.post("/api/auth/login", json={
        "email": "test@example.com",
        "password": "wrongpassword"
    })
    assert response.status_code == 401
```

#### **Testing de Servicios**
```python
# tests/test_services.py
import pytest
from app.services.auth_service import AuthService
from app.repositories.user_repository import UserRepository

@pytest.fixture
def auth_service():
    user_repo = UserRepository()
    return AuthService(user_repo)

def test_authenticate_user_success(auth_service):
    # Arrange
    email = "test@example.com"
    password = "password123"
    
    # Act
    user = auth_service.authenticate_user(email, password)
    
    # Assert
    assert user is not None
    assert user.email == email

def test_authenticate_user_invalid_password(auth_service):
    # Arrange
    email = "test@example.com"
    password = "wrongpassword"
    
    # Act
    user = auth_service.authenticate_user(email, password)
    
    # Assert
    assert user is None
```

## 🔍 Debugging

### **Frontend Debugging**

#### **React Developer Tools**
```bash
# Instalar extensión en Chrome/Firefox
# React Developer Tools
# Redux DevTools (si usas Redux)
```

#### **Console Debugging**
```typescript
// Debugging con console
console.log('User data:', user);
console.table(users); // Para arrays de objetos
console.group('API Response'); // Para agrupar logs
console.log(response);
console.groupEnd();
```

#### **React DevTools Profiler**
```typescript
// Profiling de componentes
import { Profiler } from 'react';

const onRenderCallback = (id, phase, actualDuration) => {
  console.log(`Component ${id} took ${actualDuration}ms to render`);
};

<Profiler id="UserProfile" onRender={onRenderCallback}>
  <UserProfile user={user} />
</Profiler>
```

### **Backend Debugging**

#### **FastAPI Debug Mode**
```python
# main.py
import uvicorn

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=3000,
        reload=True,  # Auto-reload en desarrollo
        debug=True    # Debug mode
    )
```

#### **Logging Avanzado**
```python
import logging
from fastapi import Request

# Configurar logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.info(f"Request: {request.method} {request.url}")
    response = await call_next(request)
    logger.info(f"Response: {response.status_code}")
    return response

@app.post("/api/auth/login")
async def login(credentials: LoginRequest):
    logger.debug(f"Login attempt for email: {credentials.email}")
    # ... lógica de login
```

## 📦 Build y Deploy

### **Frontend Build**

#### **Configuración de Vite**
```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
        },
      },
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
```

#### **Optimización de Build**
```bash
# Build de producción
npm run build

# Analizar bundle
npm run build -- --analyze

# Preview del build
npm run preview
```

### **Backend Build**

#### **Requirements.txt**
```txt
fastapi==0.100.0
uvicorn[standard]==0.23.0
pydantic==2.0.0
python-jose[cryptography]==3.3.0
python-multipart==0.0.6
python-dotenv==1.0.0
supabase==1.0.3
pytest==7.4.0
pytest-asyncio==0.21.1
```

#### **Docker Support**
```dockerfile
# Dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### **Vercel Deployment**

#### **Configuración de Vercel**
```json
// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "backend/main.py",
      "use": "@vercel/python",
      "config": {
        "maxLambdaSize": "15mb",
        "runtime": "python3.9"
      }
    },
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "backend/main.py"
    },
    {
      "src": "/(.*)",
      "dest": "frontend/$1"
    }
  ]
}
```

## 🤝 Contribución

### **Flujo de Trabajo**

#### **1. Fork y Clone**
```bash
# Fork el repositorio en GitHub
# Clone tu fork
git clone https://github.com/your-username/webapp-python.git
cd webapp-python

# Agregar upstream
git remote add upstream https://github.com/original-owner/webapp-python.git
```

#### **2. Crear Feature Branch**
```bash
# Actualizar main
git checkout main
git pull upstream main

# Crear feature branch
git checkout -b feature/nueva-funcionalidad
```

#### **3. Desarrollo**
```bash
# Hacer cambios
# Ejecutar tests
npm run test
python -m pytest

# Commit con conventional commits
git commit -m "feat: add user profile component"
```

#### **4. Pull Request**
```bash
# Push a tu fork
git push origin feature/nueva-funcionalidad

# Crear Pull Request en GitHub
```

### **Estándares de Código**

#### **TypeScript/JavaScript**
```typescript
// ESLint configuration
{
  "extends": [
    "@typescript-eslint/recommended",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": "warn"
  }
}
```

#### **Python**
```python
# .flake8 configuration
[flake8]
max-line-length = 88
extend-ignore = E203, W503
exclude = .git,__pycache__,build,dist
```

### **Conventional Commits**
```bash
# Estructura: <type>(<scope>): <description>

# Ejemplos:
feat: add user authentication
fix: resolve CORS issue
docs: update API documentation
style: improve button styling
refactor: optimize database queries
test: add unit tests for auth service
chore: update dependencies
```

---

## 📚 Recursos Adicionales

### **Documentación Oficial**
- [React Documentation](https://react.dev/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)

### **Herramientas Útiles**
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [Tailwind CSS Playground](https://play.tailwindcss.com/)
- [Postman](https://www.postman.com/) - Testing de APIs
- [Insomnia](https://insomnia.rest/) - Cliente REST

### **Comunidad**
- [React Community](https://reactjs.org/community)
- [FastAPI Community](https://github.com/tiangolo/fastapi)
- [Vercel Community](https://github.com/vercel/vercel)

---

**¡Gracias por contribuir al proyecto! 🚀** 