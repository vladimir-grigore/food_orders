"use strict";

const express = require('express');
const router  = express.Router();
const moment  = require('moment-timezone');

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("id", "name", "image_url", "price", "description")
      .from("menu_items")
      .then((results) => {
        res.json(results);
    });
  });

  router.post("/", (req, res) => {
    // Timestamp with time zone
    let date = moment().tz("America/Vancouver").format();

    // Get the uset ID
    let user_id = req.cookies.user_id;
    
    // Create a new order
    let orderID;
    // Create entry in orders table
    knex('orders')
      .insert({user_id: user_id, payment_option: payment_option, placed_at: date}, 'id')
      .asCallback((err, rows) => {
        if (err) {
          return console.error(err);
        }
        orderID = rows[0]; 
        // For each order item entry create a row in the order_items table
        let orderObj = req.body;  
        for(let item in orderObj){
          knex('order_items')
            .insert({order_id: orderID, menu_item_id: orderObj[item].id, price: orderObj[item].price, quantity: orderObj[item].quantity}, 'id')
            .then((rows) => {})
            .catch((err) => { 
              return console.error(err);
            });
        }
        res.json(orderID);
      });

  });

  return router;
}
