import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    Menu,
    X,
    Users,
    LayoutDashboard,
    UserCircle,
    BriefcaseBusiness,
    FileUser,
    Contact,
    Building2
} from "lucide-react";
import Navbar from "../Navbar";

const AdminSidebarLayout = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const links = [
        { to: "/admin", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
        { to: "/admin/users", label: "Manage User", icon: <Users className="w-5 h-5" /> },
        { to: "/admin/jobs", label: "Manage Jobs", icon: <BriefcaseBusiness className="w-5 h-5" /> },
        { to: "/admin/company", label: "Manage Company", icon: <Building2 className="w-5 h-5" /> },
        { to: "/admin/aplication", label: "Application", icon: <FileUser className="w-5 h-5" /> },
        { to: "/admin/profile", label: "Admin Profile", icon: <Contact className="w-5 h-5" /> },
    ];

    return (
        <>
            <Navbar setIsOpen={setIsOpen} isOpen={isOpen} />
            <div className="min-h-screen flex flex-col md:flex-row pt-16 ">
                {/* Sidebar */}
                <aside
                    className={`min-h-screen w-64 bg-gray-800 text-white p-4 pt-16 md:pt-4 space-y-6 z-30 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}  
          fixed top-0 left-0 md:relative md:translate-x-0 md:block`}
                >
                    {/* Sidebar Links */}
                    <nav className="space-y-2 mt-4">
                        {links.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`flex items-center px-4 py-2 rounded-md ${location.pathname === link.to
                                    ? "bg-white text-yellow font-semibold"
                                    : "hover:bg-white hover:text-[#f7812e] hover:font-semibold"
                                    }`}
                            >
                                <span className="mr-3">{link.icon}</span>
                                <span>{link.label}</span>
                            </Link>
                        ))}
                    </nav>
                </aside>

                {/* Main content */}
                <main className="flex-1 p-6 bg-gray-100">
                    {children}
                </main>
            </div>
        </>
    );
};

export default AdminSidebarLayout;
