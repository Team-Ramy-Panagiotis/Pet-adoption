const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const usersRoutes = require('./routes/users');
const petsRoutes = require('./routes/pets');



mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// routes and middleware here
// Middleware
app.use(express.json());

// Routes
app.use('/api', usersRoutes);
app.use('/api', petsRoutes);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
