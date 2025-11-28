import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Employees from './pages/Employees';
import Layout from './components/Layout';
import SecureRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';

const ApplicationRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/" element={
        <SecureRoute>
          <Layout>
            <Dashboard />
          </Layout>
        </SecureRoute>
      } />

      <Route path="/tasks" element={
        <SecureRoute>
          <Layout>
            <Tasks />
          </Layout>
        </SecureRoute>
      } />

      <Route path="/employees" element={
        <SecureRoute allowedRoles={['admin']}>
          <Layout>
            <Employees />
          </Layout>
        </SecureRoute>
      } />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

function MainApp() {
  return (
    <ApplicationRoutes />
  );
}

export default MainApp;
