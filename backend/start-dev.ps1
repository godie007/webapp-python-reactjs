Write-Host "========================================" -ForegroundColor Green
Write-Host "    Iniciando Aplicacion Completa" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Backend: http://localhost:3000" -ForegroundColor Yellow
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Yellow
Write-Host ""
Write-Host "Presiona Ctrl+C para detener ambos servidores" -ForegroundColor Cyan
Write-Host ""

# Iniciar backend en segundo plano
Start-Process -FilePath "python" -ArgumentList "main.py" -WindowStyle Normal

# Esperar un momento para que el backend inicie
Start-Sleep -Seconds 3

# Iniciar frontend en segundo plano
Start-Process -FilePath "npm" -ArgumentList "run", "dev" -WorkingDirectory "frontend" -WindowStyle Normal

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "    Servidores iniciados correctamente" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Backend: http://localhost:3000" -ForegroundColor Yellow
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Yellow
Write-Host ""
Write-Host "Presiona cualquier tecla para detener..." -ForegroundColor Cyan
Read-Host

# Detener ambos procesos
Get-Process -Name "python" -ErrorAction SilentlyContinue | Stop-Process -Force
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force

Write-Host "Servidores detenidos." -ForegroundColor Green 