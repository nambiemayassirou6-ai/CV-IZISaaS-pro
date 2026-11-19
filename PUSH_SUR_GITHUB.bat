@echo off
chcp 65001 > nul
title PUSH DU CV SUR GITHUB — CV-IZI-SaaS-pro
set "PATH=C:\Users\SILENCEWOLF\.mingit\cmd;%PATH%"

echo ===============================================================
echo   ENVOI DU CODE VERS GITHUB : nambiemayassirou6-ai/CV-IZI-SaaS-pro
echo ===============================================================
echo.

echo Vérification de l'authentification GitHub...
gh auth status > nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [!] Vous n'êtes pas encore connecté à GitHub dans le terminal.
    echo.
    echo Connexion rapide via navigateur en cours...
    echo Un code va s'afficher et votre navigateur va s'ouvrir.
    echo Validez simplement l'autorisation sur GitHub.
    echo.
    gh auth login --web -h github.com
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
    echo   Depot : https://github.com/nambiemayassirou6-ai/CV-IZI-SaaS-pro
    echo ===============================================================
) else (
    echo.
    echo [X] Erreur lors du push. Verifiez vos autorisations GitHub.
)

echo.
pause
