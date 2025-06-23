import React from 'react';
import Logo from '../assets/logo.png';
import { Link } from "react-router-dom";
import { Menu, X, UserCircle } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../features/authSlice';

const Navbar = ({ setIsOpen, isOpen }) => {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 px-3 bg-white lg:px-10 shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center h-16">
        {/* Logo and Mobile Menu */}
        <div className="flex items-center">
          {user?.role === "admin" && (
            <button
              onClick={toggleSidebar}
              className="text-black focus:outline-none pe-2 md:hidden"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          )}
          <img src={Logo} width={80} alt="Logo" />
        </div>

        {/* Navigation Items */}
        <div className="flex items-center gap-4 font-medium">
          {user?.role !== "admin" && (
            <ul>
              <li className="hover:text-[#f1843c]">
                <a href="#">Jobs</a>
              </li>
            </ul>
          )}

          <Link to={'/admin/profile'}>
            <UserCircle className="hover:text-[#f1843c]" />
          </Link>

          {!isAuthenticated ? (
            <Link to={'/login'}>
              <button className="bg-black text-white rounded-lg px-3 py-2 text-sm">
                Login
              </button>
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-black text-white rounded-lg px-3 py-2 text-sm"
            >
              LogOut
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
