from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, EmailStr
from typing import Optional, Dict, Any
import uvicorn
import os
from dotenv import load_dotenv
import hashlib
import time
import jwt
from datetime import datetime, timedelta

# Cargar variables de entorno
load_dotenv()

# Crear aplicación FastAPI
app = FastAPI(title="API de Autenticación", version="1.0.0")

# Configuración CORS mejorada
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite dev server
        "http://127.0.0.1:5173",  # Vite dev server (alternativo)
        "http://localhost:3000",   # Backend
        "http://127.0.0.1:3000",  # Backend (alternativo)
        "https://*.vercel.app",    # Vercel
        "https://vercel.app",      # Vercel
        "*"  # Temporal para desarrollo - REMOVER EN PRODUCCIÓN
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"],
    allow_headers=[
        "Accept",
        "Accept-Language",
        "Content-Language",
        "Content-Type",
        "Authorization",
        "X-Requested-With",
        "Origin",
        "Access-Control-Request-Method",
        "Access-Control-Request-Headers"
    ],
    expose_headers=["*"],
    max_age=86400,  # 24 horas
)

# Modelos Pydantic
class LoginRequest(BaseModel):
    email: str
    password: str

class RegisterRequest(BaseModel):
    email: EmailStr
    password: str
    username: str

class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    user: dict

class RegisterResponse(BaseModel):
    access_token: str
    token_type: str
    user: dict
    message: str

class ProtectedResponse(BaseModel):
    message: str
    user_info: dict

# Simulación de base de datos en memoria
users_db = {}

# Configuración JWT
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "your-secret-key-change-in-production")
JWT_ALGORITHM = "HS256"
JWT_ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_jwt_token(user_id: str, email: str, username: str) -> str:
    """Crear un token JWT real"""
    payload = {
        "sub": user_id,
        "email": email,
        "username": username,
        "exp": datetime.utcnow() + timedelta(minutes=JWT_ACCESS_TOKEN_EXPIRE_MINUTES),
        "iat": datetime.utcnow()
    }
    return jwt.encode(payload, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)

def verify_jwt_token(token: str) -> Optional[Dict[str, Any]]:
    """Verificar un token JWT real"""
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
        return {
            "id": payload["sub"],
            "email": payload["email"],
            "username": payload["username"],
            "is_active": True
        }
    except jwt.ExpiredSignatureError:
        print("Token expirado")
        return None
    except jwt.JWTError:
        print("Token inválido")
        return None
    except Exception as e:
        print(f"Error al verificar token: {e}")
        return None

security = HTTPBearer()

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    user = verify_jwt_token(token)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido o expirado",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user

@app.post("/api/register", response_model=RegisterResponse)
async def register(register_data: RegisterRequest):
    print(f"🔵 [REGISTER] Received registration request for email: {register_data.email}")
    
    # Simular registro exitoso
    user_id = "123"
    token = create_jwt_token(user_id, register_data.email, register_data.username)
    
    # Guardar en "base de datos" simulada
    users_db[register_data.email] = {
        "id": user_id,
        "email": register_data.email,
        "username": register_data.username,
        "password": register_data.password,  # En producción, esto estaría hasheado
        "is_active": True
    }
    
    return RegisterResponse(
        access_token=token,
        token_type="bearer",
        user={
            "id": user_id,
            "email": register_data.email,
            "username": register_data.username,
            "is_active": True
        },
        message="Usuario registrado exitosamente"
    )

@app.post("/api/login", response_model=LoginResponse)
async def login(login_data: LoginRequest):
    print(f"🔵 [LOGIN] Received login request for email: {login_data.email}")
    
    # Verificar credenciales simuladas
    if login_data.email == "diegof.e3@gmail.com" and login_data.password == "123456789":
        user_id = "123"
        token = create_jwt_token(user_id, login_data.email, "diegof.e3")
        
        return LoginResponse(
            access_token=token,
            token_type="bearer",
            user={
                "id": user_id,
                "email": login_data.email,
                "username": "diegof.e3",
                "is_active": True
            }
        )
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales inválidas"
        )

@app.get("/api/protected", response_model=ProtectedResponse)
async def get_protected_data(current_user: dict = Depends(get_current_user)):
    return ProtectedResponse(
        message=f"Hola {current_user['username']}, has accedido a datos protegidos",
        user_info={
            "id": current_user["id"],
            "username": current_user["username"],
            "email": current_user["email"],
            "is_active": current_user["is_active"]
        }
    )

@app.get("/api/users", response_model=dict)
async def get_users(current_user: dict = Depends(get_current_user)):
    try:
        return {"users": [current_user]}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@app.get("/api/health")
async def health_check():
    return {
        "status": "ok", 
        "message": "API funcionando correctamente con JWT", 
        "auth_mode": "JWT",
        "debug": {
            "users_registered": len(users_db),
            "framework": "fastapi",
            "jwt_algorithm": JWT_ALGORITHM,
            "jwt_expire_minutes": JWT_ACCESS_TOKEN_EXPIRE_MINUTES
        }
    }

@app.get("/api/test")
async def test_endpoint():
    return {"message": "Endpoint de prueba funcionando"}

@app.get("/")
async def root():
    return {
        "message": "API de Autenticación con JWT",
        "version": "1.0.0",
        "documentation": "/docs"
    }

if __name__ == "__main__":
    HOST = os.getenv("HOST", "0.0.0.0")
    PORT = int(os.getenv("PORT", "3000"))
    uvicorn.run("main:app", host=HOST, port=PORT, reload=True) 