@echo off
chcp 65001 > nul
title CV & Portfolio - Nambiema Yassirou
echo ===============================================================
echo   CV EN LIGNE HAUTE QUALITÉ — NAMBIEMA YASSIROU
echo ===============================================================
echo.
echo Ouverture automatique dans votre navigateur...
start http://localhost:5173/
echo.
echo Démarrage du serveur web local (Port 5173)...
npm run preview -- --port 5173
pause
