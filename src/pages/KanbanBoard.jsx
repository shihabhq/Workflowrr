import React, { use, useEffect, useState } from "react";
import {
  DndContext,
  useSensor,
  useSensors,
  DragOverlay,
  MouseSensor,
  TouchSensor,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import Column from "../components/Column"; // Your column component
import TaskCard from "../components/TaskCard"; // Your task component
import TaskContext from "../contexts/TaskContext";
import Navbar from "../components/Navbar";
import useAxios from "../hooks/useAxios";
import AuthContext from "../contexts/AuthContext";
import Loading from "../components/Loading";
import { Toaster } from "react-hot-toast";

const KanbanBoard = () => {
  const { axiosPublic } = useAxios();

  const { user } = use(AuthContext);
  const columns = ["todo", "ongoing", "done"];
  const { tasks, setTasks, isLoading, refetch } = use(TaskContext);
  const [activeTask, setActiveTask] = useState(null);

  const handleDragStart = (event) => {
    if (event.active.data.current?.id) {
      setActiveTask(event.active.data.current);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;
    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    setTasks((tasks) => {
      const activeTaskIdx = tasks?.findIndex((task) => task.id === activeId);
      const overTaskIdx = tasks?.findIndex((task) => task.id === overId);

      return arrayMove(tasks, activeTaskIdx, overTaskIdx);
    });

    axiosPublic.put(`/tasks/${user.email}`, tasks);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;

    if (!over) return;
    const activeId = active.id;
    const overId = over.id;
    if (activeId === overId) return;

    setTasks((tasks) => {
      const activeTaskIdx = tasks?.findIndex((task) => task.id === activeId);
      const overTaskIdx = tasks?.findIndex((task) => task.id === overId);
      if (tasks[overTaskIdx]?.column) {
        tasks[activeTaskIdx].column = tasks[overTaskIdx].column;
        return arrayMove(tasks, activeTaskIdx, activeTaskIdx);
      } else {
        tasks[activeTaskIdx].column = over.id;
        return arrayMove(tasks, activeTaskIdx, activeTaskIdx);
      }
    });
  };

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Toaster />
      <Navbar />
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <div
          className="flex container mx-auto overflow-x-auto
        max-w-[90%] xl:max-w-[1280px] gap-12"
        >
          {columns.map((column) => {
            return (
              <Column
                key={column}
                column={column}
                tasks={tasks?.filter((task) => {
                  return task.column === column;
                })}
              />
            );
          })}
        </div>

        {/* Drag Preview */}
        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>
    </>
  );
};

export default KanbanBoard;
