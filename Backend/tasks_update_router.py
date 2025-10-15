from fastapi import APIRouter, HTTPException
from beanie import PydanticObjectId
from models import Task
from typing import Optional, List
from datetime import date

router = APIRouter()


@router.put("/tasks/{id}")
async def update_task(
    id: str,
    title: Optional[str] = None,
    description: Optional[str] = None,
    done: Optional[bool] = None,
    deadline: Optional[date] = None,
    notes: Optional[List[str]] = None
):
    """
    update an existing task, only the fields that sent. Can't change the field "created at"
    """
    task = await Task.get(PydanticObjectId(id))
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    if title is not None:
        task.title = title
    if description is not None:
        task.description = description
    if done is not None:
        task.done = done
    if deadline is not None:
        task.deadline = deadline
    if notes is not None:
        task.notes = notes

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
