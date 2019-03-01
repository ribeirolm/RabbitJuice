"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const cookieParser= require("cookie-parser");
// const cookies     = require("js-cookie")
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Needed for twilio connection
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

// Seperated Routes for each Resource
const usersRoutes = require("./routes/dbroute");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.use(cookieParser('The dog barks loudly when no one is listening'));
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
app.use("/api", usersRoutes(knex));

// Render home page
app.get("/", (req, res) => {

  //Need to start a session to track the customer's order
  res.render("index.ejs");
})

// Getting checkout without ordering returns an error message
app.get("/checkout", (req, res) => {
    res.render("checkout.ejs");
});

// Selecting next button on homepage redirects user to checkout page
app.post("/next", (req, res) => {
  //We need to pass the session information to the checkout page
  res.redirect("/checkout");
})

// Selecting edit order button on the checkout page redirects the user to the homepage with order populated
app.post("/checkout/edit", (req, res) => {
  // Given I am a customer that has selected juices to order ,
  // And I am on the checkout page,
  // When I select the "add more"/"edit" button,
  // Then I should be redirected to the homepage that is populated with my order information
  // Need to pass the session information to the homepage so the homepage indicates what has been selected
  res.redirect("/")
})

// Selecting confirm button on the checkout page redirects the user to the homepage with a confirmed pop-up
app.post("/checkout/confirm", (req, res) => {
  client.messages
  .create({
    body: 'A new order has been placed! See <link> for details',
    from: '+16477244390',
    to: process.env.MY_PHONE_NUMBER,
  })
  .then(message => console.log(message.sid));
  res.redirect("/")
})

// Getting business page renders business page html
app.get("/business", (req, res) => {
  res.render("business.ejs")
})

// Selecting the "send" button beside the "time" field on the business page should trigger Twilio to send a message to the customer about pickup time
app.post("/time-entered", (req, res) => {
  client.messages
    .create({
       body: 'Your order has been processed and will be ready in' +  + 'minutes',
       from: '+16477244390',
       to: process.env.MY_PHONE_NUMBER,
       // we need to alter the "to" so it retrieves the phone number of the customer who ordered the drink
     })
    .then(message => console.log(message.sid));
    res.redirect("/business")
})

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
