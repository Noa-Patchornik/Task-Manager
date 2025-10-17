from beanie import Document
from pydantic import Field
from typing import Optional, List
from datetime import date, datetime


class Task(Document):
    title: str = Field(..., description="Title of the task")
    description: Optional[str] = Field(default="", description="Description of the task")
    done: bool = Field(default=False, description="Is the task done")
    deadline: Optional[date] = Field(default=None, description="Optional deadline for the task")
    notes: Optional[List[str]] = Field(default_factory=list, description="List of notes")
    created_at: datetime = Field(default_factory=datetime.utcnow, description="Creation timestamp")

    class Settings:
        name = "tasks"
