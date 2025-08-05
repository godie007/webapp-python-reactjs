"""
Ejemplo de tests para la API refactorizada
Este archivo muestra cómo la nueva arquitectura facilita el testing
"""

import pytest
from unittest.mock import Mock, patch
from app.models.auth_models import LoginRequest, TokenResponse
from app.services.auth_service import AuthService
from app.services.token_service import TokenService
from app.repositories.auth_repository import AuthRepository
from app.repositories.user_repository import UserRepository

# Ejemplo de test para AuthService
class TestAuthService:
    """Tests para el servicio de autenticación"""
    
    def setup_method(self):
        """Configuración antes de cada test"""
        # Mock de dependencias
        self.mock_auth_repo = Mock(spec=AuthRepository)
        self.mock_user_repo = Mock(spec=UserRepository)
        self.mock_token_service = Mock(spec=TokenService)
        
        # Crear instancia del servicio con mocks
        self.auth_service = AuthService(
            auth_repository=self.mock_auth_repo,
            user_repository=self.mock_user_repo,
            token_service=self.mock_token_service
        )
    
    def test_successful_login(self):
        """Test de login exitoso"""
        # Arrange
        login_data = LoginRequest(user="testuser", pass_="testpass")
        self.mock_auth_repo.validate_credentials.return_value = True
        self.mock_user_repo.get_user_by_username.return_value = Mock(
            username="testuser", is_active=True
        )
        self.mock_token_service.create_user_token.return_value = "mock_token"
        
        # Act
        result = self.auth_service.login(login_data)
        
        # Assert
        assert isinstance(result, TokenResponse)
        assert result.access_token == "mock_token"
        assert result.token_type == "bearer"
        assert result.message == "Login exitoso"
    
    def test_failed_login_invalid_credentials(self):
        """Test de login fallido por credenciales inválidas"""
        # Arrange
        login_data = LoginRequest(user="testuser", pass_="wrongpass")
        self.mock_auth_repo.validate_credentials.return_value = False
        
        # Act & Assert
        with pytest.raises(ValueError, match="Credenciales incorrectas"):
            self.auth_service.login(login_data)
    
    def test_failed_login_inactive_user(self):
        """Test de login fallido por usuario inactivo"""
        # Arrange
        login_data = LoginRequest(user="testuser", pass_="testpass")
        self.mock_auth_repo.validate_credentials.return_value = True
        self.mock_user_repo.get_user_by_username.return_value = Mock(
            username="testuser", is_active=False
        )
        
        # Act & Assert
        with pytest.raises(ValueError, match="Usuario inactivo"):
            self.auth_service.login(login_data)

# Ejemplo de test para TokenService
class TestTokenService:
    """Tests para el servicio de tokens"""
    
    def setup_method(self):
        """Configuración antes de cada test"""
        self.token_service = TokenService()
    
    @patch('app.services.token_service.jwt.encode')
    def test_create_user_token(self, mock_jwt_encode):
        """Test de creación de token de usuario"""
        # Arrange
        mock_jwt_encode.return_value = "mock_jwt_token"
        
        # Act
        result = self.token_service.create_user_token("testuser")
        
        # Assert
        assert result == "mock_jwt_token"
        mock_jwt_encode.assert_called_once()
    
    @patch('app.services.token_service.jwt.decode')
    def test_verify_valid_token(self, mock_jwt_decode):
        """Test de verificación de token válido"""
        # Arrange
        mock_jwt_decode.return_value = {"sub": "testuser"}
        
        # Act
        result = self.token_service.get_username_from_token("valid_token")
        
        # Assert
        assert result == "testuser"
    
    @patch('app.services.token_service.jwt.decode')
    def test_verify_invalid_token(self, mock_jwt_decode):
        """Test de verificación de token inválido"""
        # Arrange
        mock_jwt_decode.side_effect = Exception("Invalid token")
        
        # Act & Assert
        with pytest.raises(ValueError, match="Token inválido"):
            self.token_service.get_username_from_token("invalid_token")

# Ejemplo de test de integración
class TestIntegration:
    """Tests de integración"""
    
    def test_full_login_flow(self):
        """Test del flujo completo de login"""
        # Este test usaría la aplicación real con base de datos de prueba
        pass
    
    def test_protected_endpoint_with_valid_token(self):
        """Test de endpoint protegido con token válido"""
        # Este test verificaría que los endpoints protegidos funcionan
        pass

# Ejemplo de test de configuración
class TestConfiguration:
    """Tests para la configuración"""
    
    def test_settings_singleton(self):
        """Test del patrón singleton en configuración"""
        from app.config.settings import get_settings
        
        settings1 = get_settings()
        settings2 = get_settings()
        
        # Verificar que es la misma instancia (singleton)
        assert settings1 is settings2
    
    def test_settings_values(self):
        """Test de valores de configuración"""
        from app.config.settings import get_settings
        
        settings = get_settings()
        
        assert hasattr(settings, 'secret_key')
        assert hasattr(settings, 'algorithm')
        assert hasattr(settings, 'access_token_expire_minutes')

if __name__ == "__main__":
    print("Ejecutando tests de ejemplo...")
    print("Para ejecutar tests reales, usa: pytest tests_example.py") 