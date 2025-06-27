import React, { useEffect, useState } from "react";
import { GetUserApplications } from "../../Servises/userApi";
import { FaDownload } from "react-icons/fa";
import Navbar from "../../Components/Navbar";

const statusColors = {
    Pending: "bg-yellow-100 text-yellow-800",
    Reviewed: "bg-blue-100 text-blue-800",
    Shortlisted: "bg-purple-100 text-purple-800",
    Rejected: "bg-red-100 text-red-800",
    Hired: "bg-green-100 text-green-800",
};

const MyApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await GetUserApplications();
                setApplications(res.data.applications);
                console.log(res.data.applications);

            } catch (err) {
                console.error("Failed to load applications", err);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);

    return (
        <>
            <Navbar />
            <div className="p-6 pt-20 max-w-4xl mx-auto">
                <h2 className="text-xl md:text-2xl font-semibold mb-6 text-gray-800">
                    My Job Applications
                </h2>

                {loading ? (
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="animate-pulse p-4 border rounded bg-white shadow">
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                <div className="h-3 bg-gray-200 rounded w-1/2 mb-1"></div>
                                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                            </div>
                        ))}
                    </div>
                ) : applications.length === 0 ? (
                    <p className="text-gray-500">You haven't applied to any jobs yet.</p>
                ) : (
                    <div className="space-y-4">
                        {applications.map((app) => (
                            <div
                                key={app._id}
                                className="border p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition"
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {app.jobId?.title || "Job Title"}
                                    </h3>
                                    <span
                                        className={`px-2 py-1 text-sm rounded-full font-medium ${statusColors[app.status] || "bg-gray-100 text-gray-800"
                                            }`}
                                    >
                                        {app.status}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 mb-1">
                                    Applied on:{" "}
                                    <span className="font-medium">
                                        {new Date(app.createdAt).toLocaleDateString()}
                                    </span>
                                </p>
                                <a
                                    href={app.resume}
                                    download="resume.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 mt-2 text-blue-600 hover:underline text-sm"
                                >
                                    <FaDownload className="text-sm" /> Download Resume
                                </a>

                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default MyApplications;
