# Guía de Despliegue en Vercel

## Configuración del Proyecto

Este proyecto está configurado para desplegarse en Vercel con:
- **Backend**: FastAPI con Python
- **Frontend**: React + Vite + TypeScript

## Pasos para el Despliegue

### 1. Preparación del Proyecto

Asegúrate de que tu proyecto esté en un repositorio de GitHub, GitLab o Bitbucket.

### 2. Configuración de Variables de Entorno

En el dashboard de Vercel, configura las siguientes variables de entorno:

```bash
SUPABASE_URL=tu_url_de_supabase
SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
FRONTEND_URL=https://tu-app.vercel.app
HOST=0.0.0.0
PORT=3000
```

### 3. Despliegue en Vercel

#### Opción A: Despliegue desde el Dashboard de Vercel

1. Ve a [vercel.com](https://vercel.com) y crea una cuenta
2. Haz clic en "New Project"
3. Importa tu repositorio de GitHub/GitLab/Bitbucket
4. Vercel detectará automáticamente la configuración
5. Configura las variables de entorno en la sección "Environment Variables"
6. Haz clic en "Deploy"

#### Opción B: Despliegue desde la Línea de Comandos

1. Instala Vercel CLI:
```bash
npm i -g vercel
```

2. Inicia sesión:
```bash
vercel login
```

3. Despliega el proyecto:
```bash
vercel
```

### 4. Configuración de Supabase

Asegúrate de que tu proyecto de Supabase esté configurado correctamente:

1. Crea un proyecto en [supabase.com](https://supabase.com)
2. Obtén las credenciales de tu proyecto:
   - URL del proyecto
   - Clave anónima (anon key)
3. Configura las variables de entorno en Vercel con estos valores

### 5. Verificación del Despliegue

Una vez desplegado, verifica que:

1. **Backend funcione**: Visita `https://tu-app.vercel.app/api/health`
2. **Frontend funcione**: Visita `https://tu-app.vercel.app`
3. **Autenticación funcione**: Prueba registrar e iniciar sesión

## Estructura del Proyecto

```
webapp_python/
├── backend/
│   ├── main.py              # Aplicación FastAPI
│   ├── requirements.txt      # Dependencias de Python
│   └── api/
│       └── index.py         # Punto de entrada para Vercel
├── frontend/
│   ├── package.json         # Dependencias de Node.js
│   ├── vite.config.ts       # Configuración de Vite
│   └── vercel.json          # Configuración específica del frontend
├── vercel.json              # Configuración principal de Vercel
└── env.example              # Variables de entorno de ejemplo
```

## Configuración de Rutas

El archivo `vercel.json` está configurado para:

- **Rutas `/api/*`**: Se dirigen al backend (FastAPI)
- **Rutas `/*`**: Se dirigen al frontend (React)

## Solución de Problemas Comunes

### Error: "Module not found"
- Verifica que todas las dependencias estén en `requirements.txt` (backend) y `package.json` (frontend)

### Error de CORS
- Asegúrate de que `FRONTEND_URL` esté configurado correctamente
- Verifica que las rutas de CORS incluyan tu dominio de Vercel

### Error de Supabase
- Verifica que `SUPABASE_URL` y `SUPABASE_ANON_KEY` estén configurados
- Asegúrate de que tu proyecto de Supabase esté activo

### Error de Build
- Verifica que el comando de build en `package.json` sea correcto
- Revisa los logs de build en el dashboard de Vercel

## Comandos Útiles

```bash
# Desplegar a producción
vercel --prod

# Desplegar a preview
vercel

# Ver logs
vercel logs

# Listar deployments
vercel ls
```

## Notas Importantes

1. **Variables de Entorno**: Nunca subas archivos `.env` al repositorio
2. **Supabase**: Asegúrate de que tu proyecto de Supabase esté en la misma región que tu despliegue
3. **CORS**: Las configuraciones de CORS están optimizadas para Vercel
4. **Build**: El frontend se construye automáticamente durante el despliegue

## Soporte

Si encuentras problemas:
1. Revisa los logs en el dashboard de Vercel
2. Verifica las variables de entorno
3. Prueba el proyecto localmente antes del despliegue
4. Consulta la documentación de Vercel y Supabase 