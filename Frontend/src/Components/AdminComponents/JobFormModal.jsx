import React, { useState, useEffect } from "react";
import { updateJob, createJob, getCompanies, uploadJobImage } from "../../Servises/adminApi";

export default function JobFormModal({ job, onClose, onSuccess }) {
    const [companies, setCompanies] = useState([]);
    const [formData, setFormData] = useState(job || {
        title: "",
        location: "",
        category: "",
        status: "open",
        salary: "",
        description: "",
        JobImage: null,
        companyId: "",
    });

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await getCompanies();
                setCompanies(res.data);
            } catch (err) {
                console.error("Failed to fetch companies", err);
            }
        };

        if (!job) fetchCompanies();
    }, [job]);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const form = new FormData();
        form.append("file", file);

        // Only append oldFile if it's an update (edit case)
        if (formData.JobImagePublicId) {
            form.append("oldFile", formData.JobImagePublicId);
        }

        try {
            const res = await uploadJobImage(form);
            setFormData((prev) => ({
                ...prev,
                JobImage: res.data.url,
                JobImagePublicId: res.data.filename, // store new public_id
            }));
        } catch (err) {
            console.error("Upload failed", err);
        }
    };



    const handleSubmit = async () => {
        try {
            if (job?._id) {
                await updateJob(job._id, formData);
            } else {
                console.log(formData, "Formdata");

                await createJob(formData); // creation path
            }

            onSuccess();
            onClose();
        } catch (err) {
            console.error("Failed to submit job:", err);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white p-6 w-full max-w-lg rounded shadow-xl">
                <h2 className="text-xl font-bold mb-4">{job ? "Edit Job" : "Add Job"}</h2>
                <div className="space-y-2">
                    <input
                        className="border w-full p-2 rounded"
                        placeholder="Title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                    <input
                        className="border w-full p-2 rounded"
                        placeholder="Location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                    <input
                        className="border w-full p-2 rounded"
                        placeholder="Salary"
                        value={formData.salary}
                        onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    />
                    <textarea
                        className="border w-full p-2 rounded"
                        placeholder="Description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                    <select
                        className="border w-full p-2 rounded"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                        <option value="">Select Category</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Design">Design</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Consultant">Consultant</option>
                        <option value="Sales">Sales</option>
                    </select>
                    <select
                        className="border w-full p-2 rounded"
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    >
                        <option value="open">Open</option>
                        <option value="closed">Closed</option>
                        <option value="draft">Draft</option>
                    </select>

                    {!job && (
                        <select
                            className="border w-full p-2 rounded"
                            value={formData.companyId}
                            onChange={(e) => setFormData({ ...formData, companyId: e.target.value })}
                        >
                            <option value="">Select Company</option>
                            {companies.map((c) => (
                                <option key={c._id} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    )}

                    <input type="file" onChange={handleFileChange} />
                    {formData.JobImage && (
                        <img
                            src={formData.JobImage}
                            alt="Job"
                            className="mt-3 w-32 h-32 object-cover border rounded"
                        />
                    )}
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                    <button onClick={onClose} className="bg-gray-400 px-4 py-2 rounded text-white">Cancel</button>
                    <button onClick={handleSubmit} className="bg-green-600 px-4 py-2 rounded text-white">Save</button>
                </div>
            </div>
        </div>
    );
}
