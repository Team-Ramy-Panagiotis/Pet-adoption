const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');

// pet-related routes here
// Create a new pet
router.post('/pets', async (req, res) => {
  try {
    const { name, species, age, image } = req.body;
    const pet = new Pet({ name, species, age, image });
    await pet.save();
    res.status(201).json({ pet });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create pet' });
  }
});

// Get all pets
router.get('/pets', async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json({ pets });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get pets' });
  }
});

// Get a pet by ID
router.get('/pets/:id', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    res.json({ pet });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get pet' });
  }
});

// Update a pet by ID
router.put('/pets/:id', async (req, res) => {
  try {
    const { name, species, age } = req.body;
    const pet = await Pet.findByIdAndUpdate(
      req.params.id,
      { name, species, age },
      { new: true }
    );
    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    res.json({ pet });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update pet' });
  }
});

// Delete a pet by ID
router.delete('/pets/:id', async (req, res) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);
    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    res.json({ message: 'Pet deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete pet' });
  }
});


module.exports = router;


