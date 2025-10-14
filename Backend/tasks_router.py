from fastapi import APIRouter
from models import Task
from typing import List
router = APIRouter()

@router.post("/tasks")
async def create_task(task: Task):
    """
    insert new task to the DB
    """
    await task.insert()
    return task



@router.get("/tasks", response_model=List[Task])
async def get_all_tasks():
    """
    return all the tasks in the DB
    """
    tasks = await Task.find_all().to_list()
    return tasks
