import React, { useState } from "react";
import { createCompany, uploadCompanyLogo } from "../../Servises/adminApi";
import { toast } from "react-toastify";

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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (file) {
                const fd = new FormData();
                fd.append("file", file);
                const res = await uploadCompanyLogo(fd);
                formData.logo = res.data.url;
            }

            await createCompany(formData);
            onSuccess(); // Refresh parent list
            onClose();
        } catch (err) {
            console.error("Failed to create company:", err);
            toast.error(err.response.data.message)
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg relative">
                <h2 className="text-xl font-semibold mb-4">Create New Company</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Company Name"
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        placeholder="Website"
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="text"
                        name="industry"
                        value={formData.industry}
                        onChange={handleChange}
                        placeholder="Industry"
                        className="w-full p-2 border rounded"
                    />
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description"
                        rows={3}
                        className="w-full p-2 border rounded resize-none"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full p-2 border rounded"
                    />
                    <div className="flex justify-end gap-3 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateCompanyModal;
