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
        defaultValue: 'Low',
        validate:{
            isIn:{
                args:[['Critical','High','Medium','Low']],
                msg:'La severidad debe ser: Critical, High, Medium o Low'
            }
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate:{
            notEmpty:{ msg: 'La descripción no debe estar vacía'},
            len: {
                args:[10,500],
                msg: 'La descripción debe tener entre 10 y 500 caracteres'
            }
        }
    },
    status: {
        type: DataTypes.ENUM('New', 'In Progress', 'Resolved', 'Closed'),
        defaultValue: 'New',
        validate:{
            isIn:{
                args:[['New','In Progress','Resolved','Closed']],
                msg:'El estado no es válido. Opciones: New, In progress, Resolved o Closed'
            }
        }
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