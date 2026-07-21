# backend/Dockerfile
# ---------------------------------------------------------
# 這個檔案告訴 Docker：怎麼從零開始，把一個裝好 Python + FastAPI
# 環境的容器「建」出來。
# ---------------------------------------------------------

# FROM: 選一個基礎映像檔當起點。
# "slim" 版本比完整版小很多，但保留足夠跑 Python 的東西，適合正式環境。
FROM python:3.12-slim

# WORKDIR: 設定容器內的「工作目錄」，之後的指令都是在這個目錄底下執行。
# 如果目錄不存在，Docker 會自動幫你建立。
WORKDIR /app

# 先只複製 requirements.txt 進來，不要一次把全部程式碼複製進來。
# 這是善用 Docker 的「分層快取」機制：只要 requirements.txt 沒變，
# 之後重新 build 時就不用重新跑 pip install，速度快很多。
COPY requirements.txt .

# RUN: 在建置映像檔的過程中執行指令。
# --no-cache-dir 讓 pip 不要保留下載快取，讓最終 image 體積小一點。
RUN pip install --no-cache-dir -r requirements.txt

# 這裡才把其餘程式碼複製進容器。
# 開發階段其實會被 docker-compose.yml 裡的 volume 掛載蓋過去，
# 但這行仍然重要：這樣「正式環境」(不用 volume 掛載) build 出來的
# image 才是完整、可以獨立運作的。
COPY . .

# EXPOSE: 純粹是「文件性質」的宣告，告訴看的人這個容器對外用 8000 port，
# 實際上要不要對外開放還是看 docker-compose.yml 裡的 ports 設定。
EXPOSE 8000

# CMD: 容器啟動時預設要跑的指令。
# --host 0.0.0.0 一定要設，不然容器內部服務只監聽 127.0.0.1，
# 外部（包括其他容器）會連不進來。
# --reload 讓程式碼一改就自動重啟，適合開發階段；
# 正式上線建議拿掉 --reload，並考慮改用 gunicorn + uvicorn worker。
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
