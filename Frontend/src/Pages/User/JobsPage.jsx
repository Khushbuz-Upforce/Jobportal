import React, { useEffect, useState } from "react";
import { getJobs } from "../../Servises/adminApi";
import { MapPin } from "lucide-react";
import Navbar from "../../Components/Navbar";
import { useNavigate } from "react-router-dom";

const JobsPage = () => {
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await getJobs();
                setJobs(res.data.jobs || []);
            } catch (err) {
                console.error("Error fetching jobs:", err);
            }
        };

        fetchJobs();
    }, []);

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 p-6 pt-24">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
                        Explore Opportunities
                    </h1>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {jobs.map((job) => (
                            <div
                                key={job._id}
                                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-transform transform hover:-translate-y-1"
                            >
                                <h2 className="text-xl font-semibold text-gray-800 mb-2">{job.title}</h2>
                                <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                                    {job.description}
                                </p>
                                <div className="flex items-center text-gray-500 text-sm mb-4">
                                    <MapPin size={16} className="mr-1 text-yellow-500" />
                                    {job.location}
                                </div>
                                <button
                                    onClick={() => navigate(`/jobs/${job._id}`)}
                                    className="text-sm px-4 py-2 bg-yellow-400 text-gray-900 font-medium rounded hover:bg-yellow-500 transition"
                                >
                                    View Details
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default JobsPage;
