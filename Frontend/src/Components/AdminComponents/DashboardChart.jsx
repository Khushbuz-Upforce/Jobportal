// src/Components/AdminComponents/DashboardChart.jsx

import React, { useState } from "react";
import {
    ResponsiveContainer,
    BarChart,
    LineChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

const DashboardChart = ({ stats }) => {
    const [chartType, setChartType] = useState("bar");
    const [range, setRange] = useState("all");

    // Example time-based data (normally fetched dynamically based on range)
    const chartData = [
        { name: "Users", value: stats.userCount },
        { name: "Admins", value: stats.adminCount },
        { name: "Companies", value: stats.companyCount },
        { name: "Jobs", value: stats.jobsCount },
        { name: "Applications", value: stats.applicationsCount },
    ];

    const chartColors = {
        bar: "#facc15",    // yellow-400
        line: "#fb923c",   // orange-400
    };

    return (
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Statistics Overview</h2>

                <div className="flex items-center gap-2">
                    {/* Chart Type Toggle */}
                    <button
                        onClick={() => setChartType("bar")}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${chartType === "bar"
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                    >
                        Bar
                    </button>
                    <button
                        onClick={() => setChartType("line")}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${chartType === "line"
                            ? "bg-emerald-600 text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                    >
                        Line
                    </button>

                    {/* Range Filter */}
                    <select
                        value={range}
                        onChange={(e) => setRange(e.target.value)}
                        className="ml-3 px-3 py-1.5 text-sm border rounded-md bg-gray-50 text-gray-700 focus:outline-none"
                    >
                        <option value="7d">Last 7 Days</option>
                        <option value="30d">30 Days</option>
                        <option value="all">All Time</option>
                    </select>
                </div>
            </div>

            {/* Chart Container */}
            <ResponsiveContainer width="100%" height={300}>
                {chartType === "bar" ? (
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Bar
                            dataKey="value"
                            fill={chartColors.bar}
                            radius={[8, 8, 0, 0]}
                            animationDuration={800}
                        />
                    </BarChart>
                ) : (
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke={chartColors.line}
                            strokeWidth={3}
                            dot={{ r: 5 }}
                            activeDot={{ r: 8 }}
                            animationDuration={800}
                        />
                    </LineChart>
                )}
            </ResponsiveContainer>
        </div>
    );
};

export default DashboardChart;
