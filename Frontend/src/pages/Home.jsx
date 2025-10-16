
import React from "react";
import TaskList from "../Components/TaskList";

function Home() {
  return (
    <div className="container">
      <h1>Hey Noa 👋<br />This is your task list</h1>
      <TaskList />
    </div>
  );
}

export default Home;
