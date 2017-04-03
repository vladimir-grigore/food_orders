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
            .then((rows) => {
              return knex('order_items').select('menu_items.name', 'order_items.quantity')
                    .join('menu_items', 'order_items.menu_item_id', 'menu_items.id')
                    .where('order_items.order_id', orderID)
                    .then((rows) => {
                      twilio_helper.call(req.params.id, rows);
                      res.status(200).end();
                    })
                    .catch((err) => { 
                      return console.error(err);
                    });
            }).then((rows) => {})
            .catch((err) => { 
              return console.error(err);
            });
        }
      });

  })

  router.post("/:id/delete", (req, res) => {
    knex('order_items').del()
      .where('menu_item_id', req.body.menu_item_id)
      .then((results) => {
        res.json(results);
      })
      .catch((err) => { 
        return console.error(err);
      });

  })
  return router;
}
