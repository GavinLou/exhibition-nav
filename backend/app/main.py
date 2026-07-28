# app/main.py
# ---------------------------------------------------------
# 整個FastAPI應用程式的進入點。這支檔案只負責：
#   1. 建立 app 物件
#   2. 把各個模組寫好的 router 掛進來
# 不在這裡寫實際的商業邏輯(那些寫在 api/ 底下各自的檔案)。
# ---------------------------------------------------------

from fastapi import FastAPI

from app.api import route as route_api

app = FastAPI(title="展覽導航系統 API")

# include_router：把 route.py 裡定義的 /route、/poi 這些端點，
# 掛到路徑前綴 /api 底下，所以實際呼叫網址會變成
# /api/route、/api/poi。
# prefix 讓你以後可以很清楚分辨「這是GIS相關的API」，
# 之後加AI對話的router可能會掛成 /api/chat 前綴。
app.include_router(route_api.router, prefix="/api", tags=["GIS路徑"])


@app.get("/")
def read_root():
    return {"status": "ok", "message": "FastAPI 後端運作中"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}
