const User = require("../models/user")
const { hashPwd } = require("../middlewares/hash");
const bcrypt = require("bcryptjs");

exports.getSignup = async (req, res, next) => {
  const userId = req.session.userId;
  if (userId) {
    return res.redirect("/")
  } else {
    return res.render("signup");
  }
}

exports.getSignin = async (req, res, next) => {
  const userId = req.session.userId;
  if (userId) {
    return res.redirect("/")
  } else {
    return res.render("signin");
  }
}

exports.signin = async(req, res, next) => {
  const data = {
    username: req?.body?.username,
    password: req?.body?.password,
  }
  try {
    const user = await User.findOne({username: data.username});

    if (!user) {
      return res.render("signin", { message: "Invalid credential" });
    }

    const isPasswordValid = bcrypt.compareSync(data.password, user.password);

    if (isPasswordValid) {
      req.session.userId = user.id;
      req.session.cookie.expires = new Date(Date.now() + 60 * 60 * 1000);
      return res.redirect("/");
    } else {
      return res.render("signin", { message: "Invalid credential" });
    }

  } catch (err) {
    console.log(err);
  }
}

exports.signup = async(req, res, next) => {
  const password = await hashPwd(req?.body?.password, next);
  const data = {
    username: req?.body?.username,
    password: password,
  }
  const usernameExist = await User.findOne({username: data.username})

  if (usernameExist) {
    return res.render("signup", { message: "Username already exists" });    
  }

  await User.create(data);

  res.redirect("/signin")
}

exports.signout = async(req, res, next) => {
  req.session.destroy(err => {
    if (err) {
        console.error('Error destroying session:', err);
        res.status(500).send('Internal Server Error');
    } else {
        // Redirect to the login page or another page after logout
        res.redirect('/signin');
    }
});
}

exports.getHomepage = async(req, res) => {
  console.log(req.user);
  res.render("homepage", {user: req.user});
}