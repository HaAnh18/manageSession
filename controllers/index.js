const User = require("../models/user");
const { hashPwd } = require("../middlewares/hash");
const bcrypt = require("bcryptjs");
const { format } = require("date-fns");
const path = require("path");
const fs = require("fs");

// Controller function for rendering the signup page
exports.getSignup = async (req, res) => {
  // Check if the user is already logged in (using session)
  const userId = req.session.userId;

  // If the user is already logged in, redirect to the home page
  if (userId) {
    return res.redirect("/");
  } else {
    // If the user is not logged in, render the signup page
    return res.render("signup");
  }
};

// Controller function for rendering the signin page
exports.getSignin = async (req, res) => {
  const userId = req.session.userId;
  if (userId) {
    return res.redirect("/");
  } else {
    return res.render("signin");
  }
}; 

// Controller function for handling user signin
exports.signin = async (req, res) => {
  // Extracting username and password from the request body
  const data = {
    username: req?.body?.username,
    password: req?.body?.password,
  };
  // Finding the user in the database based on the provided username
  const user = await User.findOne({ username: data.username });

  // If the user is not found, render the signin page with an error message
  if (!user) {
    return res.render("signin", { message: "Invalid credential" });
  }

  // Checking if the provided password matches the hashed password stored in the database
  const isPasswordValid = bcrypt.compareSync(data.password, user.password);

  // If the password is valid, set a session for the user and redirect to the home page
  if (isPasswordValid) {
    req.session.userId = user.id;

    // Setting a session cookie expiration time (1 hour in this case)
    req.session.cookie.expires = new Date(Date.now() + 60 * 60 * 1000);
    return res.redirect("/");
  } else {
    // If the password is invalid, render the signin page with an error message
    return res.render("signin", { message: "Invalid credential" });
  }
};

// Controller function for handling user signup
exports.signup = async (req, res, next) => {
  // Hash the provided password using the hashPwd function
  const password = await hashPwd(req?.body?.password, next);

  // Constructing the user data object
  const data = {
    username: req?.body?.username,
    name: req?.body?.name,
    password: password,
    photo: req?.file?.filename,
    dob: req?.body?.dob,
    bio: req?.body?.bio,
  };

  // Check if the username already exists in the database
  const usernameExist = await User.findOne({ username: data.username });

  // If the username already exists, render the signup page with an error message
  if (usernameExist) {
    return res.render("signup", { message: "Username already exists" });
  }

  // Create a new user in the database with the provided data
  await User.create(data);

  // Redirect the user to the signin page after successful signup
  res.redirect("/signin");
};

// Controller function for handling user signout
exports.signout = async (req, res, next) => {
  // Destroy the user's session
  req.session.destroy((err) => {
    if (err) {
      // If there's an error destroying the session, log the error and send a 500 Internal Server Error response
      console.error("Error destroying session:", err);
      res.status(500).send("Internal Server Error");
    } else {
      // If the session is successfully destroyed, redirect to the signin page or another page after logout
      res.redirect("/signin");
    }
  });
};

// Controller function for rendering the homepage
exports.getHomepage = async (req, res) => {
  // Assuming that req.user contains user information including the date of birth (dob)
  const normalDate = new Date(req.user.dob);

  // Format the date of birth to "dd/MM/yyyy" using the date-fns library
  const date = format(normalDate, "dd/MM/yyyy");

  // Render the homepage view with the user data and formatted date

  res.render("homepage", { user: req.user, dob: date });
};
