import React from "react";
import { useDroppable } from "@dnd-kit/core";
import ApplicationCard from "./ApplicationCard";

const Column = ({ column, app, onViewDetails }) => {
    const { setNodeRef } = useDroppable({
        id: column.id
    })
    return (
        <div ref={setNodeRef} className="bg-gray-100 rounded p-3 min-h-[200px] shadow">
            <h2 className="font-semibold text-md mb-2">{column.title}</h2>
            <div className="space-y-2">
                {app.map((task) => (
                    <ApplicationCard key={task._id} task={task} onViewDetails={onViewDetails} />
                ))}
            </div>
        </div>
    );
};

export default Column;
