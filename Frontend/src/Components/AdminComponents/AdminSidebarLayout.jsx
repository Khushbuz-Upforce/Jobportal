import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    Menu,
    X,
    Users,
    LayoutDashboard,
    BriefcaseBusiness,
    FileUser,
    Contact,
    Building2
} from "lucide-react";
import Navbar from "../Navbar";

const AdminSidebarLayout = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const links = [
        { to: "/admin", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
        { to: "/admin/users", label: "Manage User", icon: <Users className="w-5 h-5" /> },
        { to: "/admin/jobs", label: "Manage Jobs", icon: <BriefcaseBusiness className="w-5 h-5" /> },
        { to: "/admin/company", label: "Manage Company", icon: <Building2 className="w-5 h-5" /> },
        { to: "/admin/aplication", label: "Applications", icon: <FileUser className="w-5 h-5" /> },
    ];

    return (
        <>
            <Navbar setIsOpen={setIsOpen} isOpen={isOpen} />
            <div className="flex bg-gray-100">
                {/* Sidebar - Fixed on the left */}
                <aside
                    className={`fixed top-16 left-0 w-100 h-[calc(100vh-4rem)] bg-white shadow-md z-40 transition-transform duration-300 ease-in-out
      ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
                >
                    <div className="overflow-y-auto h-full px-4 py-6">
                        <nav className="space-y-1">
                            {links.map((link) => {
                                const isActive = location.pathname === link.to;
                                return (
                                    <Link
                                        key={link.to}
                                        to={link.to}
                                        className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200
                                            ${isActive
                                                ? "bg-[#f7812e]/10 text-[#f7812e] font-semibold border border-[#f7812e]/30"
                                                : "text-gray-700 hover:bg-[#f7812e]/10 hover:text-[#f7812e] hover:font-medium"
                                            }`}
                                    >
                                        {link.icon}
                                        <span>{link.label}</span>
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                </aside>

                {/* Main content */}
                <main className="flex-1 md:ml-56 pt-20 p-4 md:p-8 md:pt-20 overflow-y-auto min-h-screen">
                    {children}
                </main>
            </div>
        </>
    );
};

export default AdminSidebarLayout;
