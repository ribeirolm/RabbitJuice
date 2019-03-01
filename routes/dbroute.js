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
      .select('orders.id as orderNum', 'orders.name as customerName','orders.phone_number as phoneNum', 'orders_lines.id as orderLineNum', 'preset_drinks.img as drinkImg', 'preset_drinks.name as presetDrinkName','orders.estimated_time as estimatedTime',
      knex.raw('ARRAY_AGG(ingredients.name) as ingredientName'))
      .from("orders_lines")
      .join("orders","orders_lines.order_id","orders.id")
      .join("preset_drinks", 'preset_drinks.id','orders_lines.preset_drink_id')
      .join('preset_ingredients', 'preset_ingredients.preset_drink_id', 'preset_drinks.id')
      .join("ingredients",'ingredients.id','preset_ingredients.ingredient_id')
      .groupBy('orderNum', 'customerName','phoneNum', 'orderLineNum', 'drinkImg','presetDrinkName' ,'estimatedTime')
      .where({'orders.id': 2})
      .whereNotNull('orders_lines.preset_drink_id')
   
    const customizedResults = await knex
      .select('orders.id as orderNum', 'orders_lines.id as orderLineNum','orders.name as customerName','orders.phone_number as phoneNum','orders.estimated_time as estimatedTime',
      knex.raw('ARRAY_AGG(ingredients.name) as igredientName'))
      .from("orders_lines")
      .join("orders","orders_lines.order_id","orders.id")
      .join("customized_drinks_ingredients", 'customized_drinks_ingredients.customized_drink_id','orders_lines.order_id')
      .join("ingredients",'ingredients.id','customized_drinks_ingredients.ingredient_id')
      .groupBy('orderNum', 'orderLineNum','customerName','phoneNum', 'estimatedTime')
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
      .select('orders.id as orderNum', 'orders_lines.id as orderLineNum','orders.name as customerName','orders.phone_number as phoneNum', 'preset_drinks.img as drinkImg', 'preset_drinks.name as presetDrinkName','orders.estimated_time as estimatedTime',
      knex.raw('ARRAY_AGG(ingredients.name) as ingredientName'))
      .from("orders_lines")
      .join("orders","orders_lines.order_id","orders.id")
      .join("preset_drinks", 'preset_drinks.id','orders_lines.preset_drink_id')
      .join('preset_ingredients', 'preset_ingredients.preset_drink_id', 'preset_drinks.id')
      .join("ingredients",'ingredients.id','preset_ingredients.ingredient_id')
      .groupBy('orderNum', 'orderLineNum','customerName','phoneNum', 'drinkImg','presetDrinkName','estimatedTime')
      .where({'orders.status': 'outstanding'})
      .whereNotNull('orders_lines.preset_drink_id')
   
    const customizedResults = await knex
      .select('orders.id as orderNum', 'orders_lines.id as orderLineNum','orders.name as customerName','orders.phone_number as phoneNum','orders.estimated_time as estimatedTime',
      knex.raw('ARRAY_AGG(ingredients.name) as ingredientName'))
      .from("orders_lines")
      .join("orders","orders_lines.order_id","orders.id")
      .join("customized_drinks_ingredients", 'customized_drinks_ingredients.customized_drink_id','orders_lines.order_id')
      .join("ingredients",'ingredients.id','customized_drinks_ingredients.ingredient_id')
      .groupBy('orderNum', 'orderLineNum','customerName','phoneNum', 'estimatedTime')
      .where({'orders.status': 'outstanding'})
      .whereNull('orders_lines.preset_drink_id')
      
      // .where({'orders.id': 3})
      // .whereNull('orders_lines.preset_drink_id')

      // array1.concat(catarr)
        res.json(presetResults.concat(customizedResults))
      // res.json(customizedResults)
  })

  router.post("/", (req, res) => {
    knex.insert({
      name: "name", 
      phone_number: "phoneNum", 
      status: 'outstanding'
    }).into("orders")
    .then(function (results) {
        return knex.insert({'preset_drink_id': 1}).into("orders_lines")
    })
  })

  router.post("/checkout", (req, res) => {

    

    knex.insert({
      customized_drink_id: 3,
      ingredient_id: 1,
  
    })

  }

// addDateTime(dateArray) {

//     console.log(dateArray);

//     async function insert(dateArray) {
//         try{
//             for (let i = 0; i < dateArray.length; i++) {
//                 let tempDateTime = new Date(dateArray[i].dateTime)

//                 await this.knex(dateTimes).insert({
//                     date: tempDateTime.toDateString(),
//                     start_time: tempDateTime.toTimeString().replace("GMT+0800", ""),
//                     iso_string: tempDateTime.toISOString(),
//                     event_id: dateArray[i].event_id
//                 }).returning("event_id");
//             }
//         } catch (err) {
//             console.log(err);
//         }
//     }

//     insert(dateArray);
// }


  })

  router.post("/business", (req, res) => {
  
    

  })

  return router;

}