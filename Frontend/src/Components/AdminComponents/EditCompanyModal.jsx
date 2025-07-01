import React from "react";

const EditCompanyModal = ({ formData, setFormData, onSave, onClose, onFileChange }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl">
                <h2 className="text-lg font-semibold mb-4 text-gray-700">Edit Company</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Company Name"
                        className="border border-gray-300 rounded px-4 py-2"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                        }
                    />
                    <input
                        type="email"
                        placeholder="Company Email"
                        className="border border-gray-300 rounded px-4 py-2"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                        }
                    />
                    <input
                        type="industry"
                        placeholder="Industry"
                        className="border border-gray-300 rounded px-4 py-2"
                        value={formData.industry}
                        onChange={(e) =>
                            setFormData({ ...formData, industry: e.target.value })
                        }
                    />
                    <input
                        type="url"
                        placeholder="Website URL"
                        className="border border-gray-300 rounded px-4 py-2"
                        value={formData.website}
                        onChange={(e) =>
                            setFormData({ ...formData, website: e.target.value })
                        }
                    />
                    <div>
                        <input
                            type="file"
                            name="logo"
                            className="w-full border border-gray-300 rounded px-4 py-2 bg-white"
                            onChange={onFileChange}
                        />
                        {formData.logo && (
                            <img
                                src={formData.logo}
                                className="mt-3 w-24 h-24 object-cover border rounded"
                                alt="Company Logo"
                            />
                        )}
                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={onSave}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        Save
                    </button>
                    <button
                        onClick={onClose}
                        className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditCompanyModal;
