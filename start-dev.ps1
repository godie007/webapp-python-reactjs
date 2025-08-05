# Script para iniciar el entorno de desarrollo
Write-Host "🚀 Iniciando entorno de desarrollo..." -ForegroundColor Green

# Función para verificar si un puerto está en uso
function Test-Port {
    param([int]$Port)
    try {
        $connection = New-Object System.Net.Sockets.TcpClient
        $connection.Connect("localhost", $Port)
        $connection.Close()
        return $true
    }
    catch {
        return $false
    }
}

# Función para esperar a que un servicio esté disponible
function Wait-ForService {
    param([int]$Port, [string]$ServiceName)
    Write-Host "⏳ Esperando a que $ServiceName esté disponible en puerto $Port..." -ForegroundColor Yellow
    $attempts = 0
    $maxAttempts = 30
    
    while ($attempts -lt $maxAttempts) {
        if (Test-Port -Port $Port) {
            Write-Host "✅ $ServiceName está listo en puerto $Port" -ForegroundColor Green
            return $true
        }
        Start-Sleep -Seconds 2
        $attempts++
        Write-Host "   Intento $attempts/$maxAttempts..." -ForegroundColor Gray
    }
    
    Write-Host "❌ $ServiceName no está disponible después de $maxAttempts intentos" -ForegroundColor Red
    return $false
}

# Verificar si el backend está ejecutándose
if (-not (Test-Port -Port 3000)) {
    Write-Host "🔧 Iniciando backend en puerto 3000..." -ForegroundColor Blue
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; python main.py" -WindowStyle Normal
    Start-Sleep -Seconds 3
}

# Verificar si el frontend está ejecutándose
if (-not (Test-Port -Port 5173)) {
    Write-Host "🎨 Iniciando frontend en puerto 5173..." -ForegroundColor Blue
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev" -WindowStyle Normal
    Start-Sleep -Seconds 3
}

# Esperar a que ambos servicios estén disponibles
$backendReady = Wait-ForService -Port 3000 -ServiceName "Backend"
$frontendReady = Wait-ForService -Port 5173 -ServiceName "Frontend"

if ($backendReady -and $frontendReady) {
    Write-Host "🎉 ¡Entorno de desarrollo listo!" -ForegroundColor Green
    Write-Host "📱 Frontend: http://localhost:5173" -ForegroundColor Cyan
    Write-Host "🔧 Backend: http://localhost:3000" -ForegroundColor Cyan
    Write-Host "📚 API Docs: http://localhost:3000/docs" -ForegroundColor Cyan
    
    # Abrir el navegador
    Start-Process "http://localhost:5173"
} else {
    Write-Host "❌ Error al iniciar el entorno de desarrollo" -ForegroundColor Red
    Write-Host "💡 Asegúrate de que:" -ForegroundColor Yellow
    Write-Host "   - Python está instalado y en el PATH" -ForegroundColor Yellow
    Write-Host "   - Node.js está instalado" -ForegroundColor Yellow
    Write-Host "   - Las dependencias están instaladas (pip install -r requirements.txt)" -ForegroundColor Yellow
    Write-Host "   - Las dependencias del frontend están instaladas (npm install)" -ForegroundColor Yellow
} 