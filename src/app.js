const express = require('express');
const {sequelize} = require('./models/index');
const incidentRoutes = require('./routes/incident.routes')
const authRoutes = require('./routes/auth.routes')

const app = express();
app.use(express.json());

// RUTAS:
app.use('/api/incidents', incidentRoutes);
app.use('/api/auth', authRoutes);

// Sincronizar BD
// 'force: false' evita que se borren los datos cada vez que reiniciamos
sequelize.sync({force:false})
    .then(() => {
        console.log('Conexión a SQL Server exitosa y tablas sincronizadas')
        app.listen(process.env.PORT, () => console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`));
    })
    .catch(err => console.error('Error al conectar la DB: ', err))

app.get('/api/health', (req, res) => {
    res.json({
        status: 'Operational',
        uptime: process.uptime(),
        message: 'Incident management API is running'
    });
});

app.listen(process.env.PORT, () =>  {
    console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`);
})
