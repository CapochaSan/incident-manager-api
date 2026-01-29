import React, {useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from '../services/api';
import '../styles/Enterprise.css';

const IncidentDetail = () => {
    const { ticket_number } = useParams();
    const [incident, setIncident] = useState(null);
    const navigate = useNavigate();
    const [newNote, setNewNote] = useState('');
    const user = (() => {
    try {
                const userData = localStorage.getItem('user');
                return userData ? JSON.parse(userData) : { username: 'Invitado' };
            } catch (e) {
                return { username: 'Invitado' };
            }
        })();

    const handleSubmitNote = async (e) => {
        e.preventDefault();
        if(!newNote.trim()) return;

        try{
            // Se llama al Endpoint de PATCH del back y se actualiza el inc y crea la nota
            await api.patch(`/incidents/${ticket_number}`,{
                work_note:  newNote,
                status: incident.status // Mantenemos el estado actual
            });

            // Se limpia el input y recarga de detalle de inc para ver la nueva nota
            setNewNote('');
            const refreshed = await api.get(`/incidents/${ticket_number}`);
            setIncident(refreshed.data);
        } catch (error) {
            console.error(' Error al guardar la nota', error)
        }
    };
    const handleStatusChange = async (newStatus) => {

        const currentStatus = incident.status;

        // Chequeo de consistencia de la máquina de estados
        // No se puede volver al estado new:
        if(newStatus === 'New' && (currentStatus === 'In progress' || currentStatus === 'Resolved')){
            alert('No se puede volver al estado "New" una vez iniciado el estado In Progress.');
            return;
        };
        // Confirmación para reabrir el tkt
        if(currentStatus === 'Resolved' && newStatus === 'In Progress'){
            if(!window.confirm("¿Deseas reabrir el ticket?")) return;
        };
        
        let closeNote = "";
        if(newStatus === 'Resolved'){
            const reason = window.prompt("Por favor, ingresa las Close Notes (Motivo del cierre): ");
            if(!reason || reason.trim() === ""){
                alert("Es obligatorio indicar el motivo para cerrar el ticket.");
                return;
            }
            closeNote = `*** CLOSE NOTES ***: ${reason}`;
        } else {
            // Confirmación para pasar de cualquier estado a otro
            if (!window.confirm(`¿Cambiar estado a ${newStatus}?`)) return;
        };

        // Envío al backend
        try {
            // Endpoint del patch
            await api.patch(`/incidents/${ticket_number}`, {
            status: newStatus,
            work_note: closeNote || `Estado actualizado a: ${newStatus}` 
            });
            
            // Refrescamos para ver el cambio 
            const refreshed = await api.get(`/incidents/${ticket_number}`);
            setIncident(refreshed.data);
        } catch (error) {
            console.error("Error al cambiar el estado", error);
        }
        };
    useEffect(() => {
        const fetchDetail = async () => {
            try{
            // Llamada al endpoint de busqueda por ticker del back
            const response = await api.get(`/incidents/${ticket_number}`);
            setIncident(response.data);
            } catch (error) {
                console.error("Error al traer el detalle", error);
            }    
        };
        fetchDetail();

    }, [ticket_number] );

if (!incident) return <p style={{ padding: '20px', fontFamily: 'sans-serif' }}> Cargando información del ticket... </p>;

    return (
        <div style={{ padding: '30px', backgroundColor: '#f4f7f6', minHeight: '100vh', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
            {/* Botón Volver con Estilo */}
            <button 
                onClick={() => navigate('/dashboard')} 
                style={{ marginBottom: '20px', padding: '8px 15px', borderRadius: '4px', border: '1px solid #ccc', cursor: 'pointer', backgroundColor: '#fff' }}
            >
                ← Volver al Dashboard
            </button>
            
            <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                
                {/* 1. STATUS STEPPER (DISEÑO REFORZADO) */}
<div style={{ 
    display: 'flex', 
    width: '100%', 
    marginBottom: '40px', 
    gap: '15px', 
    padding: '10px',
    background: '#f8f9fa',
    borderRadius: '8px'
}}>
    {['New', 'In Progress', 'Resolved'].map((s) => {
        // Normalizamos el string para la comparación (evitar errores de 'In progress' vs 'In Progress')
        const currentLower = incident.status.toLowerCase();
        const stepLower = s.toLowerCase();
        
        const isCurrentActive = currentLower === stepLower;
        const isPastNew = stepLower === 'new' && currentLower !== 'new';
        
        return (
            <div 
                            key={s}
                            onClick={() => !isPastNew && handleStatusChange(s)}
                            style={{
                                flex: 1,
                                padding: '20px 10px',
                                textAlign: 'center',
                                fontWeight: 'bold',
                                cursor: isPastNew ? 'not-allowed' : 'pointer',
                                // EL AZUL DE TU IMAGEN: #2c5e9e
                                backgroundColor: isCurrentActive ? '#2c5e9e' : (isPastNew ? '#e9ecef' : '#ffffff'),
                                color: isCurrentActive ? '#ffffff' : (isPastNew ? '#adb5bd' : '#2c5e9e'),
                                border: isCurrentActive ? '2px solid #1a3a63' : '2px solid #dee2e6',
                                borderRadius: '10px',
                                opacity: isPastNew ? 0.5 : 1,
                                transition: 'all 0.2s ease',
                                boxShadow: isCurrentActive ? '0 4px 12px rgba(44, 94, 158, 0.4)' : 'none',
                                fontSize: '1rem'
                            }}
                        >
                            {s.toUpperCase()}
                        </div>
                    );
                })} 
            </div>

                {/* Encabezado del Ticket */}
                <h1 style={{ margin: '0 0 10px 0', fontSize: '1.6rem', color: '#1a202c' }}>
                    {incident.ticket_number}: {incident.description}
                </h1>
                {/*<p style={{ color: '#718096', marginBottom: '30px' }}>
                    Sede: <strong>Río Segundo</strong> | Servidor: <strong>winstg001</strong>
                </p> */}
                
                <hr style={{ border: '0', borderTop: '1px solid #edf2f7', margin: '30px 0' }} />
                
                {/* 2. ACTIVITY STREAM */}
                <h3 style={{ color: '#2d3748', marginBottom: '20px' }}>Activity Stream (Work Notes)</h3>
                <div style={{ maxHeight: '400px', overflowY: 'auto', paddingRight: '10px' }}>
                    {incident.workNotes && incident.workNotes.length > 0 ? (
                        incident.workNotes.map(note => (
                            <div key={note.id} style={{ marginBottom: '20px', padding: '15px', borderLeft: '4px solid #3182ce', background: '#f7fafc', borderRadius: '0 8px 8px 0' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <strong style={{ color: '#2c5282' }}>{note.User?.username || 'Sistema'}</strong>
                                    <small style={{ color: '#a0aec0' }}>{new Date(note.createdAt).toLocaleString()}</small>
                                </div>
                                <p style={{ margin: 0, color: '#4a5568', lineHeight: '1.5' }}>{note.note}</p>
                            </div>
                        ))
                    ) : (
                        <p style={{ color: '#a0aec0', fontStyle: 'italic' }}>No hay actualizaciones aún.</p>
                    )}
                </div>

                {/* 3. FORMULARIO DE ACTUALIZACIÓN */}
                <div style={{ marginTop: '40px', borderTop: '2px solid #edf2f7', paddingTop: '30px' }}>
                    <h3 style={{ color: '#2d3748', marginBottom: '15px' }}>Registrar Nueva Actualización</h3>
                    <form onSubmit={handleSubmitNote}>
                        <textarea 
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                            placeholder="Describe el avance técnico aquí..."
                            style={{ 
                                width: '100%', minHeight: '120px', padding: '15px', borderRadius: '8px', 
                                border: '1px solid #cbd5e0', fontFamily: 'inherit', fontSize: '1rem',
                                outline: 'none', transition: 'border-color 0.2s'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#3182ce'}
                            onBlur={(e) => e.target.style.borderColor = '#cbd5e0'}
                        />
                        <button 
                            type="submit" 
                            style={{ 
                                marginTop: '15px', padding: '12px 30px', backgroundColor: '#38a169', 
                                color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', 
                                fontWeight: 'bold', fontSize: '1rem', transition: 'background 0.2s' 
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#2f855a'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#38a169'}
                        >
                            Postear en Bitácora
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default IncidentDetail;