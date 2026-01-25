const {Sequelize} = require('sequelize');
require('dotenv').config();

// Configuración para SQL Server
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER,process.env.DB_PASS,{
    host: process.env.DB_HOST,
    dialect: 'mssql', // Especificamos SQL Server
    dialectOptions: {
        options: {
            encrypt: true, // Para redes seguras o Azure
            trustServerCertificate: true // Para desarrollo local
        }
    },
    logging: false // Para no llenar la consola de consultas
});

module.exports = sequelize;