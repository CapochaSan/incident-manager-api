const Incident = require('../models/incident.model')
const {op} = require('sequelize'); // Importación de operadores de Sequelize

// Crear un nuevo incidente 
exports.createIncident = async (req, res) => {
    try{
        // Extraemos los datos del cuerpo de la petición (POST)
        const { severity, description} = req.body;

        // Guardamos en SQL Server usando el modelo de Sequelize
        const newIncident = await Incident.create({
            severity,
            description,
        });
        res.status(201).json({
            message: 'Incidente reportado con éxito',
            ticket: newIncident.ticket_number,
            data: newIncident
        });
    }catch (error) {
        res.status(500).json({
            message: 'Error al crear el incidente',
            error: error.message
        });
    }
};

// Obtener todos los incidentes (Para el dash de monitoreo)}
exports.getAllIncidents = async (req, res) => {
    try{
        const {severity, status} = req.query; // Extraer el filtro de la URL
        let whereClause = {};

        // Si el usuario mandó severidad, aplicamos el filtro:
        if (severity){
            whereClause.severity = severity
        }

        // Si el usuario mandó estado, aplicamos el filtro:
        if (status){
            whereClause.status = status
        }
        const incidents = await Incident.findAll({
            where: whereClause,
            order: [['createdAt', 'DESC']] // Los más recientes primeros (SRE Best Practise)
        });
        
        res.status(200).json(incidents);
        } catch (error){
            res.status(500).json({message: error.message});
        }
};

// Buscar un incidente por su ticket_number 
exports.getIncidentByTicket = async (req, res) => {
    try{
        const {ticket_number} = req.params; // Extraer parametro de la URL

        const incident = await Incident.findOne({
            where: {ticket_number: ticket_number}
        });

        if (!incident){
            return res.status(404).json({ message: 'Incidente no encontrado'});
        }
        res.status(200).json(incident);
    } catch (error){
        res.status(500).json({message: error.message})
    }
}