import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pencil, Mail, User, ShieldCheck } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AdminSidebarLayout from "../../../Components/AdminComponents/AdminSidebarLayout";
import { updateUserProfile } from "../../../Servises/adminApi";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../../../redux/authSlice";


const AdminProfilePage = () => {
    const { user } = useSelector((state) => state.auth);
    // console.log(user, "user");
    const dispatch = useDispatch();

    const [editMode, setEditMode] = useState(false);

    const initialValues = {
        username: user?.username || "",
        email: user?.email || "",
        role: user?.role || "admin",
    };

    const validationSchema = Yup.object({
        username: Yup.string().required("Name is required"),
        email: Yup.string().email("Invalid email format").required("Email is required"),
    });

    // React Query Mutation
    const { mutate, isPending } = useMutation({
        mutationFn: updateUserProfile,
        onSuccess: () => {
            toast.success("Profile updated successfully");
            setEditMode(false);
        },
        onError: (err) => {
            console.error("Update failed:", err);
            toast.error("Failed to update profile");
        },
    });
    const handleSubmit = (values) => {
        // console.log(values, "valuse profile");

        mutate(values); // trigger mutation
        dispatch(updateUser(values));
    };
    return (
        <AdminSidebarLayout>
            <div className="min-h-screen">
                <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-xl mb-3 font-bold text-gray-800 uppercase">
                            {initialValues.role} Profile
                        </h1>

                        {!editMode && (
                            <button
                                className="text-blue-600 hover:text-blue-800"
                                onClick={() => setEditMode(true)}
                            >
                                <Pencil size={20} />
                            </button>
                        )}
                    </div>

                    <Formik
                        enableReinitialize
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting, values }) => (
                            <Form>
                                <div className="flex flex-col md:flex-row items-center gap-6">
                                    <img
                                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${values.username}`}
                                        alt="Profile"
                                        className="w-28 h-28 rounded-full border-4 border-yellow-400"
                                    />

                                    <div className="w-full">
                                        {/* Name Field */}
                                        <div className="mb-4">
                                            <label className="text-sm text-gray-600 flex items-center gap-1">
                                                <User size={16} /> Name
                                            </label>
                                            <Field
                                                type="text"
                                                name="username"
                                                disabled={!editMode}
                                                className={`w-full border p-2 rounded mt-1 ${editMode ? "bg-white" : "bg-gray-100"}`}
                                            />
                                            <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
                                        </div>

                                        {/* Email Field */}
                                        <div className="mb-4">
                                            <label className="text-sm text-gray-600 flex items-center gap-1">
                                                <Mail size={16} /> Email
                                            </label>
                                            <Field
                                                type="email"
                                                name="email"
                                                disabled={!editMode}
                                                className={`w-full border p-2 rounded mt-1 ${editMode ? "bg-white" : "bg-gray-100"}`}
                                            />
                                            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                                        </div>

                                        {/* Role (read-only) */}
                                        <div className="mb-4">
                                            <label className="text-sm text-gray-600 flex items-center gap-1">
                                                <ShieldCheck size={16} /> Role
                                            </label>
                                            <input
                                                type="text"
                                                disabled
                                                value={values.role}
                                                className="w-full border p-2 rounded bg-gray-100 mt-1"
                                            />
                                        </div>

                                        {/* Buttons */}
                                        {editMode && (
                                            <div className="flex justify-end gap-4 mt-6">
                                                <button
                                                    type="button"
                                                    onClick={() => setEditMode(false)}
                                                    className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-100"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={isPending}
                                                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                                >
                                                    {isPending ? "Saving..." : "Save Changes"}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </AdminSidebarLayout>
    );
};

export default AdminProfilePage;
