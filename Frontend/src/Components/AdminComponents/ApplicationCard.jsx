import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { FileText } from "lucide-react";

const ApplicationCard = ({ task, onViewDetails }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task._id,
        data: { column: task.status },
    });

    const style = {
        transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : undefined,
        transition: !transform ? "transform 0.2s ease" : undefined,
    };

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={style}
            className="w-full bg-white p-4 rounded-xl shadow-sm text-sm cursor-grab border border-gray-200 hover:shadow-md transition-all"
        >
            {/* Header */}
            <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                    <p className="font-semibold text-gray-800 truncate">
                        {task.applicantName || "Unnamed Applicant"}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                        {task.jobId?.title || "No job title"}
                    </p>
                </div>
                <span className="text-[10px] bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full uppercase font-medium">
                    {task.status}
                </span>
            </div>

            {/* Cover Letter */}
            <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                {task.coverLetter?.slice(0, 100) || "No cover letter"}...
            </p>

            {/* Contact Info */}
            <div className="text-xs text-gray-600 space-y-1 mb-3">
                <p><strong>Email:</strong> {task.email || "N/A"}</p>
                <p><strong>Phone:</strong> {task.phone || "N/A"}</p>
            </div>

            {/* Footer: Resume and Button */}
            <div className="flex justify-between items-center">
                <a
                    href={task.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-600 text-xs underline flex items-center gap-1 hover:text-yellow-700 transition"
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
