@echo off
cd /d "%~dp0"
if not exist "node_modules\vite\bin\vite.js" (
    echo Instale as dependencias com npm ci antes de abrir o portal.
    pause
    exit /b 1
)
echo Abra http://localhost:5173 no navegador.
node --max-old-space-size=192 --max-semi-space-size=1 node_modules\vite\bin\vite.js build
if errorlevel 1 (
    pause
    exit /b 1
)
node --max-old-space-size=128 --max-semi-space-size=1 node_modules\vite\bin\vite.js preview
pause
