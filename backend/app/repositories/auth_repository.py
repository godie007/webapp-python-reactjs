from abc import ABC, abstractmethod
from typing import Dict, Optional
from app.config.settings import get_settings

class IAuthRepository(ABC):
    """
    Interfaz abstracta para el repositorio de autenticación
    """
    @abstractmethod
    def validate_credentials(self, username: str, password: str) -> bool:
        """Validar credenciales de usuario"""
        pass
    
    @abstractmethod
    def get_user_credentials(self) -> Dict[str, str]:
        """Obtener credenciales de usuarios"""
        pass

class AuthRepository(IAuthRepository):
    """
    Implementación del repositorio de autenticación
    """
    def __init__(self):
        self.settings = get_settings()
        # Simulación de base de datos de credenciales
        self._credentials: Dict[str, str] = {
            self.settings.test_user: self.settings.test_password
        }
    
    def validate_credentials(self, username: str, password: str) -> bool:
        """Validar credenciales de usuario"""
        stored_password = self._credentials.get(username)
        return stored_password is not None and stored_password == password
    
    def get_user_credentials(self) -> Dict[str, str]:
        """Obtener credenciales de usuarios"""
        return self._credentials.copy()
    
    def add_user_credentials(self, username: str, password: str) -> None:
        """Agregar credenciales de usuario"""
        self._credentials[username] = password
    
    def remove_user_credentials(self, username: str) -> bool:
        """Eliminar credenciales de usuario"""
        if username in self._credentials:
            del self._credentials[username]
            return True
        return False 