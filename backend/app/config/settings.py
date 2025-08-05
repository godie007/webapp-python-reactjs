import os
from typing import Optional
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

class Settings(BaseSettings):
    """
    Configuración de la aplicación usando el patrón Singleton
    """
    # Configuración de JWT
    secret_key: str = os.getenv("SECRET_KEY", "tu_clave_secreta_super_segura_aqui_cambiala_en_produccion")
    algorithm: str = os.getenv("ALGORITHM", "HS256")
    access_token_expire_minutes: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))
    
    # Configuración del servidor
    host: str = os.getenv("HOST", "0.0.0.0")
    port: int = int(os.getenv("PORT", "3000"))
    
    # Credenciales de prueba
    test_user: str = os.getenv("TEST_USER", "root")
    test_password: str = os.getenv("TEST_PASSWORD", "1234")
    
    # Configuración de la aplicación
    app_title: str = "API de Autenticación"
    app_version: str = "1.0.0"
    
    class Config:
        env_file = ".env"
        case_sensitive = False

# Instancia singleton de configuración
_settings: Optional[Settings] = None

def get_settings() -> Settings:
    """
    Obtener la instancia singleton de configuración
    """
    global _settings
    if _settings is None:
        _settings = Settings()
    return _settings 