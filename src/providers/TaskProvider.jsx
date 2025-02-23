import React, { useState } from "react";
import TaskContext from "../contexts/TaskContext";

const TaskProvider = ({ children }) => {
  const initialTasks = [
    { id: "1", title: "Task 1", column: "todo" },
    { id: "2", title: "Task 2", column: "todo" },
    { id: "3", title: "Task 3", column: "ongoing" },
    { id: "4", title: "Task 4", column: "done" },
  ];

  const [tasks, setTasks] = useState(initialTasks);


  const taskObj = { tasks, setTasks };
  return <TaskContext value={taskObj}>{children}</TaskContext>;
};

export default TaskProvider;
