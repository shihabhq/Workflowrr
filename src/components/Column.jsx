import { use, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { useDroppable } from "@dnd-kit/core";
import AddTaskModal from "./AddTaskModal";
import TaskCard from "./TaskCard";
import {
  rectSortingStrategy,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TaskContext from "../contexts/TaskContext";

const Column = ({ column, tasks }) => {
  const [modal, setModal] = useState(false);

  return (
    <>
      <div
        key={column}
        className="border border-gray-300 p-4 rounded-lg flex flex-col min-h-[250px] h-fit"
      >
        <h2 className="text-2xl font-bold">{column}</h2>

        {/* Task List Container with flex-grow */}
        <SortableContext items={tasks} strategy={rectSortingStrategy}>
          <div className="flex flex-col space-y-4 flex-grow">
            {tasks?.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </SortableContext>

        {/* Add Task Button at the Bottom */}
        <button
          onClick={() => setModal(true)}
          className="text-black flex items-center justify-center  
        px-4 py-2 rounded-lg mt-4 gap-1
        font-semibold cursor-pointer hover:bg-gray-100 transition-all
        "
        >
          <CiCirclePlus size={24} /> Add Task
        </button>
      </div>
      {modal && (
        <AddTaskModal column={column} onClose={() => setModal(false)} />
      )}
    </>
  );
};

export default Column;
