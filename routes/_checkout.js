"use strict";

const express = require('express');
const router  = express.Router();
const moment  = require('moment-timezone');
const twilio_helper = require('./twilio_helper');

module.exports = (knex) => {

  router.get("/:id", (req, res) => {
    knex('order_items')
    .select('order_items.quantity', 'order_items.price', 'order_items.menu_item_id', 'menu_items.name', 'menu_items.image_url')
    .join('menu_items', 'menu_item_id', 'menu_items.id')
    .where('order_items.order_id', req.params.id)
      .then((results) => {
        res.json(results);
    }).catch((error) => {
      res.status(500).end();
    })
  });

  router.post("/:id", (req, res) => {
    // Timestamp with time zone
    let date = moment().tz("America/Vancouver").format();
    let payment = req.body.payemnt_option;
    let orderObj = req.body.items;
    let orderID = req.params.id;

    knex('orders')
      .where('id', orderID)
      .update({payment_option: payment, placed_at: date})
      .asCallback((err, rows) => {
        if (err) {
          return console.error(err);
        }
        for(let item of orderObj){
          knex('order_items')
            .update({"price": item.price, quantity: item.quantity})
            .where({"order_id": orderID, "menu_item_id": item.menu_item_id})
            .then((rows) => {})
            .catch((err) => { 
              return console.error(err);
            });
        }
        // res.json(orderID);
      });

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


/*
    .then((rows) => {
      // turn rows into a suitable order_items
      twilio_helper.call(req.params.id, rows);
      res.status(200).end();
    })
    .catch((error) => {
      console.log("everything is tears and regret", error);
      res.status(500).end();
    })
  });

*/
  })
  return router;
}
