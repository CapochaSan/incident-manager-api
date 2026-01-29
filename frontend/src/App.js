import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login'; // Mové tu código de login a este archivo
import Dashboard from './components/Dashboard';
import IncidentDetail from './components/IncidentDetail';

// Componente de Protección
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  // Si no hay token, redirigimos a /login
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta pública */}
        <Route path="/login" element={<Login />} />

        {/* Ruta protegida: Volvemos a /dashboard (limpio) */}
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/incident/:ticket_number" 
          element={
            <PrivateRoute>
              <IncidentDetail />
            </PrivateRoute>
          } 
        />

        {/* Redirección por defecto */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;