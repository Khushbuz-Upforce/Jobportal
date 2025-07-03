import React, { useCallback, useEffect, useState } from "react";
import { getApplications, updateApplicationStatus } from "../../../Servises/adminApi";
import AdminSidebarLayout from "../../../Components/AdminComponents/AdminSidebarLayout";
import ApplicationDetailsModal from "../../../Components/AdminComponents/ApplicationDetailsModal";
import { toast } from 'react-toastify';
import { DndContext } from "@dnd-kit/core";
import Column from "../../../Components/AdminComponents/Column";
import { Search } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const AdminApplicationsPage = () => {
    const [search, setSearch] = useState("");
    const [selectedApplication, setSelectedApplication] = useState(null);
    const queryClient = useQueryClient();

    // Query to fetch applications based on search term
    const {
        data: applications = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['applications', search],
        queryFn: () => getApplications(`search=${search}`).then(res => res.data.applications),
        keepPreviousData: true,
    });

    // Mutation for updating application status
    const mutation = useMutation({
        mutationFn: ({ id, status }) => updateApplicationStatus(id, status),
        onSuccess: () => {
            toast.success("Status updated");
            queryClient.invalidateQueries(['applications']);
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    });

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

    const handleDragEnd = async (event) => {
        const { active, over } = event;

        if (!over || !active) return;

        const applicationId = active.id;
        // console.log(active.id);

        const newStatus = over.id;
        // console.log(over.id);

        const draggedApp = applications.find((a) => a._id === applicationId);

        if (!draggedApp || draggedApp.status === newStatus) return;

        // Optimistically update UI
        queryClient.setQueryData(['applications', search], (oldData) =>
            oldData.map((app) =>
                app._id === applicationId ? { ...app, status: newStatus } : app
            )
        );

        mutation.mutate({ id: applicationId, status: newStatus });
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

                {isLoading ? (
                    <p className="text-center text-gray-500 mt-6">Loading applications...</p>
                ) : isError ? (
                    <p className="text-center text-red-500 mt-6">Failed to load applications.</p>
                ) : (
                    <DndContext onDragEnd={handleDragEnd}>
                        <div className="overflow-auto bg-gray-200 rounded-xl">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-4 p-0 md:p-4 min-w-[100%] lg:min-w-[2400px]">
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
                )}

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
