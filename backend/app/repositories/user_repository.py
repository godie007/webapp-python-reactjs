from abc import ABC, abstractmethod
from typing import Optional, Dict, List
from app.models.user_models import User
from app.config.settings import get_settings

class IUserRepository(ABC):
    """
    Interfaz abstracta para el repositorio de usuarios
    """
    @abstractmethod
    def get_user_by_username(self, username: str) -> Optional[User]:
        """Obtener usuario por nombre de usuario"""
        pass
    
    @abstractmethod
    def get_user_by_id(self, user_id: int) -> Optional[User]:
        """Obtener usuario por ID"""
        pass
    
    @abstractmethod
    def get_all_users(self) -> List[User]:
        """Obtener todos los usuarios"""
        pass
    
    @abstractmethod
    def create_user(self, user: User) -> User:
        """Crear nuevo usuario"""
        pass
    
    @abstractmethod
    def update_user(self, user: User) -> User:
        """Actualizar usuario"""
        pass
    
    @abstractmethod
    def delete_user(self, user_id: int) -> bool:
        """Eliminar usuario"""
        pass

class UserRepository(IUserRepository):
    """
    Implementación del repositorio de usuarios
    """
    def __init__(self):
        self.settings = get_settings()
        # Simulación de base de datos en memoria
        self._users: Dict[str, User] = {
            self.settings.test_user: User(
                id=1,
                username=self.settings.test_user,
                email=f"{self.settings.test_user}@example.com",
                is_active=True
            )
        }
    
    def get_user_by_username(self, username: str) -> Optional[User]:
        """Obtener usuario por nombre de usuario"""
        return self._users.get(username)
    
    def get_user_by_id(self, user_id: int) -> Optional[User]:
        """Obtener usuario por ID"""
        for user in self._users.values():
            if user.id == user_id:
                return user
        return None
    
    def get_all_users(self) -> List[User]:
        """Obtener todos los usuarios"""
        return list(self._users.values())
    
    def create_user(self, user: User) -> User:
        """Crear nuevo usuario"""
        if user.username in self._users:
            raise ValueError(f"Usuario {user.username} ya existe")
        
        user.id = max([u.id for u in self._users.values()], default=0) + 1
        self._users[user.username] = user
        return user
    
    def update_user(self, user: User) -> User:
        """Actualizar usuario"""
        if user.username not in self._users:
            raise ValueError(f"Usuario {user.username} no existe")
        
        self._users[user.username] = user
        return user
    
    def delete_user(self, user_id: int) -> bool:
        """Eliminar usuario"""
        for username, user in self._users.items():
            if user.id == user_id:
                del self._users[username]
                return True
        return False 