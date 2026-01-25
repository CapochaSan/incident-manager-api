const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Incident = sequelize.define('Incident', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    ticket_number: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true // Se llena automáticamente en el Hook
    },
    severity: {
        type: DataTypes.ENUM('Critical', 'High', 'Medium', 'Low'),
        defaultValue: 'Low'
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('New', 'In Progress', 'Resolved', 'Closed'),
        defaultValue: 'New'
    }
}, {
    hooks: {
        // Este código se ejecuta antes de insertar en la DB
        beforeCreate: async (incident, options) => {
            // Buscamos el último ID insertado para predecir el siguiente
            const lastIncident = await Incident.findOne({
                order: [['id', 'DESC']]
            });
            
            const nextId = lastIncident ? lastIncident.id + 1 : 1;
            
            // Formateo: INC + el número con 8 ceros a la izquierda
            incident.ticket_number = `INC${nextId.toString().padStart(8, '0')}`;
        }
    }
});

module.exports = Incident;