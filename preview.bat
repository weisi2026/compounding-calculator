@echo off
cd /d d:\Software\FreeAgent_text\sites\valuecalc
echo === Starting local preview server === > preview_log.txt
D:\Software\AI-Claude-code\npm.cmd run preview >> preview_log.txt 2>&1