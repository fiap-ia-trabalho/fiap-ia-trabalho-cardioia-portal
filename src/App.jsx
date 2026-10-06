import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PortalProvider } from './contexts/PortalContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Appointments from './pages/Appointments';

export default function App() {
  return <HashRouter><AuthProvider><Routes><Route path="/login" element={<Login />} /><Route element={<ProtectedRoute><PortalProvider><Layout /></PortalProvider></ProtectedRoute>}><Route index element={<Dashboard />} /><Route path="/pacientes" element={<Patients />} /><Route path="/agendamentos" element={<Appointments />} /></Route><Route path="*" element={<Navigate to="/" replace />} /></Routes></AuthProvider></HashRouter>;
}
