// routes/api/userRoutes.js
const express = require('express');
const router = express.Router();
const { authController } = require('../../controllers');

// User registration route
router.post('/register', authController.register);

// User login route
router.post('/login', authController.login);

// User logout route
router.get('/logout', authController.logout);

module.exports = router;
