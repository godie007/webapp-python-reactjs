from typing import List, Optional
from app.models.user_models import User
from app.repositories.user_repository import IUserRepository, UserRepository

class UserService:
    """
    Servicio de usuarios usando el patrón Service
    """
    def __init__(self, user_repository: IUserRepository = None):
        self.user_repository = user_repository or UserRepository()
    
    def get_user_by_username(self, username: str) -> Optional[User]:
        """Obtener usuario por nombre de usuario"""
        return self.user_repository.get_user_by_username(username)
    
    def get_user_by_id(self, user_id: int) -> Optional[User]:
        """Obtener usuario por ID"""
        return self.user_repository.get_user_by_id(user_id)
    
    def get_all_users(self) -> List[User]:
        """Obtener todos los usuarios"""
        return self.user_repository.get_all_users()
    
    def create_user(self, user: User) -> User:
        """Crear nuevo usuario"""
        return self.user_repository.create_user(user)
    
    def update_user(self, user: User) -> User:
        """Actualizar usuario"""
        return self.user_repository.update_user(user)
    
    def delete_user(self, user_id: int) -> bool:
        """Eliminar usuario"""
        return self.user_repository.delete_user(user_id)
    
    def activate_user(self, user_id: int) -> User:
        """Activar usuario"""
        user = self.get_user_by_id(user_id)
        if not user:
            raise ValueError("Usuario no encontrado")
        
        user.is_active = True
        return self.update_user(user)
    
    def deactivate_user(self, user_id: int) -> User:
        """Desactivar usuario"""
        user = self.get_user_by_id(user_id)
        if not user:
            raise ValueError("Usuario no encontrado")
        
        user.is_active = False
        return self.update_user(user) 