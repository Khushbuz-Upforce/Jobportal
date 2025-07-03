import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ApplyJob, getUser } from "../../Servises/userApi"; // Your centralized API call
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
const ApplyFormModal = ({ jobId, onClose }) => {
    const navigate = useNavigate();

    // ✅ Fetch user info
    const { data: userData, isLoading: userLoading } = useQuery({
        queryKey: ["userProfile"],
        queryFn: getUser,
        onError: (err) => {
            toast.error(err.response?.data?.message || "Failed to fetch user profile");
        },
    });
    // ✅ Mutation for applying to job
    const { mutateAsync: applyJobMutation, isPending } = useMutation({
        mutationFn: (formData) => ApplyJob(formData),
        onSuccess: (res) => {
            toast.success(res.data.message || "Application submitted!");
            navigate("/application");
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || "Failed to submit application.");
        },
    });
    const formik = useFormik({
        initialValues: {
            applicantName: "",
            email: "",
            phone: "",
            coverLetter: "",
            resume: null,
        },
        validationSchema: Yup.object({
            applicantName: Yup.string().required("Name is required"),
            email: Yup.string().email("Invalid email").required("Email is required"),
            phone: Yup.string()
                .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
                .required("Phone is required"),
            coverLetter: Yup.string(),
            resume: Yup.mixed().required("Resume is required"),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            const formData = new FormData();
            formData.append("applicantName", values.applicantName);
            formData.append("email", values.email);
            formData.append("phone", values.phone);
            formData.append("coverLetter", values.coverLetter);
            formData.append("resume", values.resume);
            formData.append("jobId", jobId);

            await applyJobMutation(formData);
            setSubmitting(false);
        },

    });



    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <div className="bg-white w-full max-w-lg rounded-xl p-6 relative shadow-xl">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
                >
                    <X size={20} />
                </button>

                <h2 className="text-2xl font-bold mb-4 text-gray-800">Apply for this Job</h2>

                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <input
                            type="text"
                            name="applicantName"
                            placeholder="Your Name"
                            className="w-full border rounded p-2"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.applicantName}
                        />
                        {formik.touched.applicantName && formik.errors.applicantName && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.applicantName}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            className="w-full border rounded p-2"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
                        )}
                    </div>

                    {/* Phone */}
                    <div>
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone Number"
                            className="w-full border rounded p-2"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.phone}
                        />
                        {formik.touched.phone && formik.errors.phone && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.phone}</p>
                        )}
                    </div>

                    {/* Cover Letter */}
                    <div>
                        <textarea
                            name="coverLetter"
                            placeholder="Cover Letter (optional)"
                            className="w-full border rounded p-2 h-28"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.coverLetter}
                        />
                    </div>

                    {/* Resume Upload */}
                    <div>
                        <input
                            type="file"
                            name="resume"
                            accept=".pdf,.doc,.docx"
                            className="w-full"
                            onChange={(e) => formik.setFieldValue("resume", e.currentTarget.files[0])}
                        />
                        {formik.touched.resume && formik.errors.resume && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.resume}</p>
                        )}
                        {formik.values.resume && (
                            <p className="text-sm text-gray-600 mt-1">
                                Selected: {formik.values.resume.name}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={formik.isSubmitting || isPending}
                        className="w-full bg-yellow hover:bg-yellow-500 text-gray-900 font-semibold py-2 px-4 rounded"
                    >
                        {formik.isSubmitting || isPending ? "Submitting..." : "Submit Application"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ApplyFormModal;
