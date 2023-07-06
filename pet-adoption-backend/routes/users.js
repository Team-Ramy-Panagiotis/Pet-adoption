const express = require('express');
const router = express.Router();
const User = require('../models/User');
const AuthController = require('../controllers/authControllers');

// Get current user
router.get('', AuthController.getCurrentUser);

// Register a new user
router.post('/register', AuthController.registerUser);

// User login
router.post('/login', AuthController.loginUser);

// Get user by ID
router.get('/:id', AuthController.getUserById);

// Update user by ID
router.put('/:id', AuthController.updateUser);

module.exports = router;




