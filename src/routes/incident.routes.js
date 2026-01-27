const express = require('express');
const router = express.Router();
const incidentController = require('../controllers/incident.controller');
const authenticateToken = require('../middlewares/auth.middleware')

// RUTAS PROTEGIDAS 
// Definimos los endpoints
router.post('/',authenticateToken, incidentController.createIncident); // POST a /api/incidents
router.patch('/:ticket_number',authenticateToken,incidentController.updateIncident); // PATCH para actualizar parcialmente un incidente

// RUTAS PÚBLICAS - Sin el servicio de MW - Todos pueden ver los incidentes pero no crearlos o updatearlos
router.get('/:ticket_number', incidentController.getIncidentByTicket); // GET a /api/incidents/INCXXXXXX1
router.get('/', incidentController.getAllIncidents); // GET a /api/incidents

module.exports = router;