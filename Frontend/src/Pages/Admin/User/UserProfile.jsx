import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Pencil, Mail, User, ShieldCheck, Lock } from "lucide-react";
import AdminSidebarLayout from "../../../Components/AdminComponents/AdminSidebarLayout";

const UserProfile = () => {
    const { user } = useSelector((state) => state.auth);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.username || "",
        email: user?.email || "",
        role: user?.role || "admin",
    });

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSave = () => {
        // You can integrate the update API here
        setEditMode(false);
    };

    return (
        <AdminSidebarLayout>
            <div className="min-h-screen ">
                <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-xl mb-3 font-bold text-gray-800">Admin Profile</h1>

                        {!editMode && (
                            <button
                                className="text-blue-600 hover:text-blue-800"
                                onClick={() => setEditMode(true)}
                            >
                                <Pencil size={20} />
                            </button>
                        )}
                    </div>

                    {/* Profile Section */}
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <img
                            src={`https://api.dicebear.com/7.x/initials/svg?seed=${formData.name}`}
                            alt="Profile"
                            className="w-28 h-28 rounded-full border-4 border-yellow-400"
                        />
                        <div className="w-full">
                            <div className="mb-4">
                                <label className="text-sm text-gray-600 flex items-center gap-1">
                                    <User size={16} /> Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    disabled={!editMode}
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full border p-2 rounded mt-1 ${editMode ? "bg-white" : "bg-gray-100"
                                        }`}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="text-sm text-gray-600 flex items-center gap-1">
                                    <Mail size={16} /> Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    disabled={!editMode}
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full border p-2 rounded mt-1 ${editMode ? "bg-white" : "bg-gray-100"
                                        }`}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="text-sm text-gray-600 flex items-center gap-1">
                                    <ShieldCheck size={16} /> Role
                                </label>
                                <input
                                    type="text"
                                    disabled
                                    value={formData.role}
                                    className="w-full border p-2 rounded bg-gray-100 mt-1"
                                />
                            </div>

                            {editMode && (
                                <div className="flex justify-end gap-4 mt-6">
                                    <button
                                        onClick={() => setEditMode(false)}
                                        className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-100"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>


                </div>
            </div>
        </AdminSidebarLayout>

    );
};

export default UserProfile;
