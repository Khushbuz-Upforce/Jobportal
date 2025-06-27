import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    updateJob,
    createJob,
    getCompanies,
    uploadJobImage,
} from "../../Servises/adminApi";

const JobFormModal = ({ job, onClose, onSuccess }) => {
    const [companies, setCompanies] = useState([]);

    const [imagePreview, setImagePreview] = useState(job?.JobImage || "");

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await getCompanies();
                setCompanies(res.data);
                console.log(res.data, "company data");

            } catch (err) {
                console.error("Failed to fetch companies", err);
            }
        };
        fetchCompanies();
    }, []);

    const formik = useFormik({
        initialValues: {
            title: job?.title || "",
            location: job?.location || "",
            category: job?.category || "",
            status: job?.status || "open",
            salary: job?.salary || "",
            description: job?.description || "",
            JobImage: job?.JobImage || "",
            JobImagePublicId: job?.JobImagePublicId || "",
            companyId: job?.companyId || "",
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Title is required"),
            location: Yup.string().required("Location is required"),
            category: Yup.string().required("Category is required"),
            status: Yup.string().required("Status is required"),
            salary: Yup.number().typeError("Salary must be a number").required("Salary is required"),
            description: Yup.string().required("Description is required"),
        }),
        onSubmit: async (values) => {
            try {
                if (job?._id) {
                    await updateJob(job._id, values);
                } else {
                    await createJob(values);
                }
                onSuccess();
                onClose();
            } catch (err) {
                console.error("Failed to submit job:", err);
            }
        },
    });

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const form = new FormData();
        form.append("file", file);
        if (formik.values.JobImagePublicId) {
            form.append("oldFile", formik.values.JobImagePublicId);
        }

        try {
            const res = await uploadJobImage(form);
            formik.setFieldValue("JobImage", res.data.url);
            formik.setFieldValue("JobImagePublicId", res.data.filename);
            setImagePreview(res.data.url);
        } catch (err) {
            console.error("Upload failed", err);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50 px-4">
            <div className="bg-white p-6 w-full max-w-2xl rounded shadow-xl overflow-y-auto max-h-[90vh]">
                <h2 className="text-xl font-bold mb-4">{job ? "Edit Job" : "Add Job"}</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <input
                                className="border w-full p-2 rounded"
                                name="title"
                                placeholder="Title"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.title && formik.errors.title && (
                                <div className="text-red-500 text-sm">{formik.errors.title}</div>
                            )}
                        </div>
                        <div>
                            <input
                                className="border w-full p-2 rounded"
                                name="location"
                                placeholder="Location"
                                value={formik.values.location}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.location && formik.errors.location && (
                                <div className="text-red-500 text-sm">{formik.errors.location}</div>
                            )}
                        </div>
                        <div>
                            <input
                                className="border w-full p-2 rounded"
                                name="salary"
                                placeholder="Salary"
                                value={formik.values.salary}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.salary && formik.errors.salary && (
                                <div className="text-red-500 text-sm">{formik.errors.salary}</div>
                            )}
                        </div>
                        <div>
                            <select
                                className="border w-full p-2 rounded"
                                name="category"
                                value={formik.values.category}
                                onChange={formik.handleChange}
                            >
                                <option value="">Select Category</option>
                                {companies.map((c) => (
                                    <option key={c._id} value={c.industry}>
                                        {c.industry}
                                    </option>
                                ))}
                            </select>
                            {formik.touched.category && formik.errors.category && (
                                <div className="text-red-500 text-sm">{formik.errors.category}</div>
                            )}
                        </div>
                        <div>
                            <select
                                className="border w-full p-2 rounded"
                                name="status"
                                value={formik.values.status}
                                onChange={formik.handleChange}
                            >
                                <option value="open">Open</option>
                                <option value="closed">Closed</option>
                                <option value="draft">Draft</option>
                            </select>
                            {formik.touched.status && formik.errors.status && (
                                <div className="text-red-500 text-sm">{formik.errors.status}</div>
                            )}
                        </div>
                        {!job && (
                            <div>
                                <select
                                    className="border w-full p-2 rounded"
                                    name="companyId"
                                    value={formik.values.companyId}
                                    onChange={formik.handleChange}
                                >
                                    <option value="">Select Company</option>
                                    {companies.map((c) => (
                                        <option key={c._id} value={c._id}>
                                            {c.name}
                                        </option>
                                    ))}
                                </select>

                            </div>
                        )}
                    </div>

                    <div className="mt-4">
                        <textarea
                            className="border w-full p-2 rounded"
                            name="description"
                            placeholder="Description"
                            rows={4}
                            value={formik.values.description}
                            onChange={formik.handleChange}
                        />
                        {formik.touched.description && formik.errors.description && (
                            <div className="text-red-500 text-sm">{formik.errors.description}</div>
                        )}
                    </div>

                    <div className="mt-4">
                        <input type="file" onChange={handleFileChange} />
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="Job"
                                className="mt-3 w-32 h-32 object-cover border rounded"
                            />
                        )}
                    </div>

                    <div className="flex justify-end space-x-2 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-400 px-4 py-2 rounded text-white"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-green-600 px-4 py-2 rounded text-white"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default JobFormModal