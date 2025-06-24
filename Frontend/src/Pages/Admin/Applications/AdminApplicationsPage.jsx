import React, { useEffect, useState } from "react";
import { getApplications } from "../../../Servises/adminApi";
import AdminSidebarLayout from "../../../Components/AdminComponents/AdminSidebarLayout";
import ApplicationTable from "../../../Components/AdminComponents/ApplicationTable";
import ApplicationDetailsModal from "../../../Components/AdminComponents/ApplicationDetailsModal";
import socket from "../../../socket"; // 🔌 Socket.IO client
import { toast } from 'react-toastify';

const AdminApplicationsPage = () => {
    const [applications, setApplications] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedApplication, setSelectedApplication] = useState(null);

    const fetchApplications = async () => {
        const res = await getApplications(`search=${search}&page=${page}&limit=10`);
        setApplications(res.data.applications);
        console.log(res.data.applications);

        setTotalPages(res.data.totalPages);
    };

    useEffect(() => {
        fetchApplications();

    }, [search, page]);

    // Listen to real-time updates from Socket.IO
    useEffect(() => {
        socket.on("new-application", (newApp) => {
            toast.success("New application received");

            // Only update if on the first page
            if (page === 1) {
                setApplications(prev => [newApp, ...prev.slice(0, 9)]); // Keep max 10
            }
        });

        return () => socket.off("new-application");
    }, [page]);

    return (
        <AdminSidebarLayout>
            <div className="pt-3 px-2 md:px-3">
                <h1 className="text-xl mb-3 font-bold text-gray-800">
                    Applications
                </h1>

                <input
                    type="text"
                    placeholder="Search by applicant or job title..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-50 border border-gray-300 p-1 px-2 text-[12px] rounded mb-4 md:text-sm"
                />

                <ApplicationTable
                    applications={applications}
                    onView={(app) => setSelectedApplication(app)}
                />

                {/* Pagination */}
                <div className="flex flex-wrap justify-center mt-4 gap-2">
                    {[...Array(totalPages).keys()].map((num) => (
                        <button
                            key={num}
                            onClick={() => setPage(num + 1)}
                            className={`px-3 py-1 rounded text-sm ${page === num + 1
                                ? "bg-blue-500 text-white"
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
