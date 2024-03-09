var express = require('express');
var path = require('path');
require('dotenv').config()
const mongoose = require("mongoose")
var indexRouter = require('./routes/index');
const session = require('express-session');

var app = express();

app.use(session({
  secret: process.env.SECRET, 
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 1000,
  }
}));

//CONNECT DATABASE
mongoose
.connect(process.env.DATABASE)
.then(() => console.log("DB connected"))
.catch((err) => console.log(err));

const templatePath = path.join(__dirname, './views');
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", templatePath); 
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

// Route for handling index
app.use("/", indexRouter);

const port = process.env.PORT || 8000;


app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});

module.exports = app;
