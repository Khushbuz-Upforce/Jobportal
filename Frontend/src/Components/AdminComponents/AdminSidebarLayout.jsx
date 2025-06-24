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
        { to: "/admin/profile", label: "Admin Profile", icon: <Contact className="w-5 h-5" /> },
    ];

    return (
        <>
            <Navbar setIsOpen={setIsOpen} isOpen={isOpen} />
            <div className="min-h-screen flex flex-col md:flex-row pt-16 bg-gray-100">
                {/* Sidebar */}
                <aside
                    className={`min-h-screen z-40 fixed md:relative top-0 left-0  w-64 md:w-60 bg-white/90 backdrop-blur-md shadow-md border-r border-gray-200 transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
                >
                    <div className="p-4 pt-20 md:pt-6 space-y-4">
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
                <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
                    {children}
                </main>
            </div>
        </>
    );
};

export default AdminSidebarLayout;
