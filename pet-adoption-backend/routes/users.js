const express = require('express');
const router = express.Router();
const User = require('../models/User');
const AuthController = require('../controllers/authControllers');

// Get current user
router.get('/users', AuthController.getCurrentUser);

// Register a new user
router.post('/users/register', AuthController.registerUser);

// User login
router.post('/users/login', AuthController.loginUser);

// Get user by ID
router.get('/users/:id', AuthController.getUserById);

// Update user by ID
router.put('/users/:id', AuthController.updateUser);

// Delete user by ID
router.delete('/users/:id', AuthController.deleteUserById);

module.exports = router;




