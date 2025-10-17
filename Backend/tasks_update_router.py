from fastapi import APIRouter, HTTPException, Body
from beanie import PydanticObjectId
from models import Task
from typing import Optional, List
from datetime import date

router = APIRouter()


@router.put("/tasks/{id}")
async def update_task(
    id: str,
    data: dict = Body(...)
):
    """
    Update an existing task from a JSON body
    """
    task = await Task.get(PydanticObjectId(id))
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    allowed_fields = {"title", "description", "done", "deadline", "notes"}
    for key, value in data.items():
        if key in allowed_fields:
            setattr(task, key, value)

    await task.save()
    return task


@router.patch("/tasks/{id}/add_note")
async def add_note_to_task(id: str, note: str):
    """
    add a note to the list of notes
    """
    task = await Task.get(PydanticObjectId(id))
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    if task.notes is None:
        task.notes = []

    task.notes.append(note)
    await task.save()
    return task
