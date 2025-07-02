import React from "react";
import { useDroppable } from "@dnd-kit/core";
import ApplicationCard from "./ApplicationCard";

const Column = ({ column, app, onViewDetails }) => {
    const { setNodeRef } = useDroppable({
        id: column.id
    })
    return (
        <div
            ref={setNodeRef}
            className=" rounded p-3 min-h-[200px] w-full flex flex-col"
        >     <h2 className="font-semibold text-md text-center capitalize">{column.title}</h2>
            <h4 className="font-semibold text-gray-500 text-xs mb-2 pb-5 text-center capitalize">
                {app.length} {app.length === 1 ? "application" : "applications"}
            </h4>
            <div className="space-y-2">
                {app.map((task) => (
                    <ApplicationCard key={task._id} task={task} onViewDetails={onViewDetails} />
                ))}
            </div>
        </div>
    );
};

export default Column;
