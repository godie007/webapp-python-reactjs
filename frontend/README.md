# Frontend - API de Autenticación

Aplicación frontend construida con Vite + React + TypeScript que consume la API de autenticación.

## 🚀 Características

- **Vite** - Build tool rápido con hot reload
- **React 18** - Framework de UI
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de estilos
- **React Hook Form** - Manejo de formularios
- **Axios** - Cliente HTTP
- **Yup** - Validación de esquemas

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview
```

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env` en el directorio `frontend/`:

```env
VITE_API_URL=http://localhost:3000/api
```

### API Backend

Asegúrate de que el backend esté ejecutándose en `http://localhost:3000`

## 🎯 Funcionalidades

### Autenticación
- Formulario de login con validación
- Almacenamiento de token JWT en localStorage
- Redirección automática al dashboard
- Manejo de errores de autenticación

### Dashboard
- Información del usuario autenticado
- Lista de usuarios del sistema
- Estado de usuarios (activo/inactivo)
- Cerrar sesión

### UI/UX
- Diseño responsive con Tailwind CSS
- Loading states
- Manejo de errores
- Animaciones suaves

## 🏗️ Estructura del Proyecto

```
frontend/
├── src/
│   ├── components/     # Componentes React
│   │   ├── LoginForm.tsx
│   │   └── Dashboard.tsx
│   ├── services/       # Servicios de API
│   │   └── api.ts
│   ├── types/          # Tipos TypeScript
│   │   └── api.ts
│   ├── App.tsx         # Componente principal
│   ├── main.tsx        # Punto de entrada
│   └── index.css       # Estilos globales
├── public/             # Archivos estáticos
├── index.html          # HTML principal
├── package.json        # Dependencias
├── tailwind.config.js  # Configuración Tailwind
├── postcss.config.js   # Configuración PostCSS
├── tsconfig.json       # Configuración TypeScript
└── vite.config.ts      # Configuración Vite
```

## 🔌 Endpoints Consumidos

- `POST /api/login` - Autenticación
- `GET /api/protected` - Información del usuario
- `GET /api/users` - Lista de usuarios

## 🎨 Tecnologías Utilizadas

- **Vite** - Build tool y dev server
- **React** - Framework de UI
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de estilos
- **React Hook Form** - Manejo de formularios
- **Yup** - Validación de esquemas
- **Axios** - Cliente HTTP

## 🚀 Desarrollo

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 🔧 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Construir para producción
- `npm run preview` - Previsualizar build
- `npm run lint` - Linting con ESLint

## 📱 Responsive Design

La aplicación está completamente optimizada para:
- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)

## 🔒 Seguridad

- Tokens JWT almacenados en localStorage
- Interceptores de axios para manejo automático de tokens
- Redirección automática en caso de token expirado
- Validación de formularios en el frontend

## 🎯 Próximos Pasos

- [ ] Implementar refresh tokens
- [ ] Agregar más páginas (perfil, configuración)
- [ ] Implementar notificaciones toast
- [ ] Agregar tests unitarios
- [ ] Implementar PWA
