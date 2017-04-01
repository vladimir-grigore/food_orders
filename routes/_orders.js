"use strict";

const express = require('express');
const router  = express.Router();
const twilio_helper = require('./twilio_helper');

module.exports = (knex) => {

  router.get("/", (req, res) => {

    knex
      .select("*")
      .from("orders")
      .then((results) => {
        res.json(results);
    });
  });


///// BEGIN RANDOM JEREMY-NOTES

// function itemURL(){
//   knex.select('quantity').from('order_items')
//   .where
// }
// app.post('/orders', (req, res) =>{
//   // 1) get the list of menu_item IDs, and quantities (should be in req.body or something?)
//   call();
//   res.end();
// });

// app.


// make_promise()
// .then((results) => {
//   return make_another_promise();
// })
// .then((foo) => {
//   console.log(foo);
// })

///// END RANDOM JEREMY-NOTES


  router.post("/", (req, res) => {
    console.log("posted to orders.  body:", req.body);

    // TODO: get our (menu_item_id, quantity) pairs out of the req
    // TODO: try to create a new order in the DB
    //    2a) create the order, "returning" order_id
    //    2b) create the order_items
    //    2c) remember to return the order_id
    // TODO: get the whole order from the DB.  order_id, list of menu items, name for each menu item, the whole shebang
    // TODO: pass all that shit to twilio_helper.call()
    // TODO: if nothing crashed, res.send();
    // TODO: if any of it did crash, res.status(500).send();

    knex('order_items')
    .join('menu_items', 'menu_item_id', 'menu_items.id')
    .select('order_items.quantity', 'menu_items.name')
    .where('order_items.order_id', '2')
    // .then((rows) => {
    //     console.log('This is the rows', rows);
    //     res.status(200).end();
    // })
    // .catch((error) => {
    //   console.log("Error", error)
    // })
    // .select('order.id', 'menu.name', 'order_items.quantity')
    // .from('orders')
    // .join('order_items', 'order_items.order_id', 'orders.id')
    // .join('menu_items', 'order_items.menu_item_id', 'menu_items.id')
    // .where({ 'order.id': 1})  // hackily chosen to be the order-id in the seed
    //88888**************

    .then((rows) => {
      // turn rows into a suitable order_items
      twilio_helper.call(2, rows);
      res.status(200).end();
    })
    .catch((error) => {
      console.log("everything is tears and regret", error);
      res.status(500).end();
    })
  });
  // });

  //*******

  router.get("/:id", (req, res) => {
    // TODO get all menu_items based on order ID
  });

  router.post("/:id", (req, res) => {
    // TODO admin now has option to add time estimate
    // redirect to /admin
  });

  return router;
}
