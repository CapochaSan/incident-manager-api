const express = require('express');
const sequelize = require('./config/db.js');
const Incident = require('./models/incident.model'); // Importamos el modelo que creamos antes
const incidentRoutes = require('./routes/incident.routes.js');

const app = express();
app.use(express.json());

// Sincronizar BD
// 'force: false' evita que se borren los datos cada vez que reiniciamos
sequelize.sync({force:false})
    .then(() => console.log('Conexión a SQL Server exitosa y tablas sincronizadas'))
    .catch(err => console.error('Error al conectar la DB: ', err))

app.get('/api/health', (req, res) => {
    res.json({
        status: 'Operational',
        uptime: process.uptime(),
        message: 'Incident management API is running'
    });
});

app.use('/api/incidents', incidentRoutes);

app.listen(process.env.PORT, () =>  {
    console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`);
})
