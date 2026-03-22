param(
    [int]$DebugPort = 9223,
    [string]$UserDataDir = "C:\temp\chrome-mcp-profile"
)

# Possible Chrome paths on Windows
$chromePaths = @(
    "C:\Program Files\Google\Chrome\Application\chrome.exe",
    "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
)

$chromeExe = $chromePaths | Where-Object { Test-Path $_ } | Select-Object -First 1

if (-not $chromeExe) {
    Write-Error "Chrome.exe not found. Please make sure Google Chrome is installed."
    exit 1
}

# Ensure profile directory exists
if (-not (Test-Path $UserDataDir)) {
    New-Item -ItemType Directory -Path $UserDataDir -Force | Out-Null
}

Write-Host "Stopping any running Chrome processes..." -ForegroundColor Yellow
Get-Process chrome -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

Start-Sleep -Seconds 1

$arguments = @(
    "--remote-debugging-address=0.0.0.0",
    "--remote-debugging-port=$DebugPort",
    "--user-data-dir=""$UserDataDir""",
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-extensions"
    "--remote-allow-origins=*"
)

Write-Host "Starting Chrome for MCP with remote debugging enabled:" -ForegroundColor Green
Write-Host "`"$chromeExe`" $($arguments -join ' ')"

Start-Process -FilePath $chromeExe -ArgumentList $arguments

Write-Host "Chrome started. You can verify DevTools endpoint at: http://localhost:$DebugPort/json/version" -ForegroundColor Green
