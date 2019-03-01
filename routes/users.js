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
  router.get("/checkout", async (req, res) => {
    
    const presetResults = await knex
      .select('orders.id as orderid', 'orders.name as customername','orders.phone_number', 'orders_lines.id', 'preset_drinks.img as drinkimg', 'preset_drinks.name as presetname',
      knex.raw('ARRAY_AGG(ingredients.name) as iname'))
      .from("orders_lines")
      .join("orders","orders_lines.order_id","orders.id")
      .join("preset_drinks", 'preset_drinks.id','orders_lines.preset_drink_id')
      .join('preset_ingredients', 'preset_ingredients.preset_drink_id', 'preset_drinks.id')
      .join("ingredients",'ingredients.id','preset_ingredients.ingredient_id')
      .groupBy('orderid', 'orders_lines.id','customername','orders.phone_number', 'drinkimg','presetname')
      .where({'orders.id': 2})
      .whereNotNull('orders_lines.preset_drink_id')
   
    const customizedResults = await knex
      .select('orders.id as orderid', 'orders_lines.id','orders.name as customername','orders.phone_number',
      knex.raw('ARRAY_AGG(ingredients.name) as iname'))
      .from("orders_lines")
      .join("orders","orders_lines.order_id","orders.id")
      .join("customized_drinks_ingredients", 'customized_drinks_ingredients.customized_drink_id','orders_lines.order_id')
      .join("ingredients",'ingredients.id','customized_drinks_ingredients.ingredient_id')
      .groupBy('orderid', 'orders_lines.id','orders,name as customername','orders.phone_number')
      .where({'orders.id': 2})
      .whereNull('orders_lines.preset_drink_id')
      
      // .where({'orders.id': 3})
      // .whereNull('orders_lines.preset_drink_id')

      // array1.concat(catarr)
      res.json(presetResults.concat(customizedResults))
      // res.json(customizedResults)
  })




  //retrieve orders with no finished time for display on the order queue in the business page
  //need to join with users table to pull the users name and phone number to display within the order
  
  router.get("/business", async (req, res) => {
    
    const presetResults = await knex
      .select('orders.id as orderid', 'orders_lines.id','orders.name as customername','orders.phone_number', 'preset_drinks.img as drinkimg', 'preset_drinks.name as presetname',
      knex.raw('ARRAY_AGG(ingredients.name) as iname'))
      .from("orders_lines")
      .join("orders","orders_lines.order_id","orders.id")
      .join("preset_drinks", 'preset_drinks.id','orders_lines.preset_drink_id')
      .join('preset_ingredients', 'preset_ingredients.preset_drink_id', 'preset_drinks.id')
      .join("ingredients",'ingredients.id','preset_ingredients.ingredient_id')
      .groupBy('orderid', 'orders_lines.id','customername','orders.phone_number', 'drinkimg','presetname')
      .where({'orders.status': 'outstanding'})
      .whereNotNull('orders_lines.preset_drink_id')
   
    const customizedResults = await knex
      .select('orders.id as orderid', 'orders_lines.id','orders.name as customername','orders.phone_number',
      knex.raw('ARRAY_AGG(ingredients.name) as iname'))
      .from("orders_lines")
      .join("orders","orders_lines.order_id","orders.id")
      .join("customized_drinks_ingredients", 'customized_drinks_ingredients.customized_drink_id','orders_lines.order_id')
      .join("ingredients",'ingredients.id','customized_drinks_ingredients.ingredient_id')
      .groupBy('orderid', 'orders_lines.id','customername','orders.phone_number')
      .where({'orders.status': 'outstanding'})
      .whereNull('orders_lines.preset_drink_id')
      
      // .where({'orders.id': 3})
      // .whereNull('orders_lines.preset_drink_id')

      // array1.concat(catarr)
        res.json(presetResults.concat(customizedResults))
      // res.json(customizedResults)
  })


  return router;

}