import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Column from "./Column";

const userID = "123"; // Example user

export default function KanbanBoard() {
  const queryClient = useQueryClient();

  // Fetch tasks
  const { data: tasks = [] } = useQuery({
    queryKey: ["tasks", userID],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/tasks/${userID}`);
      return res.data;
    },
  });

  // Group tasks into columns
  const groupedTasks = {
    todo: tasks.filter((task) => task.status === "todo"),
    inProgress: tasks.filter((task) => task.status === "inProgress"),
    done: tasks.filter((task) => task.status === "done"),
  };

  return (
    <div className="flex gap-4 p-4">
      {["todo", "inProgress", "done"].map((status) => (
        <Column key={status} title={status} tasks={groupedTasks[status]} />
      ))}
    </div>
  );
}
