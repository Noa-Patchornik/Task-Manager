import React, { useEffect, useState } from "react";
import { getAllTasks } from "../services/tasksServices";
import TaskList from "../Components/TaskList";
import TaskFilter from "../Components/TaskFilter";

function Home({ tasks, setTasks, loading, setLoading }) {
  const [filter, setFilter] = useState("all");

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await getAllTasks();
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const today = new Date();
  const filteredTasks = tasks.filter((task) => {
    if (filter === "done") return task.done;
    if (filter === "not_done") return !task.done;

    if (filter === "today" && task.deadline) {
      const deadline = new Date(task.deadline);
      return (
        deadline.getFullYear() === today.getFullYear() &&
        deadline.getMonth() === today.getMonth() &&
        deadline.getDate() === today.getDate()
      );
    }

    if (filter === "week" && task.deadline) {
      const deadline = new Date(task.deadline);
      const nextWeek = new Date(today);
      nextWeek.setDate(today.getDate() + 7);
      return deadline >= today && deadline <= nextWeek;
    }

    return true; // ברירת מחדל — כל המשימות
  });

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div className="container" style={{ maxWidth: "700px", margin: "0 auto" }}>
      <h1>Hey Noa, here are your tasks:</h1>
      <TaskFilter filter={filter} setFilter={setFilter} />
      {filteredTasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        <TaskList tasks={filteredTasks} setTasks={setTasks} />
      )}
    </div>
  );
}

export default Home;
