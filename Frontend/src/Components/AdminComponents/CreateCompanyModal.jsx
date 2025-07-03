import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createCompany, uploadCompanyLogo } from "../../Servises/adminApi";

const CreateCompanyModal = ({ onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        website: "",
        logo: "",
        description: "",
        industry: "",
    });

    const [file, setFile] = useState(null);

    const uploadMutation = useMutation({
        mutationFn: uploadCompanyLogo,
        onSuccess: (res) => {
            setFormData((prev) => ({ ...prev, logo: res.data.url }));
            toast.success("Logo uploaded successfully");
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || "Upload failed");
        },
    });

    const createMutation = useMutation({
        mutationFn: createCompany,
        onSuccess: () => {
            toast.success("Company created");
            onSuccess?.();
            onClose?.();
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || "Create failed");
        },
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        setFile(selected);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (file) {
                const fd = new FormData();
                fd.append("file", file);
                await uploadMutation.mutateAsync(fd);
            }
            createMutation.mutate(formData);
        } catch (err) {
            console.error("Error creating company:", err);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 overflow-y-auto max-h-[90vh]">
                <h2 className="text-2xl font-semibold mb-6 text-center">Create New Company</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium">Company Name</label>
                        <input
                            type="text"
                            name="name"
                            className="w-full border p-2 rounded-md"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full border p-2 rounded-md"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Website</label>
                        <input
                            type="url"
                            name="website"
                            className="w-full border p-2 rounded-md"
                            value={formData.website}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Industry</label>
                        <input
                            type="text"
                            name="industry"
                            className="w-full border p-2 rounded-md"
                            value={formData.industry}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium">Description</label>
                        <textarea
                            name="description"
                            className="w-full border p-2 rounded-md"
                            rows="3"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium">Company Logo</label>
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                        {formData.logo && (
                            <img
                                src={formData.logo}
                                alt="Logo Preview"
                                className="h-20 mt-2 rounded shadow"
                            />
                        )}
                    </div>

                    <div className="sm:col-span-2 flex justify-end gap-3 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={createMutation.isLoading}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                            {createMutation.isLoading ? "Creating..." : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateCompanyModal;
