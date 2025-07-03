import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpinner from './Components/LoadingSpinner';

// Correct lazy-loaded imports
const Home = lazy(() => import('./Pages/Home'));
const Login = lazy(() => import('./Pages/Auth/Login'));
const Register = lazy(() => import('./Pages/Auth/Register'));

const Dashboard = lazy(() => import('./Pages/Admin/Dashboard'));
const AdminJobsPage = lazy(() => import('./Pages/Admin/Jobs/AdminJobsPage'));
const AdminCompaniesPage = lazy(() => import('./Pages/Admin/Companies/AdminCompaniesPage'));
const AdminUsersPage = lazy(() => import('./Pages/Admin/User/AdminUsersPage'));
const AdminApplicationsPage = lazy(() => import('./Pages/Admin/Applications/AdminApplicationsPage'));
const AdminProfilePage = lazy(() => import('./Pages/Admin/User/AdminProfilePage'));

const UserProfile = lazy(() => import('./Pages/User/UserProfile'));
const JobsPage = lazy(() => import('./Pages/User/JobsPage'));
const JobDetailsPage = lazy(() => import('./Components/UserComponents/JobDetailsPage'));
const MyApplications = lazy(() => import('./Pages/User/MyApplications'));

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>

          <Route path="/" element={<Home />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin Panel */}
          <Route path="/admin" element={<ProtectedRoute role="admin"><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute role="admin"><AdminUsersPage /></ProtectedRoute>} />
          <Route path="/admin/jobs" element={<ProtectedRoute role="admin"><AdminJobsPage /></ProtectedRoute>} />
          <Route path="/admin/company" element={<ProtectedRoute role="admin"><AdminCompaniesPage /></ProtectedRoute>} />
          <Route path="/admin/aplication" element={<ProtectedRoute role="admin"><AdminApplicationsPage /></ProtectedRoute>} />
          <Route path="/admin/profile" element={<ProtectedRoute role="admin"><AdminProfilePage /></ProtectedRoute>} />

          {/* User Panel */}
          <Route path="/user/profile" element={<ProtectedRoute role="user"><UserProfile /></ProtectedRoute>} />
          <Route path="/jobs" element={<ProtectedRoute role="user"><JobsPage /></ProtectedRoute>} />
          <Route path="/jobs/:jobId" element={<ProtectedRoute role="user"><JobDetailsPage /></ProtectedRoute>} />
          <Route path="/application" element={<ProtectedRoute role="user"><MyApplications /></ProtectedRoute>} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
