import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function TaskCard({ task }) {
  const queryClient = useQueryClient();

  const deleteTaskMutation = useMutation({
    mutationFn: async () => {
      await axios.delete(`http://localhost:5000/tasks/${task._id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks", "123"]);
    },
  });

  return (
    <div className="bg-white p-2 mb-2 shadow-md flex justify-between items-center">
      <span>{task.title}</span>
      <button className="text-red-500" onClick={() => deleteTaskMutation.mutate()}>
        ❌
      </button>
    </div>
  );
}
