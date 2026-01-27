const {Incident, WorkNote, User} = require('../models/index')
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
        const {severity, status, username} = req.query; // Extraer los filtros de la URL
        const whereClause = {};
        
        // Si el usuario mandó severidad, aplicamos el filtro:
        if (severity){ whereClause.severity = severity};
        // Si el usuario mandó estado, aplicamos el filtro:
        if (status){ whereClause.status = status};

        let includeCondition = [{
                model: WorkNote,
                as: 'workNotes',
                // Si viene username, forzamos el INNER JOIN con required
                required: username ? true : false,
                include: [{ model: User,
                            attributes: ['username'],
                            // Si un usuario pasa ?username -> filtramos user dentro de la WorkNote
                            // Los puntos suspensivos son para agregar un parámetro adicional
                            // significa que si username existe, entonces se inyecta el param where: {...}
                            ...(username && { where: {username: username}})
                }]
            }];
        
        // Ejecución de la consulta:
        const incidents = await Incident.findAll({
            where: whereClause,
            order: [['createdAt', 'DESC']], // Los más recientes primeros (SRE Best Practise)
            include: includeCondition
        });

        res.status(200).json(incidents);
        } catch (error){
            // Si el error es de validación del Sequelize
            if (error.name === 'SequelizeValidationError'){
                const messages = error.errors.map(e => e.message);
                return res.status(400).json({ errors: messages });
            }
            res.status(500).json({message: error.message});
        }
};

// Buscar un incidente por su ticket_number 
exports.getIncidentByTicket = async (req, res) => {
    try{
        const {ticket_number} = req.params; // Extraer parametro de la URL

        const incident = await Incident.findOne({
            where: {ticket_number},
            include: [{
                model: WorkNote,
                as: 'workNotes', // Debe coincidir con el "as" definido en la relación
                include:[{
                    model: User,
                    attributes:['username']
                }]
            }]
        });

        if (!incident){
            return res.status(404).json({ message: 'Incidente no encontrado'});
        }
        res.status(200).json(incident);
    } catch (error){
        res.status(500).json({message: error.message})
    }
}

// Actualizar estado o severidad de un incidente
exports.updateIncident = async (req,res) => {
    try{
        const{ ticket_number} = req.params;
        const{ severity, status, work_note} = req.body

        // Primer paso: Buscar el incidente.
        const incident = await Incident.findOne({where: {ticket_number} });

        if (!incident) return res.status(404).json({message: 'Incidente no encontrado'});

        // Usamos .update() en vez de .save() por consistencia, y para ejecutar validaciones
        await incident.update({ status, severity},{
            validate:true //esto fuerza a que se corran las validaciones del incident.model de parte del sequelize
        });

        // Si se escribió una nota, la guardamos asociada al incidente:
        if (work_note){
            await WorkNote.create({
                note: work_note,
                incidentId: incident.id,
                userId: req.user.id  // el id viene del middleware de autentificación
            });
        }

        res.status(200).json({
            message: `Incidente ${ticket_number} actualizado con éxito`,
            data: incident
        });
    } catch (error){
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            const message = error.errors.map(e => e.message);
            return res.status(400).json({ errors: message});
        }
        res.status(500).json({ error: error.message});
    }
};