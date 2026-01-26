const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const WorkNote = sequelize.define('WorkNote', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    note:{
        type: DataTypes.TEXT,
        allowNull: false
    }
},{
    timestamps: true // Esto agrega el 'createdAt, es decir, la fecha de la nota
});

module.exports = WorkNote;