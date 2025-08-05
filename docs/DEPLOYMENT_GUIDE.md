# 🚀 Guía de Despliegue - WebApp Python

> **Guía completa para desplegar tu aplicación en Vercel y configurar todos los servicios**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/webapp-python)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)](https://vercel.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat&logo=supabase&logoColor=white)](https://supabase.com/)

## 📋 Tabla de Contenidos

- [🎯 Introducción](#-introducción)
- [☁️ Despliegue en Vercel](#️-despliegue-en-vercel)
- [🗄️ Configuración de Supabase](#️-configuración-de-supabase)
- [🔧 Variables de Entorno](#-variables-de-entorno)
- [📊 Monitoreo y Analytics](#-monitoreo-y-analytics)
- [🔒 Seguridad](#-seguridad)
- [🚀 Optimización de Performance](#-optimización-de-performance)
- [🛠️ Troubleshooting](#-troubleshooting)
- [📚 Recursos Adicionales](#-recursos-adicionales)

## 🎯 Introducción

Esta guía te llevará paso a paso a través del proceso de despliegue de tu aplicación **WebApp Python** en Vercel, incluyendo la configuración de Supabase y todas las optimizaciones necesarias para un entorno de producción.

### 🎯 Objetivos del Despliegue

- ✅ **Despliegue Automático** con Vercel
- ✅ **Base de Datos** configurada en Supabase
- ✅ **Variables de Entorno** seguras
- ✅ **Performance** optimizada
- ✅ **Monitoreo** implementado
- ✅ **SSL/HTTPS** automático

## ☁️ Despliegue en Vercel

### **Método 1: Despliegue Automático (Recomendado)**

#### **1. Conectar con GitHub**
```bash
# 1. Ve a https://vercel.com/dashboard
# 2. Haz clic en "New Project"
# 3. Importa tu repositorio de GitHub
# 4. Vercel detectará automáticamente la configuración
```

#### **2. Configurar Variables de Entorno**
```bash
# En Vercel Dashboard > Settings > Environment Variables

# Backend Variables
JWT_SECRET=tu_jwt_secret_super_seguro_produccion
JWT_ALGORITHM=HS256
JWT_EXPIRATION=3600
DATABASE_URL=postgresql://user:password@host:port/database
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_KEY=tu_supabase_anon_key
ALLOWED_ORIGINS=https://tu-app.vercel.app

# Frontend Variables
VITE_API_BASE_URL=https://tu-app.vercel.app/api
VITE_APP_NAME=WebApp Python
VITE_ENVIRONMENT=production
```

#### **3. Configurar Build Settings**
```json
// En Vercel Dashboard > Settings > General

// Build Command
npm run build

// Output Directory
dist

// Install Command
npm install

// Root Directory
frontend
```

### **Método 2: Despliegue Manual**

#### **1. Instalar Vercel CLI**
```bash
# Instalar Vercel CLI globalmente
npm install -g vercel

# O usar npx
npx vercel --version
```

#### **2. Autenticación**
```bash
# Login a Vercel
vercel login

# O con npx
npx vercel login
```

#### **3. Desplegar**
```bash
# Desde la raíz del proyecto
npx vercel --prod

# O para desarrollo
npx vercel
```

### **Configuración de Vercel**

#### **vercel.json (Raíz del Proyecto)**
```json
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
  ],
  "functions": {
    "backend/main.py": {
      "maxDuration": 30
    }
  }
}
```

#### **vercel.json (Frontend)**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

## 🗄️ Configuración de Supabase

### **1. Crear Proyecto en Supabase**

#### **Paso a Paso**
```bash
# 1. Ve a https://supabase.com
# 2. Crea una cuenta o inicia sesión
# 3. Haz clic en "New Project"
# 4. Completa la información del proyecto:
#    - Name: webapp-python
#    - Database Password: (genera una segura)
#    - Region: (selecciona la más cercana)
# 5. Haz clic en "Create new project"
```

### **2. Configurar Base de Datos**

#### **SQL para Crear Tablas**
```sql
-- Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabla de usuarios
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de sesiones (opcional)
CREATE TABLE sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índices para performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);
CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_sessions_expires_at ON sessions(expires_at);

-- Función para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at automáticamente
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
```

### **3. Configurar Row Level Security (RLS)**

#### **Políticas de Seguridad**
```sql
-- Habilitar RLS en todas las tablas
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

-- Política para usuarios (solo pueden ver su propio perfil)
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid()::text = id::text);

-- Política para sesiones
CREATE POLICY "Users can manage own sessions" ON sessions
    FOR ALL USING (auth.uid()::text = user_id::text);
```

### **4. Obtener Credenciales**

#### **Configuración del Proyecto**
```bash
# En Supabase Dashboard > Settings > API

# Project URL
https://tu-proyecto.supabase.co

# anon/public key
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# service_role key (mantener secreto)
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 🔧 Variables de Entorno

### **Variables de Producción**

#### **Backend (.env)**
```env
# JWT Configuration
JWT_SECRET=tu_jwt_secret_super_seguro_produccion_minimo_32_caracteres
JWT_ALGORITHM=HS256
JWT_EXPIRATION=3600

# Database (Supabase)
DATABASE_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres
SUPABASE_URL=https://[project-ref].supabase.co
SUPABASE_KEY=tu_supabase_anon_key

# CORS
ALLOWED_ORIGINS=https://tu-app.vercel.app,https://tu-dominio.com

# Environment
ENVIRONMENT=production
DEBUG=false
LOG_LEVEL=INFO

# Security
BCRYPT_ROUNDS=12
```

#### **Frontend (.env)**
```env
# API Configuration
VITE_API_BASE_URL=https://tu-app.vercel.app/api
VITE_APP_NAME=WebApp Python
VITE_APP_VERSION=1.0.0

# Environment
VITE_ENVIRONMENT=production
VITE_DEBUG=false

# Analytics (opcional)
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
VITE_SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
```

### **Generar JWT Secret Seguro**

#### **Método 1: Python**
```python
import secrets
import string

# Generar secret de 64 caracteres
alphabet = string.ascii_letters + string.digits + string.punctuation
jwt_secret = ''.join(secrets.choice(alphabet) for i in range(64))
print(f"JWT_SECRET={jwt_secret}")
```

#### **Método 2: Node.js**
```javascript
const crypto = require('crypto');
const jwt_secret = crypto.randomBytes(32).toString('hex');
console.log(`JWT_SECRET=${jwt_secret}`);
```

#### **Método 3: Online**
```bash
# Usar un generador online seguro
# https://generate-secret.vercel.app/64
```

## 📊 Monitoreo y Analytics

### **Vercel Analytics**

#### **Configuración Automática**
```bash
# Vercel Analytics se configura automáticamente
# Ve a Vercel Dashboard > Analytics para ver métricas
```

#### **Métricas Disponibles**
- **Page Views**: Vistas de página
- **Unique Visitors**: Visitantes únicos
- **Top Pages**: Páginas más visitadas
- **Performance**: Métricas de performance
- **Errors**: Errores de la aplicación

### **Google Analytics**

#### **Configuración**
```html
<!-- En public/index.html -->
<head>
  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>
</head>
```

#### **Tracking en React**
```typescript
// utils/analytics.ts
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const trackEvent = (action: string, category: string, label?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
    });
  }
};

// Uso en componentes
import { trackEvent } from '../utils/analytics';

const LoginForm = () => {
  const handleLogin = async (data: LoginFormData) => {
    try {
      await login(data);
      trackEvent('login', 'authentication', 'success');
    } catch (error) {
      trackEvent('login', 'authentication', 'error');
    }
  };
};
```

### **Error Tracking con Sentry**

#### **Configuración Frontend**
```typescript
// main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    new Sentry.BrowserTracing(),
    new Sentry.Replay(),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
```

#### **Configuración Backend**
```python
# main.py
import sentry_sdk
from sentry_sdk.integrations.fastapi import FastApiIntegration

sentry_sdk.init(
    dsn=os.getenv("SENTRY_DSN"),
    integrations=[FastApiIntegration()],
    traces_sample_rate=1.0,
    environment=os.getenv("ENVIRONMENT", "development"),
)
```

## 🔒 Seguridad

### **Headers de Seguridad**

#### **Configuración en Vercel**
```json
// vercel.json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        }
      ]
    }
  ]
}
```

### **CORS Configuration**

#### **Backend CORS**
```python
# main.py
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://tu-app.vercel.app",
        "https://tu-dominio.com",
        "http://localhost:5173",  # Solo desarrollo
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=[
        "Accept",
        "Accept-Language",
        "Content-Language",
        "Content-Type",
        "Authorization",
        "X-Requested-With",
    ],
    expose_headers=["*"],
    max_age=86400,
)
```

### **Rate Limiting**

#### **Implementación con FastAPI**
```python
# utils/rate_limiter.py
from fastapi import HTTPException, Request
import time
from collections import defaultdict

class RateLimiter:
    def __init__(self, requests_per_minute: int = 60):
        self.requests_per_minute = requests_per_minute
        self.requests = defaultdict(list)
    
    def check_rate_limit(self, request: Request):
        client_ip = request.client.host
        now = time.time()
        
        # Limpiar requests antiguos
        self.requests[client_ip] = [
            req_time for req_time in self.requests[client_ip]
            if now - req_time < 60
        ]
        
        # Verificar límite
        if len(self.requests[client_ip]) >= self.requests_per_minute:
            raise HTTPException(
                status_code=429,
                detail="Too many requests"
            )
        
        # Agregar request actual
        self.requests[client_ip].append(now)

rate_limiter = RateLimiter()

@app.middleware("http")
async def rate_limit_middleware(request: Request, call_next):
    rate_limiter.check_rate_limit(request)
    response = await call_next(request)
    return response
```

## 🚀 Optimización de Performance

### **Frontend Optimizations**

#### **Code Splitting**
```typescript
// App.tsx
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./components/Dashboard'));
const UserProfile = lazy(() => import('./components/UserProfile'));

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Dashboard />
    </Suspense>
  );
};
```

#### **Image Optimization**
```typescript
// Componente de imagen optimizada
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({ src, alt, className }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className={`image-container ${className}`}>
      {isLoading && <div className="image-skeleton" />}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoading(false)}
        onError={() => setError(true)}
        className={`optimized-image ${isLoading ? 'hidden' : ''}`}
      />
      {error && <div className="image-error">Error loading image</div>}
    </div>
  );
};
```

#### **Service Worker (PWA)**
```typescript
// public/sw.js
const CACHE_NAME = 'webapp-python-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
```

### **Backend Optimizations**

#### **Database Connection Pooling**
```python
# utils/database.py
import asyncpg
from contextlib import asynccontextmanager

