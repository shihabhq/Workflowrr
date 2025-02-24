import { useSortable } from "@dnd-kit/sortable";
import React from "react";
import { CSS } from "@dnd-kit/utilities";

const FirstTask = ({ column }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: column, data: { id: "1144", column: column } });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      aria-disabled={true}
      className="text-base text-center 
   font-semibold text-gray-400"
      ref={setNodeRef}
    >
      no task
    </div>
  );
};

export default FirstTask;
