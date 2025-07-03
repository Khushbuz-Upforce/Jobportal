import React, { useEffect, useState } from "react";
import { getJobs } from "../../Servises/adminApi";
import { MapPin } from "lucide-react";
import Navbar from "../../Components/Navbar";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
const JobsPage = () => {
    const navigate = useNavigate();

    const {
        data,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["jobs"],
        queryFn: getJobs,
        select: (res) => res.data.jobs || [],
    });

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 p-6 pt-24">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
                        Explore Opportunities
                    </h1>

                    <div className="">
                        {isLoading ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="animate-pulse p-4 border rounded bg-white shadow mt-0">
                                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                                        <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                                        <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                                        <div className="h-3 bg-gray-200 rounded w-full mb-4"></div>
                                        <div className="h-3 bg-gray-200 rounded w-1/3 mb-4"></div>
                                        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                                    </div>
                                ))}
                            </div>
                        ) : isError ? (
                            <div className="text-center text-red-500">Error: {error?.response?.data?.message}</div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {data.map((job) => (
                                    <div
                                        key={job._id}
                                        className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-transform transform hover:-translate-y-1"
                                    >
                                        <h2 className="text-xl font-semibold text-gray-800 mb-2">{job.title}</h2>
                                        <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                                            {job.description}
                                        </p>
                                        <div className="flex items-center text-gray-500 text-sm mb-4">
                                            <MapPin size={16} className="mr-1 text-yellow" />
                                            {job.location}
                                        </div>
                                        <button
                                            onClick={() => navigate(`/jobs/${job._id}`)}
                                            className="text-sm px-4 py-2 bg-yellow text-gray-900 font-medium rounded hover:bg-yellow-400 transition"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </>
    );
};

export default JobsPage;
