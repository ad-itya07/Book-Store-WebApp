import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = ({children}) => {
  const token = localStorage.getItem('token');
  const tokenExpiry = localStorage.getItem("tokenExpiry");
  if (!token || (tokenExpiry && Date.now() > parseInt(tokenExpiry, 10))) {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiry");

    alert("Session expired. Please log in again.");
    return <Navigate to="/admin/login"/>
  }
  return children ?  children : <Outlet/>;
}

export default AdminRoute