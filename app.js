const express = require('express');
const path = require('path');
require('dotenv').config()
const mongoose = require("mongoose")
const indexRouter = require('./routes/index');
const session = require('express-session');
const app = express();

// Configure session for handling user sessions
app.use(session({
  secret: process.env.SECRET, // Secret used for session encryption
  saveUninitialized: false, // Do not save uninitialized sessions
  cookie: {
    maxAge: 60 * 60 * 1000, // Set session cookie expiration time (1 hour)
  }
}));

//CONNECT DATABASE
mongoose
.connect(process.env.DATABASE)
.then(() => console.log("DB connected"))
.catch((err) => console.log(err));

// Set up the template engine (EJS) and views directory
const templatePath = path.join(__dirname, './views');
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", templatePath); 
app.use(express.urlencoded({extended: true}));
app.use(express.static("public")); // Serve static files from the "public" directory

// Route for handling index
app.use("/", indexRouter);

// Set up port for the application
const port = process.env.PORT || 8000;

// Start the server and log a message when it's listening
app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});

module.exports = app;
