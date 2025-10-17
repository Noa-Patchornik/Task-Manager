import React, { useEffect } from "react";
import { getAllTasks } from "../services/tasksServices";
import TaskList from "../Components/TaskList";

function Home({ tasks, setTasks, loading, setLoading }) {
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

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div className="container">
      <h1>Hey Noa, here are your tasks:</h1>
      {tasks.length === 0 ? (
        <p>No tasks found</p>
      ) : (
        <TaskList tasks={tasks} setTasks={setTasks} />
      )}
    </div>
  );
}

export default Home;
