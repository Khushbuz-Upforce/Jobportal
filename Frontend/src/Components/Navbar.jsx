import React, { useEffect, useState } from 'react';
import Logo from '../assets/logo.png';
import { Link } from "react-router-dom";
import { Menu, X, UserCircle, Bell } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../features/authSlice';
import NotificationModal from './NotificationModal';
import socket from '../socket';
import { clearNotifications, getNotigication } from '../Servises/adminApi';

const Navbar = ({ setIsOpen, isOpen }) => {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const handleLogout = () => dispatch(logoutUser());

  const fetchNotifications = async () => {
    try {
      const res = await getNotigication();
      setNotifications(res.data.notifications || []);
    } catch (err) {
      console.error("Failed to fetch notifications", err);
    }
  };

  const handleClearNotifications = async () => {
    try {
      await clearNotifications();
      setNotifications([]);
    } catch (error) {
      console.error("Failed to clear notifications", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    socket.on('new_notification', (notif) => {
      setNotifications(prev => [notif, ...prev]);
    });
    return () => socket.off('new_notification');
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50 px-4 lg:px-10">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center h-16">
          {/* Left: Logo & Mobile Menu */}
          <div className="flex items-center gap-3">
            {user?.role === "admin" && (
              <button onClick={toggleSidebar} className="text-gray-700 md:hidden">
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            )}
            <img src={Logo} width={80} alt="Logo" className="object-contain" />
          </div>

          {/* Right: Nav Actions */}
          <div className="flex items-center gap-4">
            {/* Jobs link for non-admin */}
            {user?.role !== "admin" && (
              <Link to="/jobs" className="text-gray-700 hover:text-orange-500 transition">
                Jobs
              </Link>
            )}

            {/* 🔔 Notification Bell for admin */}
            {user?.role === 'admin' && (
              <div
                className="relative cursor-pointer"
                onClick={() => setShowModal(true)}
              >
                <div className="p-2 hover:bg-gray-100 rounded-full transition">
                  <Bell className="w-5 h-5 text-gray-700" />
                </div>
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full px-1.5">
                    {notifications.length}
                  </span>
                )}
              </div>
            )}

            {/* 👤 Profile Icon */}
            <Link to={
              user?.role === 'admin' ? "/admin/profile"
                : user?.role === 'recruiter' ? "/recruiter/profile"
                  : "/user/profile"
            }>
              <div className="p-2 hover:bg-gray-100 rounded-full transition">
                <UserCircle className="w-5 h-5 text-gray-700" />
              </div>
            </Link>

            {/* 🔐 Login / Logout */}
            {!isAuthenticated ? (
              <Link to="/login">
                <button className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-900 transition">
                  Login
                </button>
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-900 transition"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* 🔔 Notification Modal */}
      {showModal && (
        <NotificationModal
          notifications={notifications}
          onClose={() => setShowModal(false)}
          onClear={handleClearNotifications}
        />
      )}
    </>
  );
};

export default Navbar;
