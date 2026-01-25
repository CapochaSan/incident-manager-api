const express = require('express');
const router = express.Router();
const incidentController = require('../controllers/incident.controller');

// Definimos los endpoints
router.post('/', incidentController.createIncident); // POST a /api/incidents
router.get('/', incidentController.getAllIncidents); // Get a /api/incidents
router.get('/:ticket_number', incidentController.getIncidentByTicket); // Get a /api/incidents/INCXXXXXX1

module.exports = router;