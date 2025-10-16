from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import init_db
from tasks_router import router as tasks_router
from tasks_update_router import router as tasks_update_router
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # או ["*"] לפיתוח
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def on_startup():
    await init_db()

app.include_router(tasks_router)
app.include_router(tasks_update_router)

@app.get("/")
async def root():
    return {"message": "Hello from FastAPI with Mongo!"}
