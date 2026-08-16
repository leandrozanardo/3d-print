@echo off
setlocal
cd /d "%~dp0"
echo Starting Fix My Print web UI...
echo Open http://127.0.0.1:5173/ when Vite is ready.
echo.
call npx --yes pnpm@10.12.1 start
endlocal
