# WSL2 端口转发设置脚本
# 将 WSL2 内的 Docker 容器端口转发到 Windows 主机
# 请以管理员身份运行此脚本

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  WSL2 端口转发设置" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 检查是否以管理员身份运行
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "❌ 错误：此脚本需要以管理员身份运行" -ForegroundColor Red
    Write-Host ""
    Write-Host "请按照以下步骤操作：" -ForegroundColor Yellow
    Write-Host "1. 右键点击 PowerShell" -ForegroundColor Yellow
    Write-Host "2. 选择「以管理员身份执行」" -ForegroundColor Yellow
    Write-Host "3. 重新运行此脚本" -ForegroundColor Yellow
    Write-Host ""
    pause
    exit 1
}

Write-Host "✓ 管理员权限确认" -ForegroundColor Green
Write-Host ""

# 获取 WSL2 的 IP 地址
Write-Host "正在获取 WSL2 IP 地址..." -ForegroundColor Yellow
$wslIP = (wsl hostname -I).Trim()
$wslIP = $wslIP.Split()[0]  # 取第一个 IP

if (-not $wslIP) {
    Write-Host "❌ 无法获取 WSL2 IP 地址" -ForegroundColor Red
    Write-Host "请确保 WSL2 正在运行" -ForegroundColor Yellow
    pause
    exit 1
}

Write-Host "✓ WSL2 IP: $wslIP" -ForegroundColor Green
Write-Host ""

# 获取 Windows 主机的 WiFi IP
Write-Host "正在获取 Windows 主机 IP 地址..." -ForegroundColor Yellow
$windowsIP = (Get-NetIPAddress -AddressFamily IPv4 |
    Where-Object {
        $_.IPAddress -notlike "127.*" -and
        $_.InterfaceAlias -notlike "*Loopback*" -and
        $_.InterfaceAlias -notlike "*WSL*" -and
        ($_.InterfaceAlias -like "*Wi-Fi*" -or $_.InterfaceAlias -like "*无线*" -or $_.InterfaceAlias -like "*Ethernet*")
    } |
    Select-Object -First 1).IPAddress

if (-not $windowsIP) {
    Write-Host "⚠ 未检测到 WiFi 或以太网连接" -ForegroundColor Yellow
    $windowsIP = "192.168.10.101"  # 使用你提供的 IP 作为默认值
    Write-Host "使用默认 IP: $windowsIP" -ForegroundColor Yellow
} else {
    Write-Host "✓ Windows IP: $windowsIP" -ForegroundColor Green
}

Write-Host ""

# 要转发的端口
$ports = @(3000, 8000, 5432, 5050)

Write-Host "正在设置端口转发..." -ForegroundColor Cyan
Write-Host ""

foreach ($port in $ports) {
    Write-Host "设置端口 $port..." -ForegroundColor Yellow

    # 删除现有的转发规则（如果存在）
    $existingRule = netsh interface portproxy show v4tov4 | Select-String -Pattern "0.0.0.0\s+$port"
    if ($existingRule) {
        Write-Host "  ⚠ 删除现有规则" -ForegroundColor Yellow
        netsh interface portproxy delete v4tov4 listenport=$port listenaddress=0.0.0.0 | Out-Null
    }

    # 添加新的转发规则
    try {
        netsh interface portproxy add v4tov4 listenport=$port listenaddress=0.0.0.0 connectport=$port connectaddress=$wslIP | Out-Null
        Write-Host "  ✓ 端口 $port 转发成功" -ForegroundColor Green
    } catch {
        Write-Host "  ❌ 端口 $port 转发失败: $_" -ForegroundColor Red
    }

    # 添加防火墙规则
    $ruleName = "WSL2 BMC Port $port"
    $existingFirewallRule = Get-NetFirewallRule -DisplayName $ruleName -ErrorAction SilentlyContinue
    if ($existingFirewallRule) {
        Remove-NetFirewallRule -DisplayName $ruleName -ErrorAction SilentlyContinue | Out-Null
    }

    try {
        New-NetFirewallRule -DisplayName $ruleName `
                            -Description "允许访问 WSL2 BMC 服务端口 $port" `
                            -Direction Inbound `
                            -Protocol TCP `
                            -LocalPort $port `
                            -Action Allow `
                            -Profile Any `
                            -Enabled True `
                            | Out-Null
        Write-Host "  ✓ 防火墙规则添加成功" -ForegroundColor Green
    } catch {
        Write-Host "  ❌ 防火墙规则添加失败: $_" -ForegroundColor Red
    }

    Write-Host ""
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  当前端口转发规则" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

netsh interface portproxy show v4tov4

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  配置完成！" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "📱 现在可以从手机访问：" -ForegroundColor Cyan
Write-Host ""
Write-Host "   前端主页:    http://$windowsIP`:3000" -ForegroundColor Green
Write-Host "   Kiosk 界面:  http://$windowsIP`:3000/kiosk" -ForegroundColor Green
Write-Host "   Mobile 界面: http://$windowsIP`:3000/mobile" -ForegroundColor Green
Write-Host "   后端 API:    http://$windowsIP`:8000/docs" -ForegroundColor Green
Write-Host "   pgAdmin:     http://$windowsIP`:5050" -ForegroundColor Green
Write-Host ""

Write-Host "💡 重要提示：" -ForegroundColor Yellow
Write-Host "   1. WSL2 IP 地址: $wslIP" -ForegroundColor Gray
Write-Host "   2. Windows IP 地址: $windowsIP" -ForegroundColor Gray
Write-Host "   3. 每次重启 WSL2 后，WSL IP 可能会改变，需要重新运行此脚本" -ForegroundColor Gray
Write-Host "   4. 端口转发规则在 Windows 重启后会保留" -ForegroundColor Gray
Write-Host ""

Write-Host "🧪 测试连接：" -ForegroundColor Cyan
Write-Host "   在手机浏览器输入: http://$windowsIP`:3000" -ForegroundColor White
Write-Host ""

pause
