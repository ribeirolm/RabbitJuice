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

// const businessFunction= require("./public/scripts/business-page");

// console.log(userRoute)

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
  res.render("index.ejs");
})

// Getting checkout without ordering returns an error message
app.get("/checkout", (req, res) => {
    res.render("checkout.ejs");
});

app.get("/confirm", (req, res) => {
  res.render("confirm.ejs");
})

// Selecting next button on homepage redirects user to checkout page
app.post("/next", (req, res) => {
  res.redirect("/checkout");
})

// Selecting confirm button on the checkout page redirects the user to the homepage with a confirmed pop-up
app.post("/checkout/confirm", async (req, res) => {
  
  console.log(`name: ${req.body.name}, phone_number: ${req.body.phone_number}, preset: ${req.body.preset_selected}, ingredient: ${req.body.ingredient_selected}` )

  let name = req.body.name;
  let phoneNumber = parseInt(req.body.phone_number)
  let presetDrinks = req.body.preset_selected;
  let ingredients = req.body.ingredient_selected;

  //inserting order information to the database
  await knex.insert({
   name: name,
   phone_number: phoneNumber,
   status: "outstanding"
  }).into("orders")
  //   .then(function(results){

  //   for (drink in drinks){

  //     if (drinks[drink] = 8) {
  //       knex.insert({
  //         preset_drink_id: null
  //       }).into('orders_lines').then(function(results){
  //         for (ingredient in ingredients){
  //           knex.insert({
  //             ingredient_id: ingredient
  //           }).into('customized_drink_id')
  //         }
  //       })
  //     } else {
  //       knex.insert({
  //         preset_drink_id: drinks[drink]
  //       }).into(orders_lines)
  //     }
  //   }
  // })


  client.messages
  .create({
    body: 'A new order has been placed! See </business> for details',
    from: phoneNumber,
    to: process.env.MY_PHONE_NUMBER,
  })
  .then(message => console.log(message.sid));
  res.redirect("/confirm")
})

// Getting business page renders business page html with only outstanding orders being displayed
app.get("/business", (req, res) => {
  res.render("business.ejs")
})

// Selecting the "send" button beside the "time" field on the business page should trigger Twilio to send a message to the customer about pickup time
app.post("/business/time-entered", async (req, res) => {

  await knex.update({
    status: "picked up"
  }).where({
    id: 2
  }).into('orders')



  let minutes = req.body.minutes;
  client.messages
    .create({
       body: 'Your order has been processed and will be ready in ' + minutes + ' minutes. See you soon :)',
       from: '+16477244390',
       //We would ideally identify the "to" as req.body.phoneNumber to send the message to the customer who ordered the drink
       //However, because of twilio free trial limitations, we needed to hardcode the number as a verified caller ID within our twilio account
       to: process.env.CUSTOMER_NUMBER,
     })
    .then(message => console.log(message.sid));
    res.redirect("/business")
})

// app.post("/business/status", (req, res) => {
//   res.redirect("/business")
// })

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
