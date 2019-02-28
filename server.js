"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

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
app.use("/api/users", usersRoutes(knex));

// Render home page
app.get("/", (req, res) => {
  res.render("index.ejs");
})

// Getting checkout without ordering returns an error message
app.get("/checkout", (req, res) => {
  res.status(403).send("You need to select juices to purchase before you can checkout!")
});

// Selecting checkout button on homepage redirects user to checkout page
app.post("/checkout", (req, res) => {
  res.redirect("/checkout")
})

// Selecting edit order button on the checkout page redirects the user to the homepage with order populated
app.post("/checkout/edit", (req, res) => {
// Given I am a customer that has selected juices to order ,
// And I am on the checkout page,
// When I select the "edit order" button,
// Then I should be redirected to the homepage that is populated with my order information
  res.redirect("/")
})

// Selecting confirm button on the checkout page redirects the user to the confirmed page
app.post("/confirm", (req, res) => {
  res.redirect("/checkout/confirmed")
})

// Getting business page renders business page html
app.get("/business", (req, res) => {
  res.render("business.ejs")
})

// Selecting the "send" button beside the "time" field on the business page should trigger Twilio to send a message to the customer about pickup time
app.post("/time-entered", (req, res) => {
//     trigger Twilio to message the customer with the time to pick-up order
// Given I am a business owner and I am on the business page,
// When I enter a number into the "time" field,
// And I select the "send" button,
// Then I should be on the business page
})

// Selecting the "pickup" button beside the order in the queue on the business page should make the order in the queue disappear
app.post("/pickup", (req, res) => {
//     remove this order from the business page
// Given I am a business owner and I am on the business page,
// And the customer order has been picked up,
// When I select the "picked up" button beside the order,
// Then the order should disappear from the queue in the business page
})


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
