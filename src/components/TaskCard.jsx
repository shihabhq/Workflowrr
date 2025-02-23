import { useSortable } from "@dnd-kit/sortable";
import React, { use, useState, useRef } from "react";
import { CSS } from "@dnd-kit/utilities";
import { HiOutlineTrash } from "react-icons/hi2";
import TaskContext from "../contexts/TaskContext";

const TaskCard = ({ task }) => {
  const { tasks, setTasks } = use(TaskContext);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const titleRef = useRef(null);
  const descRef = useRef(null);

  const deleteTask = (id) => {
    const newTask = tasks.filter((task) => task.id !== id);
    setTasks(newTask);
  };

  const updateTask = (key, value) => {
    const updatedTasks = tasks.map((t) =>
      t.id === task.id ? { ...t, [key]: value } : t
    );
    setTasks(updatedTasks);
  };

  const handleBlur = (key, value) => {
    updateTask(key, value);
    setIsEditingTitle(false);
    setIsEditingDescription(false);
  };

  const handleKeyDown = (e, key, value) => {
    if (e.key === "Enter") {
      handleBlur(key, value);
    }
  };

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id, data: task });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        className="bg-white w-full shadow-lg opacity-30 p-4 rounded-lg h-[100px]"
      >
        <h3 className="text-base font-semibold font-inter">{task.title}</h3>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="bg-white overflow-hidden w-full shadow-lg relative p-4 rounded-lg h-[100px]"
    >
      {isEditingTitle ? (
        <input
          ref={titleRef}
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          onBlur={() => handleBlur("title", editedTitle)}
          onKeyDown={(e) => handleKeyDown(e, "title", editedTitle)}
          autoFocus
          className="text-base font-semibold font-inter w-full border rounded px-1"
        />
      ) : (
        <h3
          className="text-base font-semibold font-inter "
          onClick={() => setIsEditingTitle(true)}
        >
          {task.title}
        </h3>
      )}
      
      {isEditingDescription ? (
        <textarea
          ref={descRef}
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          onBlur={() => handleBlur("description", editedDescription)}
          onKeyDown={(e) => handleKeyDown(e, "description", editedDescription)}
          autoFocus
          className="text-sm font-medium text-gray-500 w-full border rounded px-1"
        />
      ) : (
        <p
          className="text-sm font-medium text-gray-500 max-h-[60px] overflow-y-auto"
          onClick={() => setIsEditingDescription(true)}
        >
          {task.description}
        </p>
      )}

      <button
        onClick={() => deleteTask(task.id)}
        className="absolute cursor-pointer transition hover:text-red-500 top-4 right-2"
      >
        <HiOutlineTrash size={20} />
      </button>
    </div>
  );
};

export default TaskCard;
