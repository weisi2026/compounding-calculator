@echo off
cd /d d:\Software\FreeAgent_text\sites\valuecalc
echo === Starting npm install === > install_log.txt
D:\Software\AI-Claude-code\npm.cmd install >> install_log.txt 2>&1
echo === EXIT CODE: %ERRORLEVEL% === >> install_log.txt
if exist node_modules\astro (
    echo SUCCESS >> install_log.txt
) else (
    echo FAILED >> install_log.txt
)