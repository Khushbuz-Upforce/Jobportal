import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getCompanies,
    updateCompany,
    uploadCompanyLogo,
} from "../../../Servises/adminApi";
import EditCompanyModal from "../../../Components/AdminComponents/EditCompanyModal";
import CreateCompanyModal from "../../../Components/AdminComponents/CreateCompanyModal";
import AdminSidebarLayout from "../../../Components/AdminComponents/AdminSidebarLayout";
import { toast } from "react-toastify";
import { useState } from "react";

const AdminCompaniesPage = () => {
    const queryClient = useQueryClient();
    const [editingCompany, setEditingCompany] = useState(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [formData, setFormData] = useState(null);

    const { data: companies, isLoading } = useQuery({
        queryKey: ["companies"],
        queryFn: getCompanies,
        select: (res) => res.data,
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => updateCompany(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries(["companies"]);
            toast.success("Company updated");
            setEditingCompany(null);
        },
        onError: (err) => toast.error(err.response?.data?.message || "Update failed"),
    });

    const logoUploadMutation = useMutation({
        mutationFn: (fd) => uploadCompanyLogo(fd),
        onSuccess: (res) => {
            setFormData((prev) => ({ ...prev, logo: res.data.url }));
        },
        onError: (err) => toast.error(err.response?.data?.message || "Upload failed"),
    });

    const handleEdit = (company) => {
        setEditingCompany(company._id);
        setFormData({
            _id: company._id,
            name: company.name || "",
            email: company.email || "",
            industry: company.industry || "",
            website: company.website || "",
            logo: company.logo || "",
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const fd = new FormData();
        fd.append("file", file);

        if (formData.logo) {
            const fileName = formData.logo.split("/").pop().split(".")[0];
            fd.append("oldFile", `company_logos/${fileName}`);
        }

        logoUploadMutation.mutate(fd);
    };

    const handleSave = () => {
        const { _id, ...data } = formData;
        updateMutation.mutate({ id: _id, data });
    };

    const handleCloseModal = () => setEditingCompany(null);

    return (
        <AdminSidebarLayout>
            <div className="pt-5 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                <h1 className="text-xl font-bold text-gray-800">Company Management</h1>

                <div className="mb-4 text-right">
                    <button
                        className="bg-green-600 text-white px-4 py-2 rounded"
                        onClick={() => setIsCreateModalOpen(true)}
                    >
                        + Create
                    </button>
                </div>

                <div className="overflow-x-auto bg-white shadow-xl rounded-2xl border border-gray-200">
                    {isLoading ? (
                        <div className="p-6 text-center text-gray-500">Loading companies...</div>
                    ) : (
                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                            <thead className="bg-gray-200 text-gray-700 text-xs uppercase tracking-wide">
                                <tr>
                                    <th className="px-5 py-3 text-left">Id</th>
                                    <th className="px-5 py-3 text-left">Logo</th>
                                    <th className="px-5 py-3 text-left">Name</th>
                                    <th className="px-5 py-3 text-left">Email</th>
                                    <th className="px-5 py-3 text-left">Industry</th>
                                    <th className="px-5 py-3 text-left">Website</th>
                                    <th className="px-5 py-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {companies?.map((company, i) => (
                                    <tr key={company._id} className="hover:bg-gray-50 transition">
                                        <td className="px-5 py-3 text-gray-600">{i + 1}</td>
                                        <td className="px-5 py-3">
                                            <img
                                                src={company.logo}
                                                alt="Company Logo"
                                                className="w-10 h-10 object-contain rounded-full border"
                                            />
                                        </td>
                                        <td className="px-5 py-3">{company.name}</td>
                                        <td className="px-5 py-3">{company.email}</td>
                                        <td className="px-5 py-3">{company.industry}</td>
                                        <td className="px-5 py-3 break-all">
                                            <a
                                                href={company.website}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-blue-600 hover:underline"
                                            >
                                                {company.website}
                                            </a>
                                        </td>
                                        <td className="px-5 py-3">
                                            <button
                                                onClick={() => handleEdit(company)}
                                                className="text-sm text-green-700 px-4 py-1.5 rounded-lg hover:bg-green-100 transition"
                                            >
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {editingCompany && (
                    <EditCompanyModal
                        formData={formData}
                        setFormData={setFormData}
                        onSave={handleSave}
                        onClose={handleCloseModal}
                        onFileChange={handleFileChange}
                    />
                )}

                {isCreateModalOpen && (
                    <CreateCompanyModal
                        onClose={() => setIsCreateModalOpen(false)}
                        onSuccess={() => queryClient.invalidateQueries(["companies"])}
                    />
                )}
            </div>
        </AdminSidebarLayout>
    );
};

export default AdminCompaniesPage;
