import React, { use, useState } from "react";
import {
  DndContext,
  closestCorners,
  useSensor,
  useSensors,
  PointerSensor,
  DragOverlay,
  MouseSensor,
  TouchSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Column from "../components/Column"; // Your column component
import TaskCard from "../components/TaskCard"; // Your task component
import TaskContext from "../contexts/TaskContext";
import Navbar from "../components/Navbar";

const KanbanBoard = () => {
  const columns = ["todo", "ongoing", "done"];
  const { tasks } = use(TaskContext);
  const [activeTask, setActiveTask] = useState(null);

  const handleDragStart = (event) => {
    if (event.active.data.current?.id) {
      setActiveTask(event.active.data.current);
    }
  };

  const handleDragEnd = (event) => {
    const {active,over} = event
    
  };

  const handleDragOver = (event) => {
    console.log("drag over", event);
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

  return (
    <>
      <Navbar />
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <div
          className="grid grid-cols-3 container mx-auto
        max-w-[1280px] gap-12"
        >
          {columns.map((column) => {
            return (
              <Column
                key={column}
                column={column}
                tasks={tasks.filter((task) => {
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
