import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../features/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated, user } = useSelector(state => state.auth);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    console.log(email, password, "email, pass");
    e.preventDefault();
    dispatch(loginUser({ email, password }));

  };
  // Role-based navigation
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-200 via-gray-100 to-white px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-yellow-400">
        {/* <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center">Welcome Back</h2> */}
        <div className="Logo pb-3 flex items-center justify-center align-center">
          <img src={Logo} width={100} alt="" />
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              onChange={e => setEmail(e.target.value)}
              value={email}
              className="w-full px-4 py-2 rounded-md bg-tranparent text-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              onChange={e => setPassword(e.target.value)}
              value={password}
              className="w-full px-4 py-2 rounded-md bg-trnsparent text-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-yellow hover:bg-yellow-600 text-black font-semibold rounded-md transition duration-200"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-700 text-sm">
          Don't have an account? <Link to={'/register'} className="text-yellow cursor-pointer hover:underline">Sign up</Link>
        </p>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  )
}

export default Login
