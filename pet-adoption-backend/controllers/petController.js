const Pet = require('../models/Pet');

// Create a new pet
const createPet = async (req, res) => {
  try {
    const { name, species, age, image } = req.body;
    const pet = new Pet({ name, species, age, image });
    await pet.save();
    res.status(201).json({ pet });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create pet' });
  }
};

// Get all pets
const getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json({ pets });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get pets' });
  }
};

// Get a pet by ID
const getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    res.json({ pet });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get pet' });
  }
};

// Update a pet by ID
const updatePetById = async (req, res) => {
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
};

// Delete a pet by ID
const deletePetById = async (req, res) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);
    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    res.json({ message: 'Pet deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete pet' });
  }
};

// Get pets by species
const getPetsBySpecies = async (req, res) => {
  try {
    const species = req.params.species;
    const pets = await Pet.find({ species });
    res.json({ pets });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get pets  species' });
  }
};

module.exports = {
  createPet,
  getAllPets,
  getPetById,
  updatePetById,
  deletePetById,
  getPetsBySpecies,
};
