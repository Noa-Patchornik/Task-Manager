# database.py

import os
import motor.motor_asyncio
from beanie import init_beanie
from pydantic import BaseModel
from models import Task

MONGO_URI = os.getenv("MONGO_URI", "mongodb://mongo:27017/tasksdb")


async def init_db():
    """
    connect to mongo and get the db to beanie
    """

    client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URI, uuidRepresentation="standard")

    db = client.get_default_database()

    await init_beanie(database=db, document_models=[Task])

    print("✅ MongoDB connected successfully!")
