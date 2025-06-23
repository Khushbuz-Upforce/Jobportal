import React from 'react'
import AdminSidebarLayout from '../../Components/AdminComponents/AdminSidebarLayout'
import { Outlet } from 'react-router-dom'
import DashboardCard from '../../Components/AdminComponents/DashboardCard'

export const Dashboard = () => {
    return (
        <>
            <AdminSidebarLayout>
                <DashboardCard />
                <Outlet />
            </AdminSidebarLayout>
        </>
    )
}
