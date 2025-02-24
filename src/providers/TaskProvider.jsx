import React, { useState, useEffect, useContext, use } from "react";
import TaskContext from "../contexts/TaskContext";
import AuthContext from "../contexts/AuthContext";
import useAxios from "../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const { axiosPublic } = useAxios();
  const { user } = use(AuthContext);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["alltasks"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/tasks/${user.email}`);
      return res.data;
    },
    enabled: !!user,
  });
  useEffect(() => {
    if (data?.length > 0) {
      setTasks(data);
    }
  }, [data]);

  // Fetch task data from the API when the component mounts

  const taskObj = { tasks, setTasks, isLoading, refetch };
  return (
    <TaskContext.Provider value={taskObj}>{children}</TaskContext.Provider>
  );
};

export default TaskProvider;
