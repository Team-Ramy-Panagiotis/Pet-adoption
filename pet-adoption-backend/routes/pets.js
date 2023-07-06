const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');
const Pet = require('../models/Pet');


// Create a new pet
router.post('/pets', petController.createPet);

// Get all pets
router.get('/pets', petController.getAllPets);

// Get a pet by ID
router.get('/pets/:id', petController.getPetById);

// Update a pet by ID
router.put('/pets/:id', petController.updatePetById);

// Delete a pet by ID
router.delete('/pets/:id', petController.deletePetById);

// Get pets by species
router.get('/pets/species/:species', petController.getPetsBySpecies);


module.exports = router;



