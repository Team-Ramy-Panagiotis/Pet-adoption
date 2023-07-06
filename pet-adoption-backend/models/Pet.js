const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  species: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
   image: {
    type: String
  }
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
