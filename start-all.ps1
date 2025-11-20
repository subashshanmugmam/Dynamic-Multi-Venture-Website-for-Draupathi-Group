# Draupathi Group - Combined Frontend & Backend Startup Script
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Draupathi Group Full Stack Startup" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Check if MongoDB is running
Write-Host "Checking MongoDB connection..." -ForegroundColor Yellow
$mongoRunning = $false
try {
    $mongoTest = mongosh --eval "db.version()" 2>&1
    if ($LASTEXITCODE -eq 0) {
        $mongoRunning = $true
        Write-Host "✓ MongoDB is running" -ForegroundColor Green
    }
} catch {
    Write-Host "✗ MongoDB check failed" -ForegroundColor Red
}

if (-not $mongoRunning) {
    Write-Host "⚠ MongoDB may not be running. Starting MongoDB..." -ForegroundColor Yellow
    Write-Host "If MongoDB is not installed, the backend will fail to connect." -ForegroundColor Yellow
    # Try to start MongoDB service (if installed as service)
    try {
        Start-Service MongoDB -ErrorAction SilentlyContinue
        Write-Host "✓ MongoDB service started" -ForegroundColor Green
    } catch {
        Write-Host "MongoDB service not found. Please ensure MongoDB is running." -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "Starting Backend Server..." -ForegroundColor Yellow
$backend = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 's:\Work\DIT\draupathi-backend'; Write-Host '==== BACKEND SERVER ====' -ForegroundColor Green; npm run dev" -PassThru

Start-Sleep -Seconds 3

Write-Host "Starting Frontend Server..." -ForegroundColor Yellow
$frontend = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 's:\Work\DIT\draupathi-frontend'; Write-Host '==== FRONTEND SERVER ====' -ForegroundColor Magenta; npm run dev" -PassThru

Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "✓ Services Started!" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Backend:  http://localhost:5000" -ForegroundColor Green
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Magenta
Write-Host ""
Write-Host "Press Ctrl+C in each terminal to stop the servers" -ForegroundColor Yellow
Write-Host ""
Write-Host "Backend Process ID: $($backend.Id)" -ForegroundColor DarkGray
Write-Host "Frontend Process ID: $($frontend.Id)" -ForegroundColor DarkGray
