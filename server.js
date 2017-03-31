"use strict";

require('dotenv').config();


const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const cookieParser= require("cookie-parser");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');
const moment      = require('moment-timezone');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users"); // to be deleted
const loginRoutes = require("./routes/_login");
const logoutRoutes= require("./routes/_logout");
const menuRoutes  = require("./routes/_menu");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

//Cookie parser
app.use(cookieParser());

//Load files from public
app.use(express.static("public"));


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex)); // to be deleted
app.use("/api/login", loginRoutes(knex));
app.use("/api/logout", logoutRoutes());
app.use("/api/menu", menuRoutes(knex));

// temporary - will be use the index page for this
app.get('/menu', (req, res) => {
  res.render("menu");
});

// Login page
app.get('/login', (req, res) => {
  res.render("login");
});

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
