const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Definimos los endpoints
router.post('/register', authController.register); // POST a /api/auth
router.post('/login', authController.login); // GET? a /api/auth/login

module.exports = router;