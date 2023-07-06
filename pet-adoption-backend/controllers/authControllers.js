const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { validationResult } = require('express-validator');

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //check if all fields are filled
    if (!password || !email || !name) {
      return res.status(400).json("Please fill out all the inputs properly");
    }

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Create a jwt with EMAIL
    const token = jwt.sign(
      {
        data: email,
      },
      process.env.JWT_SECRET,
      { expiresIn: 60 * 60 }
    );

    // Create a new user
    const newUser = await User.create({ name, email, password: hashedPassword  });

    res.json({ message: 'User registered successfully', user: newUser , token:token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const loginUser = async(req,res)=>{
  try{
    const {email , password } = req.body

  //Check if the inputs are filled properly
  if (!password || !email ) {
    return res(401).json("Please fill out all the inputs properly");
  }

  //check if the email exists in the db
  const existingUser = await User.findOne({ email });
  if(!existingUser){
    return res.status(401).json({ message: 'Invalid credentials' }); 
  }

  // check if the hashed password is the same as the one in the db
  const match = await bcrypt.compare(password, existingUser.password)

  //If it doesnt match 
    if(!match){
     return res.status(401).json({message: 'Invalid credentials' })
      
    }else{
      //create a token
      const token = jwt.sign({
        data: email
      }, process.env.JWT_SECRET, { expiresIn: 60 * 60 });
      res.status(200).json({message:"Signed in successfully" , token:token})
    }
    ;

  } catch(error){
    console.log(error)
    res.status(500).json({ message: 'Server error' });
  }
}

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user by ID
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email } = req.body;

    // Find the user by ID and update the fields
    const updatedUser = await User.findByIdAndUpdate(userId, { name, email }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get current user
const getCurrentUser = async (req, res) => {
  let token = req.header('Authorization');
  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify and decode the token
    token = token.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({email:decoded.data});
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = {
  getUserById,
  registerUser,
  loginUser,
  updateUser,
  getCurrentUser,
};
