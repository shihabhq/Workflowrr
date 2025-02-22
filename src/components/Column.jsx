import TaskCard from "./TaskCard";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function Column({ title, tasks }) {
  const queryClient = useQueryClient();

  const addTaskMutation = useMutation({
    mutationFn: async () => {
      const newTask = { title: "New Task", status: title, userID: "123" };
      const res = await axios.post("http://localhost:5000/tasks", newTask);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks", "123"]);
    },
  });

  return (
    <div className="w-1/3 bg-gray-200 p-4 rounded-md">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
      <button
        className="mt-4 w-full bg-blue-500 text-white py-1 rounded-md"
        onClick={() => addTaskMutation.mutate()}
      >
        + Add Task
      </button>
    </div>
  );
}
