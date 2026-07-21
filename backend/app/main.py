from fastapi import FastAPI

app = FastAPI(title="展覽導航系統 API")


@app.get("/")
def read_root():
    return {"status": "ok", "message": "FastAPI 後端運作中"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}
