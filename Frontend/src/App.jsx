import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
import { Dashboard } from './Pages/Admin/Dashboard'
import Home from './Pages/Home'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './ProtectedRoute'
import AdminJobsPage from './Pages/Admin/Jobs/AdminJobsPage'
import AdminCompaniesPage from './Pages/Admin/Conpanies/AdminCompaniesPage'
import AdminUsersPage from './Pages/Admin/User/AdminUsersPage '
import AdminApplicationsPage from './Pages/Admin/Applications/AdminApplicationsPage'
import AdminProfilePage from './Pages/Admin/User/AdminProfilePage'
import UserProfile from './Pages/User/UserProfile'
import JobsPage from './Pages/User/JobsPage'
import JobDetailsPage from './Components/UserComponents/JobDetailsPage'
import MyApplications from './Pages/User/MyApplications'

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>

        <Route path="/" element={<Home />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin panal */}
        <Route path="/admin" element={
          <ProtectedRoute role="admin">
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path="/admin/users" element={<ProtectedRoute role="admin"><AdminUsersPage /></ProtectedRoute>} />
        <Route path="/admin/jobs" element={<ProtectedRoute role="admin"><AdminJobsPage /></ProtectedRoute>} />
        <Route path="/admin/company" element={<ProtectedRoute role="admin"><AdminCompaniesPage /></ProtectedRoute>} />
        <Route path="/admin/aplication" element={<ProtectedRoute role="admin"><AdminApplicationsPage /></ProtectedRoute>} />
        <Route path="/admin/profile" element={<ProtectedRoute role="admin"><AdminProfilePage /></ProtectedRoute>} />

        {/* User Panal */}
        <Route path="/user/profile" element={<ProtectedRoute role="user"><UserProfile /></ProtectedRoute>} />
        <Route path="/user/profile" element={<ProtectedRoute role="user"><UserProfile /></ProtectedRoute>} />
        <Route path="/jobs" element={<ProtectedRoute role="user"><JobsPage /></ProtectedRoute>} />
        <Route path="/jobs/:jobId" element={<ProtectedRoute role="user"><JobDetailsPage /></ProtectedRoute>} />
        <Route path="/application" element={<ProtectedRoute role="user"><MyApplications /></ProtectedRoute>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
