const sequelize = require('../config/db');
const Incident = require('./incident.model');
const WorkNote = require('./worknote.model');
const User = require('./user.model');

// Definir las relaciones
Incident.hasMany(WorkNote, { as: 'workNotes', foreignKey: 'incidentId' });
WorkNote.belongsTo(Incident, { foreignKey: 'incidentId' });

// Relación: ¿Quien hizo la nota?
User.hasMany(WorkNote, {as: 'workNotes', foreignKey: 'userId'});
WorkNote.belongsTo(User, {foreignKey: 'userId'});


// Exportar los modelos y la conexión
module.exports = {
    sequelize,
    Incident,
    WorkNote,
    User
};