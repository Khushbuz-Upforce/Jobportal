import React, { useState } from "react";
import { getJobs, deleteJob, getJobCategories } from "../../../Servises/adminApi";
import JobTable from "../../../Components/AdminComponents/JobTable";
import JobFormModal from "../../../Components/AdminComponents/JobFormModal";
import AdminSidebarLayout from "../../../Components/AdminComponents/AdminSidebarLayout";
import JobDetailsModal from "../../../Components/AdminComponents/JobDetailsModal ";
import useDebounce from "../../../hooks/useDebounce";
import { useQuery, useMutation, useQueryClient, } from "@tanstack/react-query";
import { toast } from "react-toastify";

const AdminJobsPage = () => {
    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("");
    const [category, setCategory] = useState("");
    const [status, setStatus] = useState("");
    const [page, setPage] = useState(1);

    const [selectedJob, setSelectedJob] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedJobDetails, setSelectedJobDetails] = useState(null);

    const debouncedSearch = useDebounce(search);
    const debouncedLocation = useDebounce(location);

    const queryClient = useQueryClient();


    // ✅ Fetch Job Categories
    const { data: categoryData, isLoading: loadingCategories, } = useQuery({
        queryKey: ["jobCategories"],
        queryFn: getJobCategories,
        select: (res) => res.data.categories,
    });

    // ✅ Fetch Jobs
    const { data: jobData, isLoading: loadingJobs, error: jobsError, } = useQuery({
        queryKey: ["jobs", {
            search: debouncedSearch,
            location: debouncedLocation,
            category,
            status,
            page,
        },],
        queryFn: () => getJobs(new URLSearchParams({
            search: debouncedSearch,
            location: debouncedLocation,
            category,
            status,
            page,
            limit: 10,
        }).toString()
        ),
        keepPreviousData: true,
    });

    // ✅ Delete Job Mutation
    const deleteJobMutation = useMutation({
        mutationFn: deleteJob,
        onSuccess: () => {
            toast.success("Job deleted");
            queryClient.invalidateQueries(["jobs"]);
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || "Failed to delete job");
        },
    });

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this job?")) {
            deleteJobMutation.mutate(id);
        }
    };
    const jobs = jobData?.data?.jobs || [];
    const totalPages = jobData?.data?.totalPages || 1;
    const categoryList = categoryData || [];


    return (
        <AdminSidebarLayout>
            <div className="pt-3 px-2 md:px-3">
                <h1 className="text-xl mb-3 font-bold text-gray-800">Jobs List</h1>

                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="Search by title..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full border border-gray-300 p-1 px-2 text-[12px] rounded md:text-sm"
                    />
                    <input
                        type="text"
                        placeholder="Search by location..."
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full border border-gray-300 p-1 px-2 text-[12px] rounded md:text-sm"
                    />
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full border border-gray-300 p-1 px-2 text-[12px] rounded md:text-sm"
                    >
                        <option value="">All Categories</option>
                        {categoryList.map((cat, idx) => (
                            <option key={idx} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full border border-gray-300 p-1 px-2 text-[12px] rounded md:text-sm"
                    >
                        <option value="">All Statuses</option>
                        <option value="open">Open</option>
                        <option value="closed">Closed</option>
                        <option value="draft">Draft</option>
                    </select>
                </div>

                {/* Add Job Button */}
                <div className="mb-4 text-right">
                    <button
                        className="bg-green-600 text-white px-4 py-2 rounded"
                        onClick={() => {
                            setSelectedJob(null);
                            setShowModal(true);
                        }}
                    >
                        + Add Job
                    </button>
                </div>

                {loadingJobs ? (
                    <p className="text-center text-gray-500">Loading jobs...</p>
                ) : jobsError ? (
                    <p className="text-center text-red-500">Failed to load jobs</p>
                ) : (
                    <JobTable
                        jobs={jobs}
                        onEdit={(job) => {
                            setSelectedJob(job);
                            setShowModal(true);
                        }}
                        onDelete={handleDelete}
                        onView={(job) => setSelectedJobDetails(job)}
                    />
                )}

                {/* Pagination */}
                <div className="flex justify-center space-x-2 mt-4">
                    {[...Array(totalPages).keys()].map((num) => (
                        <button
                            key={num}
                            onClick={() => setPage(num + 1)}
                            className={`px-3 py-1 rounded ${page === num + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                        >
                            {num + 1}
                        </button>
                    ))}
                </div>

                {/* Job Form Modal */}
                {showModal && (
                    <JobFormModal
                        job={selectedJob}
                        onClose={() => setShowModal(false)}
                        onSuccess={() => {
                            setShowModal(false);
                            queryClient.invalidateQueries(["jobs"]);
                        }}
                    />
                )}

                {/* Job Details Modal */}
                {selectedJobDetails && (
                    <JobDetailsModal
                        job={selectedJobDetails}
                        onClose={() => setSelectedJobDetails(null)}
                    />
                )}
            </div>
        </AdminSidebarLayout>
    );
};

export default AdminJobsPage;
