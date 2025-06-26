const ApplicationDetailsModal = ({ application, onClose }) => {
    console.log(application);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm p-4">
            <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 md:p-8 animate-fade-in">
                {/* Decorative Background Gradient Layer */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-100/30 via-white/30 to-gray-100/20 pointer-events-none backdrop-blur-sm" />

                {/* Content */}
                <div className="relative z-10">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Applicant Details</h2>

                    <div className="space-y-3 text-sm md:text-base text-gray-700">
                        <div><span className="font-medium text-gray-900">Name:</span> {application.applicantName}</div>
                        <div><span className="font-medium text-gray-900">Email:</span> {application.email}</div>
                        <div><span className="font-medium text-gray-900">Phone:</span> {application.phone}</div>
                        <div><span className="font-medium text-gray-900">Job:</span> {application?.jobId?.title}</div>
                        <div><span className="font-medium text-gray-900">Applied At:</span> {new Date(application.createdAt).toLocaleString()}</div>
                        <div><span className="font-medium text-gray-900">Cover Letter:</span> {application.coverLetter || "N/A"}</div>
                        {application.resume && (
                            <div>
                                <span className="font-medium text-gray-900">Resume:</span>{" "}
                                <a
                                    href={application.resume}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-yellow-600 hover:underline"
                                >
                                    Download
                                </a>
                            </div>
                        )}
                    </div>

                    {/* Close Button */}
                    <div className="text-right mt-6">
                        <button
                            onClick={onClose}
                            className="bg-gray-800 text-white px-5 py-2 rounded-lg hover:bg-gray-700 transition-all"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplicationDetailsModal;
