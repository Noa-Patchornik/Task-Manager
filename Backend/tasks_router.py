from fastapi import APIRouter
from models import Task
from typing import List
from datetime import datetime, date
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


@router.get("/tasks", response_model=List[Task])
async def get_task_by_title(title):
    """
    return task by its title
    """
    task = await Task.find(Task.title == title)
    return task

@router.get("/tasks", response_model=List[Task])
async def get_task_by_id(id):
    """
    return task by its id
    """
    task = await Task.find(Task.id == id)
    return task

@router.get("/tasks", response_model=List[Task])
async def get_not_done_tasks():
    """
    return all the tasks in the DB that are not done yet
    """
    tasks = await Task.find(Task.done == False).to_list()
    return tasks

@router.get("/tasks", response_model=List[Task])
async def get_done_tasks():
    """
    return all the tasks in the DB that are done
    """
    tasks = await Task.find(Task.done == True).to_list()
    return tasks


@router.get("/tasks", response_model=List[Task])
async def get_deadline_today_tasks():
    """
    return all the tasks in the DB that are for today deadline
    """
    tasks = await Task.find(Task.deadline == datetime.today()).to_list()
    return tasks

@router.get("/tasks", response_model=List[Task])
async def get_deadline_today_and_not_done_tasks():
    """
    return all the tasks in the DB that are for today deadline and not done
    """
    tasks = await Task.find(Task.deadline == datetime.today(), Task.done == False).to_list()
    return tasks


# @router.get("/tasks", response_model=List[Task])
# async def get_for_this_week_tasks():
#     """
#     return all the tasks in the DB that their dealines are for this week
#     """
#     tasks = await Task.find(Task.deadline < datetime.today()+7).to_list()
#     return tasks


@router.delete("/tasks")
async def delete_task(task: Task):
    """
    delete a task from the DB
    """
    await task.delete()


