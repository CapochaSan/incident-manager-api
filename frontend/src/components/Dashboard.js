import React, { useEffect, useState, useCallback } from 'react';
import api from '../services/api';
import { Filter, Search, RotateCcw, LogOut } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { logout } from '../services/authService';


// 1. Estilos fuera para evitar re-crearlos en cada render
const styles = {
    filterBar: { display: 'flex', gap: '20px', background: '#ffffff', padding: '20px', borderRadius: '10px', marginBottom: '30px', alignItems: 'flex-end', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: '1px solid #e1e8ed' },
    filterGroup: { display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 },
    label: { fontSize: '0.85rem', fontWeight: '600', color: '#34495e', display: 'flex', alignItems: 'center', gap: '5px' },
    select: { padding: '10px', borderRadius: '6px', border: '1px solid #dcdfe6', backgroundColor: '#fff', outline: 'none' },
    input: { padding: '10px', borderRadius: '6px', border: '1px solid #dcdfe6', outline: 'none' },
    searchBtn: { padding: '10px 25px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
    resetBtn: { background: '#ecf0f1', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer', color: '#7f8c8d', display: 'flex', alignItems: 'center', justifyContent: 'center' }
};

const Dashboard = () => {
    const [incidents, setIncidents] = useState([]);
    const navigate = useNavigate();

    // Filtros
    const [severity, setSeverity] = useState('');
    const [status, setStatus] = useState('');
    const [username, setUsername] = useState('');

    // 2. Función de carga envuelta en useCallback para estabilidad
    // useCallback(función, deps) -> mientras deps no cambien [severity, status, username]
    // -> devuelve la misma función | si cambian los deps -> función nueva, referencia nueva
    const fetchIncidents = useCallback(async () => {
        try {
            const params = new URLSearchParams();
            if (severity) params.append('severity', severity);
            if (status) params.append('status', status);
            if (username) params.append('username', username);

            const response = await api.get(`/incidents?${params.toString()}`);
            setIncidents(response.data);
        } catch (error) {
            console.error("Error filtrando incidentes", error);
        }
    }, [severity, status, username]);

    useEffect(() => {
        fetchIncidents();
    }, [fetchIncidents]);

    const handleReset = () => {
        setSeverity('');
        setStatus('');
        setUsername('');
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // 3. Parseo seguro del usuario
    const getUserDisplayName = () => {
        try {
            const user = localStorage.getItem('user');
            return user ? JSON.parse(user).username : 'vagnisa';
        } catch (e) {
            return 'vagnisa';
        }
    };

    return (
        <div className="dashboard-container" style={{ padding: '2rem', backgroundColor: '#f8f9fa' }}>
            {/* HEADER */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <div>
                    <h1 style={{ margin: 0, color: '#2c3e50' }}>Incident Management System</h1>
                    <p style={{ margin: 0, color: '#7f8c8d' }}>Centro de Operaciones - Río Segundo</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ textAlign: 'right' }}>
                        <span style={{ display: 'block', fontSize: '0.8rem', color: '#95a5a6' }}>Usuario Activo</span>
                        <strong style={{ color: '#34495e' }}>{getUserDisplayName()}</strong>
                    </div>
                    <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '10px 18px', borderRadius: '6px', cursor: 'pointer' }}>
                        <LogOut size={18} /> Salir
                    </button>
                </div>
            </div>

            {/* FILTROS */}
            <div style={styles.filterBar}>
                <div style={styles.filterGroup}>
                    <label style={styles.label}><Filter size={14} /> Severidad</label>
                    <select value={severity} onChange={(e) => setSeverity(e.target.value)} style={styles.select}>
                        <option value="">Todas</option>
                        <option value="Critical">Critical</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>
                <div style={styles.filterGroup}>
                    <label style={styles.label}>Estado</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)} style={styles.select}>
                        <option value="">Todos</option>
                        <option value="New">New</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                    </select>
                </div>
                <div style={styles.filterGroup}>
                    <label style={styles.label}><Search size={14} /> Técnico</label>
                    <input type="text" placeholder="Ej: angidebi" value={username} onChange={(e) => setUsername(e.target.value)} style={styles.input} />
                </div>
                <button onClick={handleReset} style={styles.resetBtn} title="Limpiar todo">
                    <RotateCcw size={20} />
                </button>
            </div>

            {/* TABLA */}
            <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                <table className="incident-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ backgroundColor: '#f1f3f5' }}>
                        <tr>
                            <th style={{ padding: '12px' }}>Ticket ID</th>
                            <th>Descripción</th>
                            <th>Severidad</th>
                            <th>Estado</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {incidents.length > 0 ? (
                            incidents.map(inc => (
                                <tr key={inc.id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '12px' }}>
                                        <Link to={`/incident/${inc.ticket_number}`} style={{ color: '#3498db', fontWeight: 'bold', textDecoration: 'none' }}>
                                            {inc.ticket_number}
                                        </Link>
                                    </td>
                                    <td>{inc.description}</td>
                                    <td><span className={`badge-sev sev-${inc.severity}`}>{inc.severity}</span></td>
                                    <td><span className={`status-badge status-${inc.status.replace(/\s+/g, '')}`}>{inc.status}</span></td>
                                    <td>{new Date(inc.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="5" style={{ textAlign: 'center', padding: '40px' }}>No hay incidentes.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;