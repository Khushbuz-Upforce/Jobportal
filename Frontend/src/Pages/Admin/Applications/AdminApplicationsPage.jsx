import React, { useEffect, useState } from "react";
import { getApplications, updateApplicationStatus } from "../../../Servises/adminApi";
import AdminSidebarLayout from "../../../Components/AdminComponents/AdminSidebarLayout";
import ApplicationDetailsModal from "../../../Components/AdminComponents/ApplicationDetailsModal";
import { toast } from 'react-toastify';
import { DndContext } from "@dnd-kit/core";
import Column from "../../../Components/AdminComponents/Column";
import { Search } from "lucide-react";

const AdminApplicationsPage = () => {
    const [applications, setApplications] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedApplication, setSelectedApplication] = useState(null);

    const fetchApplications = async () => {
        const res = await getApplications(`search=${search}&page=${page}&limit=10`);
        setApplications(res.data.applications);
        // setTasks(res.data.applications);
        console.log(res.data.applications);

        setTotalPages(res.data.totalPages);
    };

    useEffect(() => {
        fetchApplications();

    }, [search, page]);

    const COLUMNS = [
        { id: 'TODO', title: 'To Do' },
        { id: 'Pending', title: 'Pending' },
        { id: 'Screening Round', title: 'Screening Round' },
        { id: 'Technical Round', title: 'Technical Round' },
        { id: 'Virtual Round', title: 'Virtual Round' },
        { id: 'Selected', title: 'Selected' },
        { id: 'Hired', title: 'Hired' },
        { id: 'Rejected', title: 'Rejected' },
    ];

    // const handleDragEnd = (event) => {
    //     const { active, over } = event;

    //     if (!over || !active) return;

    //     const sourceColumn = active.id; //1
    //     const targetColumn = over.id; //inpregress

    //     if (!sourceColumn || !targetColumn || sourceColumn === targetColumn) return;

    //     setTasks((prevTask) =>
    //         prevTask.map((task) =>
    //             active.id === task.id ? { ...task, status: targetColumn } : task
    //         )
    //     );
    // };


    const handleDragEnd = async (event) => {
        const { active, over } = event;

        if (!over || !active) return;

        const applicationId = active.id;
        // console.log(active.id);

        const newStatus = over.id;
        // console.log(over.id);

        const draggedApp = applications.find((a) => a._id === applicationId);

        if (!draggedApp || draggedApp.status === newStatus) return;

        try {
            // Optimistically update UI
            setApplications((prev) =>
                prev.map((app) =>
                    app._id === applicationId ? { ...app, status: newStatus } : app
                )
            );

            await updateApplicationStatus(applicationId, newStatus);
            toast.success("Status updated");
        } catch (error) {
            toast.error("Failed to update status");
            toast.error(error.response.data.message)
            // Revert on error
            setApplications((prev) =>
                prev.map((app) =>
                    app._id === applicationId ? { ...app, status: draggedApp.status } : app
                )
            );
        }
    };

    return (
        <AdminSidebarLayout>
            <div className="pt-3 px-2 md:px-3">
                <div className="flex gap-4 align-center justify-between">
                    <h1 className="text-xl mb-3 font-bold text-gray-800">
                        Applications
                    </h1>


                    <div className="relative w-full max-w-sm mb-4">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                            <Search className="text-gray-400 text-sm" size={18} />
                        </span>
                        <input
                            type="text"
                            placeholder="Search by applicant or job title..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                        />
                    </div>
                </div>
                <DndContext onDragEnd={handleDragEnd}>
                    <div className="">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-200">
                            {COLUMNS.map((column) => (
                                <Column
                                    key={column.id}
                                    column={column}
                                    app={applications.filter((task) => task.status === column.id)}
                                    onViewDetails={(app) => setSelectedApplication(app)}
                                />
                            ))}
                        </div>
                    </div>
                </DndContext>

                {/* Pagination */}
                <div className="flex flex-wrap justify-center mt-4 gap-2">
                    {[...Array(totalPages).keys()].map((num) => (
                        <button
                            key={num}
                            onClick={() => setPage(num + 1)}
                            className={`px-3 py-1 rounded text-sm ${page === num + 1
                                ? "bg-yellow-500 text-white"
                                : "bg-gray-200 text-gray-800"
                                }`}
                        >
                            {num + 1}
                        </button>
                    ))}
                </div>

                {/* Modal */}
                {selectedApplication && (
                    <ApplicationDetailsModal
                        application={selectedApplication}
                        onClose={() => setSelectedApplication(null)}
                    />
                )}
            </div>
        </AdminSidebarLayout>
    );
};

export default AdminApplicationsPage;
