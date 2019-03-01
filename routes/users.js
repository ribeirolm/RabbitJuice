"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  // retrieve all preset drink information for display on the homepage
  router.get("/preset", (req, res) => {
      knex
      .select('*')
      .from("preset_drinks")
      .then((results) => {
      res.json(results);
    });  
  })

  // retreive all ingredient information for display on the homepage
  router.get("/ingredients", (req, res) => {
    knex
    .select('*')
    .from("ingredients")
    .then((results) => {
    res.json(results);
  });  
})

  //retrieve all ingredients for "make your own" drink for display on the checkout page
  router.get("/checkout", (req, res) => {
    knex
      .select()
      .from("ingredients")
      .then((results) => {
        res.json(results);
      });
  })

  //retrieve orders with no finished time for display on the order queue in the business page
  //need to join with users table to pull the users name and phone number to display within the order
  router.get("/business", (req, res) => {
    knex
      .select("*")
      .from("orders")
      .where("status", "outstanding")
      .then((results) => {
        res.json(results);
      });
  })


  return router;

}