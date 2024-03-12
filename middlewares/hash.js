const bcrypt = require("bcryptjs");

// Function to hash a password
exports.hashPwd = async function (password) {
  // Generate a salt for password hashing
  const salt = await bcrypt.genSalt();

  // Hash the password using the generated salt
  const hashPwd = await bcrypt.hash(password, salt);

  // Return the hashed password
  return hashPwd;
};
