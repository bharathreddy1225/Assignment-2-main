@echo off
REM This script initializes a git repository in the frontend folder, adds all files, commits, and pushes to GitHub.
REM Before running this script, ensure Git is installed and added to your system PATH.
REM Replace the URL below with your actual GitHub repository URL.

cd frontend
git init
git add .
git commit -m "Initial commit of frontend with updated Home page UI"
git remote add origin https://github.com/bharathreddy1225/WT_assignment_2.git
git branch -M main
git push -u origin main

echo.
echo Git operations completed. If you encounter errors, please ensure Git is installed and configured correctly.
pause
