import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/authSlice';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, isAuthenticated, user } = useSelector(state => state.auth);

  const validationSchema = Yup.object({
    username: Yup.string().min(2).required('Full Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    role: Yup.string().required('Role is required'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      role: 'user',
    },
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      dispatch(registerUser(values))
        .unwrap()
        .then(() => {
          navigate('/login');
        })
        .catch((err) => {
          toast.error(err || "Registration failed");
        })
        .finally(() => setSubmitting(false));
    }
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate('/login');
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-200 via-gray-100 to-white px-4">
      <div className="w-full max-w-md bg-white p-4 rounded-2xl shadow-lg border border-yellow-400">
        <div className="Logo flex items-center justify-center">
          <img src={Logo} width={100} alt="Logo" />
        </div>

        <form className="space-y-5" onSubmit={formik.handleSubmit}>
          <div>
            <label className="block text-gray-700 mb-1 text-[14px]">Full Name</label>
            <input
              type="text"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="User Name"
              className="w-full px-2 py-1 text-[14px] rounded-md bg-transparent text-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            {formik.touched.username && formik.errors.username && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.username}</div>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1 text-[14px]">Email</label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="you@example.com"
              className="w-full px-2 py-1 rounded-md bg-transparent text-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1 text-[14px]">Password</label>
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="••••••••"
              className="w-full px-2 py-1 rounded-md bg-transparent text-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1 text-[14px]">Select Role</label>
            <select
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-2 py-1 rounded-md bg-transparent text-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="admin">Admin</option>
              <option value="recruiter">Recruiter</option>
              <option value="user">User</option>
            </select>
            {formik.touched.role && formik.errors.role && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.role}</div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || formik.isSubmitting}
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
