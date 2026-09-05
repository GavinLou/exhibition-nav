#!/bin/bash

# BMC 展览导览系统 - 快速重启脚本

echo "========================================"
echo "  BMC 展览导览系统 - 重启服务"
echo "========================================"
echo ""

# 停止服务
echo "⏹️  正在停止服务..."
docker compose -f docker-compose.prod.yml down

echo ""
echo "✓ 服务已停止"
echo ""

# 启动服务
echo "▶️  正在启动服务..."
docker compose -f docker-compose.prod.yml up -d

echo ""
echo "⏳ 等待服务启动..."
sleep 5

echo ""
echo "========================================"
echo "  服务状态"
echo "========================================"
echo ""

docker compose -f docker-compose.prod.yml ps

echo ""
echo "========================================"
echo "  访问地址"
echo "========================================"
echo ""

# 获取 WSL IP
WSL_IP=$(ip addr show eth0 | grep "inet " | awk '{print $2}' | cut -d'/' -f1)

echo "📍 WSL 内部访问 (在 WSL 或 Windows localhost):"
echo "   前端: http://localhost:3000"
echo "   Kiosk: http://localhost:3000/kiosk"
echo "   Mobile: http://localhost:3000/mobile"
echo "   后端 API: http://localhost:8000/docs"
echo "   pgAdmin: http://localhost:5050"
echo ""
echo "📍 WSL IP ($WSL_IP):"
echo "   前端: http://$WSL_IP:3000"
echo "   pgAdmin: http://$WSL_IP:5050"
echo ""
echo "📱 手机访问 (需要先运行 Windows 端口转发脚本):"
echo "   前端: http://192.168.10.101:3000"
echo "   Kiosk: http://192.168.10.101:3000/kiosk"
echo "   Mobile: http://192.168.10.101:3000/mobile"
echo "   pgAdmin: http://192.168.10.101:5050"
echo ""
echo "⚠️  如果手机无法访问，请在 Windows PowerShell (管理员) 运行:"
echo "   .\\setup-wsl-port-forward.ps1"
echo ""
echo "✅ 服务已启动！"
echo ""
