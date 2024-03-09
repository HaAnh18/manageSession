const mongoose = require('mongoose');

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
    required: true,
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

module.exports = mongoose.model("User", userSchema);