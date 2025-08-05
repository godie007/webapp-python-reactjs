from typing import Optional, Tuple
from app.models.auth_models import LoginRequest, TokenResponse
from app.repositories.auth_repository import IAuthRepository, AuthRepository
from app.services.token_service import TokenService
from app.repositories.user_repository import IUserRepository, UserRepository

class AuthService:
    """
    Servicio de autenticación usando el patrón Service
    """
    def __init__(
        self, 
        auth_repository: IAuthRepository = None,
        user_repository: IUserRepository = None,
        token_service: TokenService = None
    ):
        self.auth_repository = auth_repository or AuthRepository()
        self.user_repository = user_repository or UserRepository()
        self.token_service = token_service or TokenService()
    
    def authenticate_user(self, login_data: LoginRequest) -> Tuple[bool, Optional[str], Optional[str]]:
        """
        Autenticar usuario y retornar (éxito, token, mensaje)
        """
        try:
            # Validar credenciales
            is_valid = self.auth_repository.validate_credentials(
                login_data.user, 
                login_data.pass_
            )
            
            if not is_valid:
                return False, None, "Credenciales incorrectas"
            
            # Verificar que el usuario existe
            user = self.user_repository.get_user_by_username(login_data.user)
            if not user:
                return False, None, "Usuario no encontrado"
            
            if not user.is_active:
                return False, None, "Usuario inactivo"
            
            # Generar token
            token = self.token_service.create_user_token(login_data.user)
            
            return True, token, "Login exitoso"
            
        except Exception as e:
            return False, None, f"Error de autenticación: {str(e)}"
    
    def login(self, login_data: LoginRequest) -> TokenResponse:
        """
        Proceso completo de login
        """
        success, token, message = self.authenticate_user(login_data)
        
        if not success:
            raise ValueError(message)
        
        return TokenResponse(
            access_token=token,
            token_type="bearer",
            message=message
        )
    
    def validate_token(self, token: str) -> str:
        """
        Validar token y retornar nombre de usuario
        """
        try:
            username = self.token_service.get_username_from_token(token)
            
            # Verificar que el usuario existe y está activo
            user = self.user_repository.get_user_by_username(username)
            if not user or not user.is_active:
                raise ValueError("Usuario no válido")
            
            return username
            
        except Exception as e:
            raise ValueError(f"Token inválido: {str(e)}")
    
    def get_user_info(self, username: str):
        """
        Obtener información del usuario
        """
        user = self.user_repository.get_user_by_username(username)
        if not user:
            raise ValueError("Usuario no encontrado")
        return user 