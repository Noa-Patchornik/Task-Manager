from fastapi import FastAPI
from database import init_db
from tasks_router import router as tasks_router
app = FastAPI()

@app.on_event("startup")
async def on_startup():
    await init_db()

app.include_router(tasks_router)

@app.get("/")
async def root():
    return {"message": "Hello from FastAPI with Mongo!"}
