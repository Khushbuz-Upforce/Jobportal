import React, { useEffect, useState } from "react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import AdminSidebarLayout from "../../../Components/AdminComponents/AdminSidebarLayout";
import { getUser, deleteUser } from "../../../Servises/adminApi";
import UserModal from "../../../Components/AdminComponents/UserModal"; // import here

const AdminUsersPage = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [search, setSearch] = useState("");
    const [sortField, setSortField] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState("desc");
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editUserId, setEditUserId] = useState(null);
    const [initialValues, setInitialValues] = useState({ username: "", email: "", password: "", role: "user" });

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const params = { search, page, limit, sortBy: sortField, sortOrder };
            const res = await getUser(params);
            setUsers(res.data.users);
            setTotalPages(res.data.pagination.totalPages);
        } catch (error) {
            console.error("Failed to fetch users:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchUsers();
        }, 500);

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

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            await deleteUser(id);
            fetchUsers();
        }
    };


    const handleOpenCreate = () => {
        setInitialValues({ username: "", email: "", password: "", role: "user" });
        setIsEditMode(false);
        setEditUserId(null);
        setShowModal(true);
    };

    const handleOpenEdit = (user) => {
        setInitialValues({ username: user.username, email: user.email, role: user.role });
        setIsEditMode(true);
        setEditUserId(user._id);
        setShowModal(true);
    };

    return (
        <AdminSidebarLayout>
            <div className="pt-3 px-2 md:px-3">
                <div className="flex justify-between items-center mb-3">
                    <h1 className="text-xl font-bold text-gray-800">Users</h1>
                    <button
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        onClick={handleOpenCreate}
                    >
                        + Create User
                    </button>
                </div>

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
                                {["id", "username", "email", "role", "actions"].map((field) => (
                                    <th
                                        key={field}
                                        className="px-4 py-3 cursor-pointer select-none"
                                        onClick={() => field !== "actions" && handleSort(field)}
                                    >
                                        <div className="flex items-center gap-1">
                                            {field}
                                            {field !== "actions" && (
                                                sortField === field ? (
                                                    sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />
                                                ) : (
                                                    <FaSort />
                                                )
                                            )}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-4">
                                        Loading users...
                                    </td>
                                </tr>
                            ) : users.length > 0 ? (
                                users.map((user, index) => (
                                    <tr key={user._id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3">{(page - 1) * limit + index + 1}</td>
                                        <td className="px-4 py-3">{user.username}</td>
                                        <td className="px-4 py-3">{user.email}</td>
                                        <td className="px-4 py-3">{user.role}</td>
                                        <td className="px-4 py-3">
                                            <button
                                                className="text-blue-600 hover:underline mr-2"
                                                onClick={() => handleOpenEdit(user)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="text-red-600 hover:underline"
                                                onClick={() => handleDelete(user._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-4 text-gray-500">
                                        No users found.
                                    </td>
                                </tr>
                            )}
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

            {/* Modal Component */}
            <UserModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                isEditMode={isEditMode}
                initialValues={initialValues}
                editUserId={editUserId}
                onSuccess={() => {
                    setShowModal(false);
                    fetchUsers();
                }}
            />

        </AdminSidebarLayout>
    );
};

export default AdminUsersPage;
