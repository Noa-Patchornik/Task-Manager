from fastapi import APIRouter, HTTPException
from beanie import PydanticObjectId
from beanie.operators import Or, And
from models import Task
from typing import List
from datetime import date, timedelta

router = APIRouter()

# creat new task
@router.post("/tasks")
async def create_task(task: Task):
    if task.deadline == "":
        task.deadline = None
    await task.insert()
    return task


# get all tasks
@router.get("/tasks", response_model=List[Task])
async def get_all_tasks():
    tasks = await Task.find_all().to_list()
    return tasks


# get task by its title
@router.get("/tasks/by_title/{title}", response_model=Task)
async def get_task_by_title(title: str):
    task = await Task.find_one(Task.title == title)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


# get task by ID
@router.get("/tasks/by_id/{id}", response_model=Task)
async def get_task_by_id(id: str):
    task = await Task.get(PydanticObjectId(id))
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


# all not done tasks
@router.get("/tasks/not_done", response_model=List[Task])
async def get_not_done_tasks():
    tasks = await Task.find(Task.done == False).to_list()
    return tasks


# all done tasks
@router.get("/tasks/done", response_model=List[Task])
async def get_done_tasks():
    tasks = await Task.find(Task.done == True).to_list()
    return tasks


# tasks with deadline for today or none
@router.get("/tasks/deadline_today", response_model=List[Task])
async def get_deadline_today_tasks():
    today = date.today()
    tasks = await Task.find(
        Or(Task.deadline == today, Task.deadline == None)
    ).to_list()
    return tasks


# tasks with deadline for today or none that was not done yet
@router.get("/tasks/deadline_today_not_done", response_model=List[Task])
async def get_deadline_today_and_not_done_tasks():
    today = date.today()
    tasks = await Task.find(
        And(
            Or(Task.deadline == today, Task.deadline == None),
            Task.done == False
        )
    ).to_list()
    return tasks


# get tasks that their dealine is in this week or none
@router.get("/tasks/this_week", response_model=List[Task])
async def get_for_this_week_tasks():
    today = date.today()
    next_week = today + timedelta(days=7)
    tasks = await Task.find(
        Or(
            Task.deadline == None,
            And(Task.deadline >= today, Task.deadline <= next_week)
        )
    ).to_list()
    return tasks


# delete a task by its ID
@router.delete("/tasks/{id}")
async def delete_task(id: str):
    task = await Task.get(PydanticObjectId(id))
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    await task.delete()
    return {"message": "Task deleted successfully"}
