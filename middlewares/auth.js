const User = require("../models/user")

exports.isAuthenticated = async(req, res, next) => {
  try {
    const userId = req.session.userId;
    if (!userId) {
      return res.render("signin", {message: "You must login"})
    } 
    
    req.user = await User.findById(userId);
    next()

  } catch (err) {
    return res.render("signin", {message: "You must login"})
  }
}
