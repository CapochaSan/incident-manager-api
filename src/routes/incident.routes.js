const express = require('express');
const router = express.Router();
const incidentController = require('../controllers/incident.controller');

// Definimos los endpoints
router.post('/', incidentController.createIncident); // POST a /api/incidents
router.get('/', incidentController.getAllIncidents); // GET a /api/incidents
router.get('/:ticket_number', incidentController.getIncidentByTicket); // GET a /api/incidents/INCXXXXXX1
router.patch('/:ticket_number',incidentController.updateIncident); // PATCH para actualizar parcialmente un incidente

module.exports = router;