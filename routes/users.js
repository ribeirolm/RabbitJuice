"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    res.render("index.ejs");
  })

  router.get("/checkout", (req, res) => {
   res.status(403).send("You need to select juices to purchase before you can checkout!")
  });

  router.post("/checkout", (req, res) => {
    res.redirect("/checkout")
  })

  router.post("/edit", (req, res) => {
// Given I am a customer that has selected juices to order ,
// And I am on the checkout page,
// When I select the "edit order" button,
// Then I should be redirected to the homepage that is populated with my order information
    res.redirect("/")
  })

  router.post("/confirm", (req, res) => {
    res.redirect("/confirmed")
  })

  router.get("/business", (req, res) => {
    res.render("business.ejs")
  })

  router.post("/time-entered", (req, res) => {
//     trigger Twilio to message the customer with the time to pick-up order
// Given I am a business owner and I am on the business page,
// When I enter a number into the "time" field,
// And I select the "send" button,
// Then I should be on the business page
  })

  router.post("/pickup", (req, res) => {
//     remove this order from the business page
// Given I am a business owner and I am on the business page,
// And the customer order has been picked up,
// When I select the "picked up" button beside the order,
// Then the order should disappear from the queue in the business page
  })

  return router;

}