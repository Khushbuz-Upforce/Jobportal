import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createCompany, updateCompany, uploadCompanyLogo } from "../../Servises/adminApi";
import { toast } from "react-toastify";

const CompanyModal = ({ mode = "create", initialData = {}, onClose, onSuccess }) => {
    const isEditMode = mode === "edit";
    const [file, setFile] = useState(null);
    const [logoPreview, setLogoPreview] = useState(initialData?.logo || "");
    const [apiError, setApiError] = useState(null);

    const validationSchema = Yup.object({
        name: Yup.string().required("Company name is required"),
        email: Yup.string().email("Invalid email format"),
        website: Yup.string().url("Invalid website URL"),
        industry: Yup.string().required("Industry is required"),
        description: Yup.string(),
    });

    const formik = useFormik({
        initialValues: {
            name: initialData.name || "",
            email: initialData.email || "",
            website: initialData.website || "",
            industry: initialData.industry || "",
            description: initialData.description || "",
            logo: initialData.logo || "",
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                setApiError(null);

                if (file) {
                    const fd = new FormData();
                    fd.append("file", file);
                    const res = await uploadCompanyLogo(fd);
                    values.logo = res.data.url;
                }

                const trimmedValues = Object.fromEntries(
                    Object.entries(values).map(([k, v]) =>
                        typeof v === "string" ? [k, v.trim()] : [k, v]
                    )
                );

                if (isEditMode) {
                    await updateCompany(initialData._id, trimmedValues);
                } else {
                    await createCompany(trimmedValues);
                }

                onSuccess();
                onClose();
            } catch (err) {
                console.error(err);
                setApiError("Something went wrong. Please try again.");
                toast.error(err.response.data.message)
            } finally {
                setSubmitting(false);
            }
        },
    });

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => setLogoPreview(reader.result);
            reader.readAsDataURL(selectedFile);
        }
    };

    // Escape key to close modal
    useEffect(() => {
        const handleEsc = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-semibold mb-4">
                    {isEditMode ? "Edit Company" : "Create New Company"}
                </h2>

                {apiError && (
                    <div className="text-red-600 text-sm mb-2">{apiError}</div>
                )}

                <form onSubmit={formik.handleSubmit} className="grid gap-4">
                    {["name", "email", "website", "industry"].map((field) => (
                        <div key={field}>
                            <input
                                name={field}
                                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                value={formik.values[field]}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full p-2 border rounded"
                            />
                            {formik.touched[field] && formik.errors[field] && (
                                <p className="text-red-600 text-sm">{formik.errors[field]}</p>
                            )}
                        </div>
                    ))}

                    <textarea
                        name="description"
                        placeholder="Description"
                        rows={3}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        className="w-full p-2 border rounded resize-none"
                    />

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full p-2 border rounded"
                    />

                    {logoPreview && (
                        <img
                            src={logoPreview}
                            alt="Logo Preview"
                            className="w-24 h-24 object-cover rounded border"
                        />
                    )}

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
                            disabled={formik.isSubmitting}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                        >
                            {isEditMode ? "Update" : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CompanyModal;
