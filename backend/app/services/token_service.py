from abc import ABC, abstractmethod
from datetime import datetime, timedelta
from typing import Dict, Any, Optional
from jose import JWTError, jwt
from app.config.settings import get_settings

class ITokenStrategy(ABC):
    """
    Interfaz para estrategias de generación de tokens
    """
    @abstractmethod
    def create_token(self, data: Dict[str, Any], expires_delta: Optional[timedelta] = None) -> str:
        """Crear token usando la estrategia específica"""
        pass
    
    @abstractmethod
    def verify_token(self, token: str) -> Dict[str, Any]:
        """Verificar token usando la estrategia específica"""
        pass

class JWTTokenStrategy(ITokenStrategy):
    """
    Estrategia para tokens JWT
    """
    def __init__(self):
        self.settings = get_settings()
    
    def create_token(self, data: Dict[str, Any], expires_delta: Optional[timedelta] = None) -> str:
        """Crear token JWT"""
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.utcnow() + expires_delta
        else:
            expire = datetime.utcnow() + timedelta(minutes=self.settings.access_token_expire_minutes)
        
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, self.settings.secret_key, algorithm=self.settings.algorithm)
        return encoded_jwt
    
    def verify_token(self, token: str) -> Dict[str, Any]:
        """Verificar token JWT"""
        try:
            payload = jwt.decode(token, self.settings.secret_key, algorithms=[self.settings.algorithm])
            return payload
        except JWTError:
            raise ValueError("Token inválido")

class TokenService:
    """
    Servicio de tokens usando el patrón Factory y Strategy
    """
    def __init__(self, strategy: ITokenStrategy = None):
        self.strategy = strategy or JWTTokenStrategy()
        self.settings = get_settings()
    
    def create_access_token(self, data: Dict[str, Any], expires_delta: Optional[timedelta] = None) -> str:
        """Crear token de acceso"""
        return self.strategy.create_token(data, expires_delta)
    
    def verify_token(self, token: str) -> Dict[str, Any]:
        """Verificar token"""
        return self.strategy.verify_token(token)
    
    def create_user_token(self, username: str, expires_delta: Optional[timedelta] = None) -> str:
        """Crear token para usuario específico"""
        data = {"sub": username}
        if expires_delta:
            return self.create_access_token(data, expires_delta)
        else:
            return self.create_access_token(data, timedelta(minutes=self.settings.access_token_expire_minutes))
    
    def get_token_payload(self, token: str) -> Dict[str, Any]:
        """Obtener payload del token"""
        return self.verify_token(token)
    
    def get_username_from_token(self, token: str) -> str:
        """Obtener nombre de usuario desde token"""
        payload = self.get_token_payload(token)
        username = payload.get("sub")
        if username is None:
            raise ValueError("Token no contiene información de usuario")
        return username 