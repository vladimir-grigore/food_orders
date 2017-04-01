"use strict";

const express = require('express');
const router  = express.Router();
const moment  = require('moment-timezone');

module.exports = (knex) => {

  router.get("/", (req, res) => {
    
    knex
      .select("*")
      .from("menu_items")
      .then((results) => {
        res.json(results);
    });
  });

  router.post("/", (req, res) => {
    // let menu_item = req.body.menu_item; // to be modified 
    let menu_item = "Bufala Mozzerella Salad";

    // Timestamp with time zone
    let date = moment().tz("America/Vancouver").format();

    // Get the uset ID
    let user_id = req.cookies.user_id;
    
    // Temporary
    let payment_option = "in_person";

    // Create a new order
    let orderID;
    // Create entry in orders table
    knex('orders')
      .insert({user_id: user_id, payment_option: payment_option, placed_at: date}, 'id')
      .then((rows) => {
        orderID = rows[0];
        // Create entry in order_items table based on the new order id
        let orderObj = req.body;
        for(let item in orderObj){
          // Get menu item ID based on the title
          // Create entry in the order_items table
          knex('menu_items').select('id').where('name', item).limit(1)
            .then((rows) => {
              return knex('order_items')
                .insert({order_id: orderID, menu_item_id: rows[0].id, price: orderObj[item].price, quantity: orderObj[item].quantity}, 'id');
            }).then((rows) => {
            })
            .catch((err) => { 
              console.error(err); 
            });
          }   
      }).catch((err) => { 
        console.error(err); 
      });
    // // Ajax return    
    // res.json(results);
  });

  return router;
}
