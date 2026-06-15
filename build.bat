@echo off
cd /d d:\Software\FreeAgent_text\sites\valuecalc
echo === Building project === > build_log.txt
D:\Software\AI-Claude-code\npm.cmd run build >> build_log.txt 2>&1
echo === EXIT CODE: %ERRORLEVEL% === >> build_log.txt