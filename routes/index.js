const express = require('express');
const router = express.Router();
const { signup, signin, signout, getSignin, getSignup, getHomepage } = require("../controllers/index");
const { isAuthenticated } = require("../middlewares/auth")
const handleFileUploadError = require("../middlewares/upload")

router.get("/", isAuthenticated, getHomepage)

router.get("/signup", getSignup)

router.get("/signin", getSignin)

router.post("/signup", handleFileUploadError, signup)

router.post("/signin", signin)

router.get("/signout", signout)

module.exports = router;
