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
import UserProfile from './Pages/Admin/User/UserProfile'

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={
          <ProtectedRoute role="admin">
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path="/admin/users" element={<ProtectedRoute role="admin"><AdminUsersPage /></ProtectedRoute>} />
        <Route path="/admin/jobs" element={<ProtectedRoute role="admin"><AdminJobsPage /></ProtectedRoute>} />
        <Route path="/admin/company" element={<ProtectedRoute role="admin"><AdminCompaniesPage /></ProtectedRoute>} />
        <Route path="/admin/aplication" element={<ProtectedRoute role="admin"><AdminApplicationsPage /></ProtectedRoute>} />
        <Route path="/admin/profile" element={<ProtectedRoute role="admin"><UserProfile /></ProtectedRoute>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
