const User = require("../models/user")

// Middleware function to check if the user is authenticated
exports.isAuthenticated = async(req, res, next) => {
  try {
    // Retrieve the user ID from the session
    const userId = req.session.userId;

    // If the user ID is not present, redirect to the signin page with a message
    if (!userId) {
      return res.render("signin", {message: "You must login"})
    } 
    
    // Fetch the user data from the database based on the user ID
    req.user = await User.findById(userId);
    next()

  } catch (err) {
    // If there's an error during the process, redirect to the signin page with a message
    return res.render("signin", {message: "You must login"})
  }
}
