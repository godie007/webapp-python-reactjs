# Script para decodificar JWT
param(
    [string]$Token
)

if (-not $Token) {
    Write-Host "Uso: .\decode_jwt.ps1 -Token 'tu_jwt_token_aqui'"
    exit
}

Write-Host "Decodificando JWT..." -ForegroundColor Green
Write-Host "Token: $($Token.Substring(0, 50))..." -ForegroundColor Yellow

# Separar las partes del JWT
$parts = $Token.Split('.')

if ($parts.Length -ne 3) {
    Write-Host "Error: Token JWT inválido (debe tener 3 partes)" -ForegroundColor Red
    exit
}

# Decodificar Header
Write-Host "`n1. Header:" -ForegroundColor Cyan
try {
    $header = $parts[0]
    $headerBytes = [System.Convert]::FromBase64String($header.PadRight([math]::Ceiling($header.Length / 4) * 4, '='))
    $headerJson = [System.Text.Encoding]::UTF8.GetString($headerBytes)
    $headerObj = $headerJson | ConvertFrom-Json
    $headerObj | ConvertTo-Json -Depth 3
} catch {
    Write-Host "Error decodificando header: $($_.Exception.Message)" -ForegroundColor Red
}

# Decodificar Payload
Write-Host "`n2. Payload:" -ForegroundColor Cyan
try {
    $payload = $parts[1]
    $payloadBytes = [System.Convert]::FromBase64String($payload.PadRight([math]::Ceiling($payload.Length / 4) * 4, '='))
    $payloadJson = [System.Text.Encoding]::UTF8.GetString($payloadBytes)
    $payloadObj = $payloadJson | ConvertFrom-Json
    
    # Mostrar información del payload
    Write-Host "Información del token:" -ForegroundColor Green
    Write-Host "  - User ID: $($payloadObj.sub)" -ForegroundColor White
    Write-Host "  - Email: $($payloadObj.email)" -ForegroundColor White
    Write-Host "  - Username: $($payloadObj.username)" -ForegroundColor White
    Write-Host "  - Expiración: $(Get-Date -UnixTimeSeconds $payloadObj.exp)" -ForegroundColor White
    Write-Host "  - Emitido: $(Get-Date -UnixTimeSeconds $payloadObj.iat)" -ForegroundColor White
    
    $payloadObj | ConvertTo-Json -Depth 3
} catch {
    Write-Host "Error decodificando payload: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n3. Signature:" -ForegroundColor Cyan
Write-Host "  $($parts[2].Substring(0, 20))..." -ForegroundColor Gray

Write-Host "`n✅ JWT decodificado exitosamente" -ForegroundColor Green 