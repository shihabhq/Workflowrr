import { use, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import AddTaskModal from "./AddTaskModal";
import TaskCard from "./TaskCard";
import {
  rectSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import FirstTask from "./FirstTask";

const Column = ({ column, tasks }) => {
  const [modal, setModal] = useState(false);

  return (
    <>
      <div
        key={column}
        className={`border basis-1/3 border-gray-100 
          ${
            column === "todo"
              ? "bg-todobg"
              : column === "ongoing"
              ? "bg-ongoingbg"
              : "bg-donebg"
          }
        p-4 min-w-64 rounded-lg flex flex-col min-h-[250px] h-fit`}
      >
        <h2
          className={`text-2xl mb-2 font-bold ${
            column === "todo"
              ? "text-todo"
              : column === "ongoing"
              ? "text-ongoing"
              : "text-done"
          }`}
        >
          {column.toUpperCase()}
        </h2>

        {/* Task List Container with flex-grow */}
        <SortableContext items={tasks} strategy={rectSortingStrategy}>
          <div className="flex flex-col space-y-4 flex-grow">
            {tasks?.length > 0 ? (
              tasks?.map((task) => <TaskCard key={task.id} task={task} />)
            ) : (
              <FirstTask column={column} />
            )}
            {}
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
