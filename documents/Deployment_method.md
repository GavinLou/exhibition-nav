部屬流程

📝 部署到服务器的 .env 配置

需要修改的部分：

# 1. NEXT_PUBLIC_API_URL - 最重要！
# 改成你的服务器域名或公网IP
NEXT_PUBLIC_API_URL=http://your-domain.com:8000
# 或者
NEXT_PUBLIC_API_URL=http://123.456.789.123:8000

# 2. 数据库密码 - 建议改成更强的密码
POSTGRES_PASSWORD=your_strong_password_here

# 3. pgAdmin 密码 - 也建议改强一点
PGADMIN_PASSWORD=your_pgadmin_password

不需要修改的部分：

# 这些保持不变，因为是容器内部通信
POSTGRES_USER=GavinLou
POSTGRES_DB=bmc_navigation
DB_PORT=5432
BACKEND_PORT=8000
FRONTEND_PORT=3000
PGADMIN_PORT=5050

在服务器上部署的步骤：

1. 上传代码到服务器
git clone your-repo
cd exhibition-nav
2. 配置 .env 文件
# 编辑 .env，主要改 NEXT_PUBLIC_API_URL
nano .env
3. 启动服务
docker compose -f docker-compose.prod.yml up -d
4. 开放防火墙端口（如果需要外部访问）
# Ubuntu/Debian
sudo ufw allow 3000  # 前端
sudo ufw allow 8000  # 后端 API
sudo ufw allow 5050  # pgAdmin（可选，建议不对外开放）
5. 就完成了！
   - 访问：http://your-server-ip:3000
   - 不需要任何端口转发脚本

💡 最佳实践建议

1. 使用域名（推荐）

NEXT_PUBLIC_API_URL=https://api.your-domain.com
然后用 Nginx 反向代理：
- your-domain.com → 前端 (3000)
- api.your-domain.com → 后端 (8000)

2. 使用 HTTPS

配置 SSL 证书（Let's Encrypt 免费）

3. 不要对外开放所有端口

# 只开放前端
sudo ufw allow 80   # HTTP
sudo ufw allow 443  # HTTPS

# 后端和数据库只在内网访问（通过 Nginx 代理）
# pgAdmin 也不要对外开放，或者限制 IP

4. 环境变量分离

# 生产环境单独一个 .env.production
cp .env .env.production
# 编辑 .env.production 使用生产配置


要使用 Nginx + 域名 + HTTPS 來部署你的系統，完整的實作步驟主要分為四個階段。以下為你整理出最標準、最不容易踩坑的實作步驟指南：第一階段：修改配置與啟動 Docker首先，我們需要調整你的專案配置，讓它準備好對接域名。1. 修改 .env 檔案將原本的 IP 或測試域名，改成你正式的後端域名（通常後端會用 api. 開頭）。bashnano .env
請謹慎使用程式碼。修改內容：envNEXT_PUBLIC_API_URL=https://your-domain.com
請謹慎使用程式碼。2. 啟動 Docker 服務在伺服器上下指令讓容器在背景執行。bashdocker compose -f docker-compose.prod.yml up -d
請謹慎使用程式碼。(注意：此時你的前端 3000 和後端 8000 已經在伺服器內部跑起來了，但我們還不需要對外開放這兩個埠號。)第二階段：安裝 Nginx 與設定防火牆接下來，我們在伺服器本機（而不是 Docker 內部）安裝 Nginx 當作流量導向的櫃檯。3. 安裝 Nginx (以 Ubuntu 系統為例)bashsudo apt update
sudo apt install nginx -y
請謹慎使用程式碼。4. 設定防火牆（只開安全埠）我們不對外開放 3000、8000 和 5432，只允許標準的網頁流量（HTTP 80 和 HTTPS 443）進入。bashsudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
請謹慎使用程式碼。第三階段：配置 Nginx 反向代理我們要寫一張「導航地圖」給 Nginx，告訴它遇到什麼網址要帶去哪裡。5. 建立 Nginx 設定檔bashsudo nano /etc/nginx/sites-available/exhibition-nav.conf
請謹慎使用程式碼。將以下內容貼進去（請將 your-domain.com 替換成你的實際域名）：nginx# 1. 前端對接 (your-domain.com -> 3000)
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:3000; # 導向 Docker 的前端
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

# 2. 後端 API 對接 (://your-domain.com -> 8000)
server {
    listen 80;
    server_name ://your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:8000; # 導向 Docker 的後端
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
請謹慎使用程式碼。6. 啟用設定並重啟 Nginxbash# 建立軟連結啟用設定
sudo ln -s /etc/nginx/sites-available/exhibition-nav.conf /etc/nginx/sites-enabled/

# 檢查語法有沒有寫錯
sudo nginx -t

# 重新載入 Nginx 讓設定生效
sudo systemctl restart nginx
請謹慎使用程式碼。第四階段：一鍵申請免費 SSL 證書 (HTTPS)最後一步，我們要用自動化工具 Certbot 來幫網站加上安全鎖頭，它會自動修改剛剛寫好的 Nginx 設定，將 http:// 升級成 https://。7. 安裝 Certbot 工具bashsudo apt install certbot python3-certbot-nginx -y
請謹慎使用程式碼。8. 執行申請指令bashsudo certbot --nginx -d your-domain.com -d ://your-domain.com
請謹慎使用程式碼。執行後系統會要求輸入 Email（對接到期通知）和同意條款（輸入 A）。最後它會問是否自動將 HTTP 轉跳到 HTTPS，請選擇 Redirect（通常是輸入數字 2）。9. 大功告成！現在你打開瀏覽器輸入 https://your-domain.com，就能安全地訪問你的前端網站，且後端 API 也能正常連線了。