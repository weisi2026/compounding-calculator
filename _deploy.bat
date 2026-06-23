@echo off
cd /d D:\Software\FreeAgent_text\sites\valuecalc
call npx -y wrangler pages deploy dist --project-name=valuecalc > D:\Software\FreeAgent_text\sites\valuecalc\deploy_result.txt 2>&1
echo DONE >> D:\Software\FreeAgent_text\sites\valuecalc\deploy_result.txt