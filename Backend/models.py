# models.py

from typing import Optional, List
from datetime import datetime, date
from beanie import Document

class Task(Document):
    title: str
    description: Optional[str] = None
    done: bool = False
    created_at: datetime = datetime.utcnow()
    deadline: Optional[date] = None
    notes: Optional[List[str]] = None

    class Settings:
        name = "tasks"
