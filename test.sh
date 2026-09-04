# 1. 查看 WSL IP (確認)
wsl hostname -I
WSL IP 還是 172.22.135.122，重新設定端口轉發：

# 1. 移除舊規則
netsh interface portproxy delete v4tov4 listenport=3000 listenaddress=0.0.0.0

# 2. 添加新規則
netsh interface portproxy add v4tov4 listenport=3000 listenaddress=0.0.0.0 connectport=3000 connectaddress=172.22.135.122

# 3. 確認設定
netsh interface portproxy show v4tov4

試試暫時關閉防火牆測試：

# 暫時關閉（測試用）
Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled False

# 測試後記得開回來
Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled True