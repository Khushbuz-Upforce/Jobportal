import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Briefcase,
    MapPin,
    CalendarDays,
    FileText,
    Mail,
    Globe,
} from "lucide-react";
import Navbar from "../../Components/Navbar";
import { getJobs } from "../../Servises/adminApi";
import ApplyFormModal from "../../Components/UserComponents/ApplyFormModal"; // import modal

const JobDetailsPage = () => {
    const { jobId } = useParams();
    const [job, setJob] = useState(null);
    const [showApplyModal, setShowApplyModal] = useState(false);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await getJobs();
                const foundJob = res.data.jobs.find((j) => j._id === jobId);
                setJob(foundJob);
            } catch (err) {
                console.error("Error fetching job details:", err);
                toast.error(err.response.data.message)
            }
        };

        fetchJob();
    }, [jobId]);

    if (!job) {
        return (
            <div className="p-6 text-center text-gray-500">
                Loading job details...
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 pt-24">
                <div className="max-w-5xl mx-auto bg-white p-4 md:p-8 rounded-2xl shadow-lg border border-gray-200">

                    {/* Job Image */}
                    {job.JobImage && (
                        <img
                            src={job.JobImage}
                            alt="Job Visual"
                            className="w-full h-72 object-contain rounded-xl mb-6 border border-gray-300"
                        />
                    )}

                    {/* Title and Description */}
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 capitalize">
                        {job.title}
                    </h1>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                        {job.description}
                    </p>

                    {/* Job Details */}
                    <div className="grid md:grid-cols-2 gap-4 text-gray-700 mb-8">
                        <div className="flex items-center gap-2">
                            <Briefcase className="text-yellow" size={18} />
                            <span>{job.category}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="text-yellow" size={18} />
                            <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CalendarDays className="text-yellow" size={18} />
                            <span>{new Date(job.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FileText className="text-yellow" size={18} />
                            <span>₹{job.salary}</span>
                        </div>
                        {job.attachment && (
                            <div className="flex items-center gap-2">
                                <FileText className="text-yellow" size={18} />
                                <a
                                    href={job.attachment}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline hover:text-blue-800"
                                >
                                    View Attachment
                                </a>
                            </div>
                        )}
                        <div className="flex items-center gap-2">
                            <span className="text-sm bg-yellow-200 text-yellow-900 font-semibold px-3 py-1 rounded-full">
                                Status: {job.status}
                            </span>
                        </div>
                    </div>

                    {/* Company Info */}
                    {job.companyId && (
                        <div className="mt-8 p-6 bg-gray-50 rounded-xl border">
                            <div className="flex items-center gap-4 mb-4">
                                <img
                                    src={job.companyId.logo}
                                    alt="Company Logo"
                                    className="w-16 h-16 rounded-full border border-gray-300 object-cover"
                                />
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">
                                        {job.companyId.name}
                                    </h2>
                                    <p className="text-sm text-gray-500">{job.companyId.industry}</p>
                                </div>
                            </div>
                            <p className="text-gray-700 mb-4">{job.companyId.description}</p>

                            <div className="flex flex-col gap-2 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                    <Mail size={16} className="text-yellow" />
                                    <span>{job.companyId.email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Globe size={16} className="text-yellow" />
                                    <a
                                        href={job.companyId.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="underline text-blue-600 hover:text-blue-800"
                                    >
                                        {job.companyId.website}
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Apply Button */}
                    <div className="mt-10 text-center">
                        <button
                            onClick={() => setShowApplyModal(true)}
                            className="bg-yellow text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
                        >
                            Apply Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Apply Modal */}
            {showApplyModal && (
                <ApplyFormModal
                    jobId={job._id}
                    onClose={() => setShowApplyModal(false)}
                />
            )}
        </>
    );
};

export default JobDetailsPage;