class DatabasePool:
    def __init__(self):
        self.pool = None
    
    async def create_pool(self):
        self.pool = await asyncpg.create_pool(
            os.getenv("DATABASE_URL"),
            min_size=5,
            max_size=20,
            command_timeout=60,
            statement_timeout=60,
        )
    
    @asynccontextmanager
    async def get_connection(self):
        if not self.pool:
            await self.create_pool()
        async with self.pool.acquire() as connection:
            yield connection

db_pool = DatabasePool()
```

#### **Caching con Redis**
```python
# utils/cache.py
import redis
import json
from typing import Optional, Any

class Cache:
    def __init__(self):
        self.redis = redis.Redis(
            host=os.getenv("REDIS_HOST", "localhost"),
            port=int(os.getenv("REDIS_PORT", 6379)),
            db=0,
            decode_responses=True
        )
    
    async def get(self, key: str) -> Optional[Any]:
        value = self.redis.get(key)
        return json.loads(value) if value else None
    
    async def set(self, key: str, value: Any, expire: int = 3600):
        self.redis.setex(key, expire, json.dumps(value))
    
    async def delete(self, key: str):
        self.redis.delete(key)

cache = Cache()

# Uso en endpoints
@app.get("/api/users/{user_id}")
async def get_user(user_id: int):
    # Intentar obtener del cache
    cached_user = await cache.get(f"user:{user_id}")
    if cached_user:
        return cached_user
    
    # Si no está en cache, obtener de DB
    user = await user_repository.get_by_id(user_id)
    if user:
        await cache.set(f"user:{user_id}", user.dict())
    
    return user
