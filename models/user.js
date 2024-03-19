const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"]
  },
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  photo: {
    type: String,
  },
  dob: {
    type: Date,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  }
})

// Create and export the User model based on the schema
module.exports = mongoose.model("User", userSchema);








