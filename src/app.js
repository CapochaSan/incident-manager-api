const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// ENDPOINT de prueba: Simula un health Check de infraestructura
app.get('/api/health', (req, res) => {
    res.json({
        status: 'Operational',
        uptime: process.uptime(),
        message: 'Incident management API is running'
    });
});

app.listen(PORT, () =>  {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})
