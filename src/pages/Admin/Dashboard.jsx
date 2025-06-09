import React, { useContext } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { UserContext } from '../../context/userContext'
import { useUserAuth } from '../../hooks/useUserAuth'

const Dashboard = () => {
  useUserAuth()

  const { user } = useContext(UserContext);
  return (
    <DashboardLayout activeMenu={"Dashboard"}>Dashboard</DashboardLayout>
  )
}

export default Dashboard