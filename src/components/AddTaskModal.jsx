import React, { use, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TaskContext from "../contexts/TaskContext";
import useAxios from "../hooks/useAxios";
import AuthContext from "../contexts/AuthContext";
import toast from "react-hot-toast";

const AddTaskModal = ({ column, onClose }) => {
  const { setTasks, tasks } = use(TaskContext);
  const { axiosPublic } = useAxios();
  const { user } = use(AuthContext);
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const handleTaskChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!task.title.trim()) {
      toast.error("task title cannot be empty");
      return;
    }
    const tempId = uuidv4();
    const newTask = { id: tempId, ...task, column: column };
    setTasks((prev) => [...prev, newTask]);
    onClose();
    await axiosPublic.patch(`/tasks/${user.email}`, newTask);

    setTask({ title: "", description: "" });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      <div
        onClick={onClose}
        className="bg-black absolute z-40 opacity-20 h-full w-full"
      ></div>
      <div className="bg-white p-6 rounded-lg z-100 shadow-lg w-96">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Add Task to <span className="text-btn">{column}</span>
        </h2>

        <div className="space-y-4">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Task Title
            </label>
            <input
              type="text"
              name="title"
              value={task.title}
              onChange={handleTaskChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-btn focus:outline-none"
              placeholder="Enter task title"
            />
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={task.description}
              onChange={handleTaskChange}
              rows="3"
              className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-btn focus:outline-none"
              placeholder="Enter task description(optional)"
            ></textarea>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-5 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 
            cursor-pointer text-sm font-semibold rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-btn text-white
            cursor-pointer hover:opacity-85 text-sm font-semibold 
            rounded-lg hover:bg-btn transition"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
