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
    // TODO create entry in the orders table - get order_id
    // TODO create entry in the menu-items table

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
        console.log("THEN NEW ORDER IS:", orderID);
      }).catch((err) => { 
        console.error(err); 
      });

    // // Create entry in order_items table based on the new order id
    // // will have to create a for loop for every individual menu item in the sbopping cart
    // return knex('order_items').insert({order_id: rows[0], menu_item_id: menuItemID, price: menuItemPrice, quantity: 2})

    // var orderObj = req.body;

    // for(let item in orderObj){
    //   console.log("Title", item);
    //   console.log("quantity", orderObj[item].quantity);
    //   console.log("price", orderObj[item].price);
    // }

    // var menuItemID = '';
    // // Get menu item based on the title
    // var findMenuItemId = knex('menu_items').select('id').where('name',  menu_item).limit(1);
    // findMenuItemId.then((rows) => {
    //   if(rows.length) {
    //     const menuItem = rows[0];
    //     return Promise.resolve(menuItem);
    //   }
    // }).then((menuItem) => {
    //   menuItemID = menuItem.id;
    // }).catch((err) => { throw err; });

        
    // // Ajax return    
    // res.json(results);

  });
  return router;
}