```

## 🛠️ Troubleshooting

### **Problemas Comunes**

#### **1. Error de Build**
```bash
# Verificar logs de build
vercel logs

# Build local para debug
npm run build

# Verificar dependencias
npm install
```

#### **2. Error de CORS**
```bash
# Verificar configuración CORS en backend
# Asegurar que las URLs estén en allow_origins
# Verificar que el frontend use la URL correcta
```

#### **3. Error de Base de Datos**
```bash
# Verificar variables de entorno
echo $DATABASE_URL

# Probar conexión
psql $DATABASE_URL -c "SELECT 1;"

# Verificar permisos en Supabase
```

#### **4. Error de JWT**
```bash
# Verificar JWT_SECRET
echo $JWT_SECRET

# Verificar formato del token
# Usar jwt.io para debug
```

### **Comandos de Debug**

#### **Vercel CLI**
```bash
# Ver deployments
vercel ls

# Ver logs
vercel logs

# Ver variables de entorno
vercel env ls

# Pull variables de entorno
vercel env pull .env.local
```

#### **Supabase CLI**
```bash
# Instalar Supabase CLI
npm install -g supabase

# Login
supabase login

# Inicializar proyecto
supabase init

# Ver logs
supabase logs
```

## 📚 Recursos Adicionales

### **Documentación Oficial**
- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [FastAPI Deployment](https://fastapi.tiangolo.com/deployment/)
- [React Deployment](https://create-react-app.dev/docs/deployment/)

### **Herramientas Útiles**
- [Vercel CLI](https://vercel.com/docs/cli)
- [Supabase CLI](https://supabase.com/docs/reference/cli)
- [Postman](https://www.postman.com/) - Testing APIs
- [Insomnia](https://insomnia.rest/) - API Client

### **Monitoreo y Analytics**
- [Vercel Analytics](https://vercel.com/analytics)
- [Google Analytics](https://analytics.google.com/)
- [Sentry](https://sentry.io/) - Error Tracking
- [LogRocket](https://logrocket.com/) - Session Replay

---

## 🎉 ¡Despliegue Exitoso!

Una vez completado el despliegue, tu aplicación estará disponible en:

- **Frontend**: https://tu-app.vercel.app
- **API**: https://tu-app.vercel.app/api
- **Documentación**: https://tu-app.vercel.app/docs

### **Próximos Pasos**
1. ✅ Configurar dominio personalizado
2. ✅ Implementar CI/CD completo
3. ✅ Configurar backups automáticos
4. ✅ Implementar monitoreo avanzado
5. ✅ Optimizar performance

**¡Tu aplicación está lista para producción! 🚀** 