import React from "react";
import { X } from "lucide-react";

const ApplicationDetailsModal = ({ application, onClose }) => {
    const {
        applicantName,
        email,
        phone,
        coverLetter,
        resume,
        createdAt,
        jobId,
        status
    } = application;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 md:p-8 animate-fade-in overflow-y-auto max-h-[90vh]">
                {/* Decorative Gradient Layer */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-50/20 via-white/30 to-gray-100/10 pointer-events-none backdrop-blur-sm" />

                {/* Close Button */}
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
                    onClick={onClose}
                >
                    <X size={22} />
                </button>

                {/* Header */}
                <div className="relative z-10 mb-6 text-center">
                    <div className="flex flex-col items-center">
                        <div className="w-14 h-14 bg-yellow-100 text-yellow-700 font-bold flex items-center justify-center rounded-full text-xl uppercase">
                            {applicantName?.charAt(0)}
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800 mt-2">{applicantName}</h2>
                        <p className="text-sm text-gray-500">{email}</p>
                    </div>
                </div>

                {/* Grid Info */}
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                    <div><span className="font-medium text-gray-900">Phone:</span> {phone || "N/A"}</div>
                    <div><span className="font-medium text-gray-900">Applied On:</span> {new Date(createdAt).toLocaleString()}</div>
                    <div><span className="font-medium text-gray-900">Job Title:</span> {jobId?.title || "N/A"}</div>
                    <div><span className="font-medium text-gray-900">Location:</span> {jobId?.location || "N/A"}</div>
                    <div><span className="font-medium text-gray-900">Category:</span> {jobId?.category || "N/A"}</div>
                    <div>
                        <span className="font-medium text-gray-900">Status:</span>{" "}
                        <span className="ml-1 inline-block px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs">
                            {status || "N/A"}
                        </span>
                    </div>
                    {resume && (
                        <div>
                            <span className="font-medium text-gray-900">Resume:</span>{" "}
                            <a
                                href={resume}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-yellow-600 underline ml-1"
                            >
                                Download
                            </a>
                        </div>
                    )}
                </div>

                {/* Cover Letter */}
                {coverLetter && (
                    <div className="relative z-10 mt-6">
                        <span className="block font-medium text-gray-900 mb-1">Cover Letter:</span>
                        <div className="bg-gray-50 p-4 rounded-lg border text-gray-700 text-sm whitespace-pre-wrap">
                            {coverLetter}
                        </div>
                    </div>
                )}

                {/* Close Button */}
                <div className="relative z-10 text-right mt-6">
                    <button
                        onClick={onClose}
                        className="bg-gray-800 text-white px-5 py-2 rounded-lg hover:bg-gray-700 transition-all"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ApplicationDetailsModal;
