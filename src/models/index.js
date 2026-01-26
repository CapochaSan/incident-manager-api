const sequelize = require('../config/db');
const Incident = require('./incident.model');
const WorkNote = require('./worknote.model');

// Definir las relaciones
Incident.hasMany(WorkNote, { as: 'workNotes', foreignKey: 'incidentId' });
WorkNote.belongsTo(Incident, { foreignKey: 'incidentId' });

// Exportar los modelos y la conexión
module.exports = {
    sequelize,
    Incident,
    WorkNote
};