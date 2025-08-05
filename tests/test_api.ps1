# Script de prueba para la API
$baseUrl = "https://webapp-python-ifz5h5aam-godie007s-projects.vercel.app"

Write-Host "🧪 Iniciando pruebas de la API..." -ForegroundColor Green
Write-Host "URL Base: $baseUrl" -ForegroundColor Yellow

# 1. Probar health check
Write-Host "`n1️⃣ Probando Health Check..." -ForegroundColor Cyan
try {
    $health = Invoke-RestMethod -Uri "$baseUrl/api/health" -Method GET
    Write-Host "✅ Health Check exitoso:" -ForegroundColor Green
    $health | ConvertTo-Json -Depth 3
} catch {
    Write-Host "❌ Error en Health Check: $($_.Exception.Message)" -ForegroundColor Red
}

# 2. Probar endpoint de prueba
Write-Host "`n2️⃣ Probando Endpoint de Prueba..." -ForegroundColor Cyan
try {
    $test = Invoke-RestMethod -Uri "$baseUrl/api/test" -Method GET
    Write-Host "✅ Endpoint de prueba exitoso:" -ForegroundColor Green
    $test | ConvertTo-Json -Depth 3
} catch {
    Write-Host "❌ Error en endpoint de prueba: $($_.Exception.Message)" -ForegroundColor Red
}

# 3. Probar registro
Write-Host "`n3️⃣ Probando Registro..." -ForegroundColor Cyan
$registerData = @{
    email = "diegof.e3@gmail.com"
    password = "123456789"
    username = "diegof"
} | ConvertTo-Json

try {
    $register = Invoke-RestMethod -Uri "$baseUrl/api/register" -Method POST -ContentType "application/json" -Body $registerData
    Write-Host "✅ Registro exitoso:" -ForegroundColor Green
    $register | ConvertTo-Json -Depth 3
} catch {
    Write-Host "❌ Error en registro: $($_.Exception.Message)" -ForegroundColor Red
}

# 4. Probar login
Write-Host "`n4️⃣ Probando Login..." -ForegroundColor Cyan
$loginData = @{
    email = "diegof.e3@gmail.com"
    password = "123456789"
} | ConvertTo-Json

try {
    $login = Invoke-RestMethod -Uri "$baseUrl/api/login" -Method POST -ContentType "application/json" -Body $loginData
    Write-Host "✅ Login exitoso:" -ForegroundColor Green
    $login | ConvertTo-Json -Depth 3
    
    # Guardar el token para las pruebas siguientes
    $token = $login.access_token
    Write-Host "🔑 Token obtenido: $($token.Substring(0, 20))..." -ForegroundColor Yellow
} catch {
    Write-Host "❌ Error en login: $($_.Exception.Message)" -ForegroundColor Red
}

# 5. Probar endpoint protegido
Write-Host "`n5️⃣ Probando Endpoint Protegido..." -ForegroundColor Cyan
try {
    $protected = Invoke-RestMethod -Uri "$baseUrl/api/protected" -Method GET -Headers @{"Authorization"="Bearer $token"}
    Write-Host "✅ Endpoint protegido exitoso:" -ForegroundColor Green
    $protected | ConvertTo-Json -Depth 3
} catch {
    Write-Host "❌ Error en endpoint protegido: $($_.Exception.Message)" -ForegroundColor Red
}

# 6. Probar endpoint de usuarios
Write-Host "`n6️⃣ Probando Endpoint de Usuarios..." -ForegroundColor Cyan
try {
    $users = Invoke-RestMethod -Uri "$baseUrl/api/users" -Method GET -Headers @{"Authorization"="Bearer $token"}
    Write-Host "✅ Endpoint de usuarios exitoso:" -ForegroundColor Green
    $users | ConvertTo-Json -Depth 3
} catch {
    Write-Host "❌ Error en endpoint de usuarios: $($_.Exception.Message)" -ForegroundColor Red
}

# 7. Probar frontend
Write-Host "`n7️⃣ Probando Frontend..." -ForegroundColor Cyan
try {
    $frontend = Invoke-WebRequest -Uri "$baseUrl/" -Method GET
    Write-Host "✅ Frontend accesible (Status: $($frontend.StatusCode))" -ForegroundColor Green
} catch {
    Write-Host "❌ Error en frontend: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n🎉 Pruebas completadas!" -ForegroundColor Green 