# Script para configurar y desplegar el proyecto en Vercel
Write-Host "🚀 Configurando despliegue en Vercel..." -ForegroundColor Green

# Verificar si Vercel CLI está instalado
try {
    $vercelVersion = vercel --version
    Write-Host "✅ Vercel CLI instalado: $vercelVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Vercel CLI no está instalado. Instalando..." -ForegroundColor Red
    npm install -g vercel
}

# Verificar variables de entorno
Write-Host "📋 Verificando variables de entorno..." -ForegroundColor Yellow
vercel env ls

# Mostrar URLs del proyecto
Write-Host "🌐 URLs del proyecto:" -ForegroundColor Cyan
vercel ls

Write-Host "`n📝 Comandos útiles:" -ForegroundColor Magenta
Write-Host "  • vercel --prod                    # Desplegar a producción" -ForegroundColor White
Write-Host "  • vercel env ls                    # Listar variables de entorno" -ForegroundColor White
Write-Host "  • vercel env add VARIABLE_NAME     # Agregar variable de entorno" -ForegroundColor White
Write-Host "  • vercel logs                      # Ver logs del despliegue" -ForegroundColor White
Write-Host "  • vercel inspect                   # Inspeccionar el último despliegue" -ForegroundColor White

Write-Host "`n🎉 ¡Configuración completada!" -ForegroundColor Green 