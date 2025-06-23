import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebarLayout from "../../../Components/AdminComponents/AdminSidebarLayout";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { getUser } from "../../../Servises/adminApi";

const AdminUsersPage = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState("");
    const [sortField, setSortField] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState("desc");
    const [totalPages, setTotalPages] = useState(1);


    const fetchUsers = async () => {
        try {
            const params = {
                search,
                page,
                limit,
                sortBy: sortField,
                sortOrder,
            };

            const res = await getUser(params);
            setUsers(res.data.users);
            console.log(res.data.users);

            setTotalPages(res.data.pagination.totalPages);
        } catch (error) {
            console.error("Failed to fetch users:", error);
        }
    };

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchUsers();
        }, 500); // debounce time: 500ms

        return () => clearTimeout(delayDebounce);
    }, [search, page, sortField, sortOrder]);
    const handleSort = (field) => {
        if (sortField === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortOrder("asc");
        }
    };

    return (
        <AdminSidebarLayout>
            <div className="pt-3 px-2 md:px-3">
                <h1 className="text-xl mb-3 font-bold text-gray-800">
                    Users
                </h1>
                <input
                    type="text"
                    placeholder="Search by name or email..."
                    className="w-50 max-w-md p-2 text-sm border rounded mb-4"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <div className="overflow-x-auto bg-white shadow rounded-xl">
                    <table className="min-w-full text-sm divide-y divide-gray-200">
                        <thead className="bg-gray-100 text-gray-700 text-left uppercase text-xs">
                            <tr>
                                {["id", "username", "email", "role"].map((field) => (

                                    <th
                                        key={field}
                                        className="px-4 py-3 cursor-pointer select-none"
                                        onClick={() => handleSort(field)}
                                    >
                                        <div className="flex items-center gap-1">
                                            {field}
                                            {sortField === field ? (
                                                sortOrder === "asc" ? (
                                                    <FaSortUp />
                                                ) : (
                                                    <FaSortDown />
                                                )
                                            ) : (
                                                <FaSort />
                                            )}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {users.map((user, i) => (
                                <tr key={user._id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3">{++i}</td>
                                    <td className="px-4 py-3">{user.username}</td>
                                    <td className="px-4 py-3">{user.email}</td>
                                    <td className="px-4 py-3">{user.role}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-4">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="text-sm">
                        Page {page} of {totalPages}
                    </span>
                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </AdminSidebarLayout>
    );
};

export default AdminUsersPage;
