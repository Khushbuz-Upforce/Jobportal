import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../features/authSlice'; // ✅ Update path as per your structure
import { toast } from 'react-toastify';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, isAuthenticated, user, error } = useSelector(state => state.auth);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }
    // dispatch(registerUser(formData));
    dispatch(registerUser(formData))
      .unwrap()
      .then(() => {
        // toast.success("Registered successfully! Please login.");
        navigate('/login');
      })
      .catch((err) => {
        toast.error(err || "Registration failed");
      });

  };

  useEffect(() => {
    if (isAuthenticated && user) {
      // toast.success("Registered successfully! Please login.");
      navigate('/login');
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-200 via-gray-100 to-white px-4">
      <div className="w-full max-w-md bg-white p-4 rounded-2xl shadow-lg border border-yellow-400">
        {/* <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center">Welcome Back</h2> */}
        <div className="Logo  flex items-center justify-center align-center">
          <img src={Logo} width={100} alt="Logo" />
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 mb-1 text-[14px]">Full Name</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="User Name"
              className="w-full px-2 py-1 text-[14px] rounded-md bg-transparent text-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 text-[14px]">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-2 py-1 rounded-md bg-transparent text-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 text-[14px]">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-2 py-1 rounded-md bg-transparent text-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 text-[14px]">Select Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-2 py-1 rounded-md bg-transparent text-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            >
              <option value="admin">Admin</option>
              <option value="recruiter">Recruiter</option>
              <option value="user">User</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 text-[14px] bg-yellow hover:bg-yellow-500 text-black font-semibold rounded-md transition duration-200"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="mt-3 text-center text-gray-700 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-yellow-500 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
