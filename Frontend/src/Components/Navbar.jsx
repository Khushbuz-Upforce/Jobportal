import React, { useEffect, useState } from 'react';
import Logo from '../assets/logo.png';
import { Link } from "react-router-dom";
import { Menu, X, UserCircle, Bell } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/authSlice';
import NotificationModal from './NotificationModal';
import socket from '../socket';
import { clearNotifications, getNotigication } from '../Servises/adminApi';
import { toast } from 'react-toastify';
// import playNotificationSound from '../utils/playNotificationSound';
import showBrowserNotification from '../utils/showBrowserNotification';

const Navbar = ({ setIsOpen, isOpen }) => {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);


  const homePath = user?.role === 'admin' ? '/admin' : '/';

  const [showModal, setShowModal] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const handleLogout = () => dispatch(logoutUser());

  const fetchNotifications = async () => {
    try {
      if (!isAuthenticated) return;

      // Check if user is admin
      if (user?.role !== 'admin') return;

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
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    // Check if user is admin
    if (user?.role !== 'admin') return;

    fetchNotifications();

    socket.on('new_notification', (notif) => {
      setNotifications(prev => [notif, ...prev]);
      // console.log(notif, "notification");

      // playNotificationSound();
      showBrowserNotification(notif);

      toast.info(
        <div>
          <p className="font-semibold">New Application</p>
          <p className="text-sm text-gray-600">
            {notif?.applicantName || 'An applicant'} applied for {notif?.jobTitle || 'a job'}
          </p>
        </div>,
        {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    });

    return () => socket.off('new_notification');
  }, [isAuthenticated]);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false); // scrolling down
      } else {
        setIsVisible(true); // scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);
  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 px-4 lg:px-10 h-50 transition-all duration-300 backdrop-blur-lg bg-white/30 border-b border-white/20 shadow-md ${isVisible ? 'translate-y-0' : 'translate-y-0'
        }`}>
        <div className="max-w-screen-xl mx-auto flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            {user?.role === "admin" && (
              <button onClick={toggleSidebar} className="text-gray-700 md:hidden">
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            )}
            <Link to={homePath}>
              <img src={Logo} width={80} alt="Logo" className="object-contain" />
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {user?.role !== "admin" && (
              <Link to="/jobs" className="text-gray-700 hover:text-orange-500 transition">
                Jobs
              </Link>
            )}

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

            <Link to={
              user?.role === 'admin' ? "/admin/profile"
                : user?.role === 'recruiter' ? "/recruiter/profile"
                  : "/user/profile"
            }>
              <div className="p-2 hover:bg-gray-100 rounded-full transition">
                <UserCircle className="w-5 h-5 text-gray-700" />
              </div>
            </Link>

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
