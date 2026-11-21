@echo off
chcp 65001 > nul
title PUSH DU CV SUR GITHUB — CV-IZISaaS-pro
set "PATH=C:\Users\SILENCEWOLF\.mingit\cmd;%PATH%"

echo ===============================================================
echo   ENVOI DU CODE VERS GITHUB : nambiemayassirou6-ai/CV-IZISaaS-pro
echo ===============================================================
echo.

echo Verification de l'authentification GitHub...
gh auth status > nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [!] Connexion a votre compte GitHub...
    echo.
    echo 1. Un code a 8 caracteres va s'afficher ci-dessous.
    echo 2. Votre navigateur va s'ouvrir automatiquement sur GitHub.
    echo 3. Collez le code affiche et cliquez sur "Authorize".
    echo.
    gh auth login --git-protocol https --web --skip-ssh-key -h github.com
    gh auth setup-git
)

echo.
echo ===============================================================
echo   Envoi du code vers origin main...
echo ===============================================================
echo.
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ===============================================================
    echo   [SUCCES] Votre code est en ligne sur GitHub !
    echo   Depot : https://github.com/nambiemayassirou6-ai/CV-IZISaaS-pro
    echo ===============================================================
) else (
    echo.
    echo [X] Erreur lors du push. Verifiez vos autorisations GitHub.
)

echo.
pause
