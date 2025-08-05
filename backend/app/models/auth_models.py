from pydantic import BaseModel, Field
from typing import Optional

class LoginRequest(BaseModel):
    """
    Modelo para solicitud de login
    """
    user: str = Field(..., description="Nombre de usuario")
    pass_: str = Field(..., alias="pass", description="Contraseña del usuario")

class TokenResponse(BaseModel):
    """
    Modelo para respuesta de token JWT
    """
    access_token: str = Field(..., description="Token JWT de acceso")
    token_type: str = Field(default="bearer", description="Tipo de token")
    message: str = Field(..., description="Mensaje de respuesta")

class ErrorResponse(BaseModel):
    """
    Modelo para respuesta de error
    """
    error: str = Field(..., description="Tipo de error")
    message: str = Field(..., description="Mensaje de error")
    details: Optional[str] = Field(None, description="Detalles adicionales del error") 