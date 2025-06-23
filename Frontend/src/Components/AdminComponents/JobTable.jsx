import { Edit, Trash2, Eye } from 'lucide-react';

export default function JobTable({ jobs, onEdit, onDelete, onView }) {
    return (
        <div className="overflow-x-auto bg-white shadow-md rounded-xl">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-200 text-gray-600 uppercase text-xs">
                    <tr>
                        <th className="p-2 text-left">ID</th>
                        <th className="p-2 text-left">Title</th>
                        <th className="p-2 text-left">Location</th>
                        <th className="p-2 text-left">Salary</th>
                        <th className="p-2 text-left">Category</th>
                        <th className="p-2 text-left">Status</th>
                        <th className="p-2 text-left">Actions</th>
                    </tr>
                </thead >
                <tbody>
                    {jobs.map((job, i) => (
                        <tr key={job._id} className="border-t">
                            <td className="p-2">{++i}</td>
                            <td className="p-2">{job.title}</td>
                            <td className="p-2">{job.location}</td>
                            <td className="p-2">{job.salary}</td>
                            <td className="p-2">{job.category}</td>
                            <td className="p-2 capitalize">{job.status}</td>
                            <td className="p-2 flex items-center space-x-3">

                                <button
                                    onClick={() => onEdit(job)}
                                    className="text-blue-600 hover:text-blue-800"
                                    title="Edit"
                                >
                                    <Edit size={18} />
                                </button>
                                <button
                                    onClick={() => onDelete(job._id)}
                                    className="text-red-600 hover:text-red-800"
                                    title="Delete"
                                >
                                    <Trash2 size={18} />
                                </button>
                                <button
                                    onClick={() => onView(job)}
                                    className="text-green-700 hover:text-black"
                                    title="View Details"
                                >
                                    <Eye size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table >
        </div >
    );
}
