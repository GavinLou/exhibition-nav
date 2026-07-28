# app/core/config.py
# ---------------------------------------------------------
# 這支檔案的工作很單純：把 docker-compose.yml 裡設定的
# environment 變數(DATABASE_URL、OPENAI_API_KEY)讀進 Python，
# 變成一個好用的物件，其他檔案要用設定值都從這裡 import，
# 不要在各處自己寫 os.environ.get(...)，不然設定散落各地很難維護。
# ---------------------------------------------------------

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # 這裡的變數名稱要跟 docker-compose.yml 裡 environment: 設定的
    # 名稱完全一樣，pydantic-settings 會自動去讀同名的環境變數填進來。
    DATABASE_URL: str
    OPENAI_API_KEY: str = ""  # 給預設空字串，現在還沒用到AI也不會啟動失敗


# 建立一個全域唯一的設定物件，其他檔案 import settings 來用即可，
# 例如：from app.core.config import settings → settings.DATABASE_URL
settings = Settings()
