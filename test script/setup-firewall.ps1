# BMC Exhibition Nav - 防火牆設置腳本
# 請以管理員身份運行此腳本

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  BMC 展覽導覽系統 - 防火牆設置" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 檢查是否以管理員身份運行
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "❌ 錯誤：此腳本需要以管理員身份運行" -ForegroundColor Red
    Write-Host ""
    Write-Host "請按照以下步驟操作：" -ForegroundColor Yellow
    Write-Host "1. 右鍵點擊 PowerShell" -ForegroundColor Yellow
    Write-Host "2. 選擇「以管理員身份執行」" -ForegroundColor Yellow
    Write-Host "3. 重新運行此腳本" -ForegroundColor Yellow
    Write-Host ""
    pause
    exit 1
}

Write-Host "✓ 管理員權限確認" -ForegroundColor Green
Write-Host ""

# 檢查現有規則
Write-Host "正在檢查現有防火牆規則..." -ForegroundColor Yellow

$frontendRule = Get-NetFirewallRule -DisplayName "BMC Frontend" -ErrorAction SilentlyContinue
$backendRule = Get-NetFirewallRule -DisplayName "BMC Backend" -ErrorAction SilentlyContinue

# 前端規則（端口 3000）
if ($frontendRule) {
    Write-Host "⚠ 已存在前端規則，將移除並重新創建" -ForegroundColor Yellow
    Remove-NetFirewallRule -DisplayName "BMC Frontend" -ErrorAction SilentlyContinue
}

Write-Host "正在創建前端防火牆規則 (端口 3000)..." -ForegroundColor Cyan
try {
    New-NetFirewallRule -DisplayName "BMC Frontend" `
                        -Description "允許 BMC 展覽導覽系統前端訪問 (Next.js)" `
                        -Direction Inbound `
                        -Protocol TCP `
                        -LocalPort 3000 `
                        -Action Allow `
                        -Profile Any `
                        -Enabled True `
                        | Out-Null
    Write-Host "✓ 前端規則創建成功 (端口 3000)" -ForegroundColor Green
} catch {
    Write-Host "❌ 前端規則創建失敗: $_" -ForegroundColor Red
}

# 後端規則（端口 8000）
if ($backendRule) {
    Write-Host "⚠ 已存在後端規則，將移除並重新創建" -ForegroundColor Yellow
    Remove-NetFirewallRule -DisplayName "BMC Backend" -ErrorAction SilentlyContinue
}

Write-Host "正在創建後端防火牆規則 (端口 8000)..." -ForegroundColor Cyan
try {
    New-NetFirewallRule -DisplayName "BMC Backend" `
                        -Description "允許 BMC 展覽導覽系統後端 API 訪問 (FastAPI)" `
                        -Direction Inbound `
                        -Protocol TCP `
                        -LocalPort 8000 `
                        -Action Allow `
                        -Profile Any `
                        -Enabled True `
                        | Out-Null
    Write-Host "✓ 後端規則創建成功 (端口 8000)" -ForegroundColor Green
} catch {
    Write-Host "❌ 後端規則創建失敗: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  防火牆設置完成！" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 顯示當前 IP 地址
Write-Host "📍 當前網路配置：" -ForegroundColor Cyan
Write-Host ""

$ipAddresses = Get-NetIPAddress -AddressFamily IPv4 |
    Where-Object { $_.IPAddress -notlike "127.*" -and $_.InterfaceAlias -notlike "*Loopback*" } |
    Select-Object -Property InterfaceAlias, IPAddress

foreach ($ip in $ipAddresses) {
    $alias = $ip.InterfaceAlias
    $address = $ip.IPAddress

    if ($alias -like "*Wi-Fi*" -or $alias -like "*無線*" -or $alias -like "*Wireless*") {
        Write-Host "   WiFi: $address" -ForegroundColor Green
    } elseif ($alias -like "*Ethernet*" -or $alias -like "*乙太*") {
        Write-Host "   乙太網路: $address" -ForegroundColor Yellow
    } else {
        Write-Host "   $alias`: $address" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "📱 手機訪問網址：" -ForegroundColor Cyan

# 獲取最可能的 WiFi IP
$wifiIP = (Get-NetIPAddress -AddressFamily IPv4 |
    Where-Object {
        $_.IPAddress -notlike "127.*" -and
        $_.InterfaceAlias -notlike "*Loopback*" -and
        ($_.InterfaceAlias -like "*Wi-Fi*" -or $_.InterfaceAlias -like "*無線*")
    } |
    Select-Object -First 1).IPAddress

if ($wifiIP) {
    Write-Host "   前端: http://$wifiIP`:3000" -ForegroundColor Green
    Write-Host "   Kiosk: http://$wifiIP`:3000/kiosk" -ForegroundColor Green
    Write-Host "   Mobile: http://$wifiIP`:3000/mobile" -ForegroundColor Green
    Write-Host "   後端 API: http://$wifiIP`:8000/docs" -ForegroundColor Green
} else {
    Write-Host "   ⚠ 未檢測到 WiFi 連接，請手動確認 IP 地址" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "💡 提示：" -ForegroundColor Yellow
Write-Host "   - 確保手機和電腦連接到同一個 WiFi 網路" -ForegroundColor Gray
Write-Host "   - 如果 IP 地址改變，需要更新 .env 文件並重新構建前端" -ForegroundColor Gray
Write-Host "   - 測試連接：在手機瀏覽器輸入上方網址" -ForegroundColor Gray
Write-Host ""

# 列出創建的規則
Write-Host "📋 已創建的防火牆規則：" -ForegroundColor Cyan
Get-NetFirewallRule -DisplayName "BMC*" | Format-Table DisplayName, Enabled, Direction, Action -AutoSize

Write-Host ""
Write-Host "✅ 設置完成！現在可以從手機訪問了。" -ForegroundColor Green
Write-Host ""

pause
