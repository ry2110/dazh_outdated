@ECHO OFF
COLOR 0A

set /p dyahn=Did you already had Node.js? (Y/N)
IF /I "%dyahn%" NEQ "Y" GOTO LN

:MAIN

npm i require
npm i prompt-sync
npm i fs
npm i http
npm i mysql

:LN

start "" https://nodejs.org/dist/v20.15.0/node-v20.15.0-x64.msi