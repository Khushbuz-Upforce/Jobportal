import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    BarChart2,
    CalendarX,
    Contact,
    Database,
    FileUser,
} from "lucide-react";
import { getDashboardStats } from "../../Servises/adminApi";
import { useQuery } from "@tanstack/react-query";
const DashboardCard = () => {

    // React Query usage
    const { data, isLoading, error } = useQuery({
        queryKey: ["dashboardStats"],
        queryFn: getDashboardStats,
        select: (res) => res.data
    });
    const stats = {
        userCount: data?.userCount || 0,
        adminCount: data?.adminCount || 0,
        companyCount: data?.companyCount || 0,
        jobsCount: data?.jobsCount || 0,
        applicationsCount: data?.applicationsCount || 0
    };

    const navigate = useNavigate();

    const statItems = [
        {
            title: "Users",
            count: stats.userCount,
            icon: <BarChart2 className="w-7 h-7 text-green-500" />,
            border: "border-green-100",
            bg: "bg-green-50",
            text: "text-green-700",
            to: "/admin/users",
        },
        {
            title: "Admins",
            count: stats.adminCount,
            icon: <Database className="w-7 h-7 text-red-500" />,
            border: "border-red-100",
            bg: "bg-red-50",
            text: "text-red-700",
            to: "/admin/users",
        },
        {
            title: "Companies",
            count: stats.companyCount,
            icon: <CalendarX className="w-7 h-7 text-yellow-500" />,
            border: "border-yellow-100",
            bg: "bg-yellow-50",
            text: "text-yellow-700",
            to: "/admin/company",
        },
        {
            title: "Jobs",
            count: stats.jobsCount,
            icon: <Contact className="w-7 h-7 text-purple-500" />,
            border: "border-purple-100",
            bg: "bg-purple-50",
            text: "text-purple-700",
            to: "/admin/jobs",
        },
        {
            title: "Applications",
            count: stats.applicationsCount,
            icon: <FileUser className="w-7 h-7 text-blue-500" />,
            border: "border-blue-100",
            bg: "bg-blue-50",
            text: "text-blue-700",
            to: "/admin/aplication",
        }
    ];

    return (
        <div className="pt-4 px-3">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Dashboard Overview</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                {statItems.map((stat, idx) => (
                    <div
                        key={idx}
                        onClick={() => navigate(stat.to)}
                        className={`rounded-2xl shadow-sm p-5 cursor-pointer transition transform hover:scale-[1.02] border ${stat.border} ${stat.bg} hover:shadow-md flex justify-between items-center`}
                    >
                        <div>
                            <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
                            <p className={`text-2xl font-bold ${stat.text}`}>{stat.count}</p>
                        </div>
                        <div className="ml-3">{stat.icon}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardCard;
