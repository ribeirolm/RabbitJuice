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

// Render the confirmation page when order has been placed
app.get("/confirm", (req, res) => {
  res.render("confirm.ejs");
})

// Selecting confirm button on the checkout page redirects the user to the homepage with a confirmed pop-up
app.post("/checkout/confirm", (req, res) => {

  console.log(`name: ${req.body.name}, phone_number: ${req.body.phone_number}, preset: ${req.body.preset_selected}, customize: ${req.body.ingredients_selected}`)
  let name = req.body.name;
  let phoneNumber = req.body.phone_number

  //inserting order information to the database
  knex.insert({
   name: name,
   phone_number: phoneNumber,
   status: "outstanding"
  }).into("orders")
    .then(function(results){
      //preste drinks
      if (req.body.preset_selected) {
        let preset_orders = JSON.parse(req.body.preset_selected)
        for (let preset in preset_orders) {
          console.log("drink id", preset)
          console.log("qty", preset_orders[preset])

          for (let i = 1 ; i <= preset_orders[preset]; i++ ) {

            knex.insert({
              preset_drink_id: preset,
              order_id: knex.select('id').from('orders').where({phone_number: phoneNumber})
            }).into("orders_lines").then()
            console.log('inserted', preset)
          }
        }
      }
    })
    //customized drinks
    .then(function(results){
      if (req.body.ingredients_selected) {
        let ingredients = JSON.parse(req.body.ingredients_selected)

        knex.insert({
          preset_drink_id: null,
          order_id: knex.select('id').distinct().from('orders').where({phone_number: phoneNumber})
        }).into('orders_lines')
        .then(function (results){

          let queryCustomized = function(ingredient){
            knex.insert({
              customized_drink_id: knex('orders_lines').distinct('orders_lines.id').join('orders','orders_lines.order_id', 'orders.id').where({'orders.phone_number': phoneNumber, 'orders_lines.preset_drink_id':null}),
              ingredient_id: ingredient
            }).into('customized_drinks_ingredients').then()

          }

          for (let ingredient in ingredients) {
            console.log("ingredient id", ingredient)
            console.log("ingredient", ingredients[ingredient])

            queryCustomized(ingredient)

          }
        })
      }
    })



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
app.post("/business/time", (req, res) => {
  let orderId = req.body.orderId;
  let minutes = req.body.minutes;

   knex.update({
    estimated: minutes
  }).where({
    id: orderId
  }).into('orders').then()

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

// Selecting the "Pick up" button on the business page should update the order in the database to change the status from outstanding to picked up
app.post("/business/status", (req, res) => {
  let orderId = req.body.orderId;

   knex.update({
    status: "picked up"
  }).where({
    id: orderId
  }).into('orders').then()

  res.redirect("/business")
});


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
