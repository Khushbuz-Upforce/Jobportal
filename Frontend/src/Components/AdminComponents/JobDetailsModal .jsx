import React from "react";

const JobDetailsModal = ({ job, onClose }) => {
    const company = job.company || job.companyId || {};
    const isImage = job?.JobImage;



    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-y-auto max-h-[90vh]">
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800">Job Details</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-black text-lg">✕</button>
                </div>

                <div className="p-6 space-y-8">
                    {/* Job Info */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Job Information</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
                            <div><strong>Title:</strong> {job.title}</div>
                            <div><strong>Location:</strong> {job.location}</div>
                            <div><strong>Salary:</strong> {job.salary || "N/A"}</div>
                            <div><strong>Category:</strong> {job.category}</div>
                            <div><strong>Status:</strong> {job.status}</div>
                            <div><strong>Status:</strong> {job.status}</div>
                            <div className="sm:col-span-2">
                                <strong>Description:</strong>
                                <p className="mt-1 text-gray-600 whitespace-pre-line">{job.description || "N/A"}</p>
                            </div>


                            {/* Attachment */}
                            {job?.JobImage && (
                                <div className="sm:col-span-2">
                                    <strong>Attachment:</strong>
                                    <div className="mt-2">
                                        {isImage ? (
                                            <img
                                                src={job?.JobImage}
                                                alt="Attachment"
                                                className="max-h-48 rounded-lg border"
                                            />
                                        ) : (
                                            <a
                                                href={job.JobImage}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline"
                                            >
                                                View Attachment
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Company Info */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Company Information</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 items-center">
                            <div className="flex items-center space-x-3">
                                {company.logo && (
                                    <img
                                        src={company.logo}
                                        alt="Company Logo"
                                        className="w-12 h-12 object-cover rounded-full border"
                                    />
                                )}
                                <span className="font-medium">{company.name || "N/A"}</span>
                            </div>
                            <div>
                                <strong>Email:</strong> {company.email || "N/A"}
                            </div>
                            <div>
                                <strong>Industry:</strong> {company.industry || "N/A"}
                            </div>
                            <div>
                                <strong>Website:</strong>{" "}
                                {company.website ? (
                                    <a
                                        href={company.website}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-blue-600 hover:underline break-words"
                                    >
                                        {company.website}
                                    </a>
                                ) : "N/A"}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end p-6 border-t border-gray-200">
                    <button
                        onClick={onClose}
                        className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JobDetailsModal;
