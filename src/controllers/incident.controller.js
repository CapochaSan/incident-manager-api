const Incident = require('../models/incident.model')

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
        const incidents = await Incident.findAll();
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