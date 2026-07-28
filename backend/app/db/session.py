# app/db/session.py
# ---------------------------------------------------------
# 這支檔案負責「建立跟資料庫的連線」，其他需要查資料庫的
# API(例如 api/route.py)都從這裡 import engine 來用，
# 這樣連線設定只寫一次，不會每支API各自建立一份。
# ---------------------------------------------------------

from sqlalchemy import create_engine
from app.core.config import settings

# create_engine 這裡先不真的連線，只是「準備好怎麼連」，
# 實際連線是等到有人執行查詢(engine.connect())的那一刻才發生，
# 而且 SQLAlchemy 內部會自動管理一個連線池，重複使用連線，
# 不用你自己手動開關連線。
engine = create_engine(settings.DATABASE_URL)
