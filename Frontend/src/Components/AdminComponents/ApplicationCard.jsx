import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { BadgeCheck, FileText } from "lucide-react"; // Optional: Use any icons you like

const ApplicationCard = ({ task, onViewDetails }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task._id,
        data: { column: task.status }
    });

    const style = {
        transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : undefined,
        transition: !transform ? 'transform 0.2s ease' : undefined,
    };

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={style}
            className="bg-white p-4 rounded shadow-sm text-sm cursor-grab border border-gray-200 hover:shadow-md transition-all"
        >
            <div className="flex justify-between items-start">
                <div>
                    <p className="font-semibold text-gray-800">{task.applicantName}</p>
                    <p className="text-xs text-gray-500">{task.jobId?.title}</p>
                </div>
                <span className="text-[10px] bg-yellow-100 text-yellow-600 px-2 py-0.5 rounded-full">
                    {task.status}
                </span>
            </div>

            <p className="text-xs text-gray-600 mt-2 line-clamp-2">
                {task.coverLetter?.slice(0, 100)}...
            </p>

            <div className="mt-3 text-xs text-gray-600">
                <p><strong>Email:</strong> {task.email}</p>
                <p><strong>Phone:</strong> {task.phone}</p>
            </div>

            <div className="flex justify-between items-center mt-3">
                <a
                    href={task.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-500 text-xs underline flex items-center gap-1"
                >
                    <FileText size={14} /> Resume
                </a>
                <button
                    onClick={() => onViewDetails(task)}
                    className="text-[11px] text-white bg-green-500 px-2 py-1 rounded hover:bg-green-600 transition"
                >
                    View Details
                </button>
            </div>
        </div>
    );
};

export default ApplicationCard;
