import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ApplyJob, getUser } from "../../Servises/userApi"; // Your centralized API call
import { toast } from "react-toastify";

const ApplyFormModal = ({ jobId, onClose }) => {
    const navigate = useNavigate();
    const [uploading, setUploading] = useState(false);

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
            try {
                setUploading(true);

                const formData = new FormData();
                formData.append("applicantName", values.applicantName);
                formData.append("email", values.email);
                formData.append("phone", values.phone);
                formData.append("coverLetter", values.coverLetter);
                formData.append("resume", values.resume);
                formData.append("jobId", jobId);

                const res = await ApplyJob(formData); // Use updated ApplyJob
                toast.success(res.data.message)
                // console.log(res);

                navigate("/application");
            } catch (err) {
                console.error("Submission failed:", err);
                toast(err.response.data.message || "Application failed. Please try again.")
            } finally {
                setUploading(false);
                setSubmitting(false);
            }
        },

    });

    // Prefill user data from profile
    useEffect(() => {
        let isMounted = true;
        const fetchUser = async () => {
            try {
                const res = await getUser();
                console.log(res.data, "user data");

                if (isMounted) {
                    formik.setValues((prev) => ({
                        ...prev,
                        applicantName: res.data.username || "",
                        email: res.data.email || "",

                    }));
                }
            } catch (err) {
                console.error("Failed to fetch user profile:", err);
                toast.error(err.response.data.message)
            }
        };
        fetchUser();
        return () => {
            isMounted = false;
        };
    }, [formik]);

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
                        disabled={formik.isSubmitting || uploading}
                        className="w-full bg-yellow hover:bg-yellow-500 text-gray-900 font-semibold py-2 px-4 rounded"
                    >
                        {formik.isSubmitting || uploading ? "Submitting..." : "Submit Application"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ApplyFormModal;
