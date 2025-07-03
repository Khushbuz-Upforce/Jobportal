import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createUser, updateUser } from "../../Servises/adminApi";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

const UserModal = ({
    isOpen,
    onClose,
    isEditMode,
    initialValues,
    editUserId,
    onSuccess,
}) => {
    // --- Create User Mutation ---
    const createMutation = useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            toast.success("User created successfully");
            onSuccess(); // callback to refetch and close modal
        },
        onError: (error) => {
            toast.error(error.response.data.massage || "Failed to create user");

        },
    });

    // --- Update User Mutation ---
    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => updateUser(id, data),
        onSuccess: () => {
            toast.success("User updated successfully");
            onSuccess(); // callback to refetch and close modal
        },
        onError: (error) => {
            toast.error(error.response.data.massage || "Failed to update user");
            // console.log(error, "Failed to update user");
        },
    });

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema: Yup.object({
            username: Yup.string().required("Username is required"),
            email: Yup.string().email("Invalid email").required("Email is required"),
            password: !isEditMode
                ? Yup.string()
                    .min(6, "Password must be at least 6 characters")
                    .required("Password is required")
                : Yup.string(),
            role: Yup.string()
                .oneOf(["user", "admin", "recruiter"])
                .required("Role is required"),
        }),
        onSubmit: async (values) => {
            if (isEditMode) {
                updateMutation.mutate({ id: editUserId, data: values });
            } else {
                createMutation.mutate(values);
            }
        },
    });

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                <h2 className="text-lg font-bold mb-4">
                    {isEditMode ? "Edit User" : "Create User"}
                </h2>
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <div>
                        <input
                            name="username"
                            type="text"
                            placeholder="Username"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                            className="w-full border px-3 py-2 rounded"
                        />
                        {formik.touched.username && formik.errors.username && (
                            <p className="text-red-500 text-sm">{formik.errors.username}</p>
                        )}
                    </div>

                    <div>
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            className="w-full border px-3 py-2 rounded"
                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className="text-red-500 text-sm">{formik.errors.email}</p>
                        )}
                    </div>

                    {!isEditMode && (
                        <div>
                            <input
                                name="password"
                                type="password"
                                placeholder="Password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                className="w-full border px-3 py-2 rounded"
                            />
                            {formik.touched.password && formik.errors.password && (
                                <p className="text-red-500 text-sm">{formik.errors.password}</p>
                            )}
                        </div>
                    )}

                    <div>
                        <select
                            name="role"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.role}
                            className="w-full border px-3 py-2 rounded"
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                            <option value="recruiter">Recruiter</option>
                        </select>
                        {formik.touched.role && formik.errors.role && (
                            <p className="text-red-500 text-sm">{formik.errors.role}</p>
                        )}
                    </div>

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={formik.isSubmitting}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            {(createMutation.isLoading || updateMutation.isLoading)
                                ? "Saving..."
                                : isEditMode
                                    ? "Update"
                                    : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserModal;
