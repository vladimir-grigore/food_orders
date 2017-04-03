"use strict";

const express = require('express');
const router  = express.Router();
const moment  = require('moment-timezone');

module.exports = (knex) => {

  router.get("/", (req, res) => {

    knex('orders')
      .select('id', 'placed_at').whereNull('completed_at')
      .then((rows) => {
        let orderIDs = [];
        rows.forEach((row) =>{
          orderIDs.push(row.id);
        });
        return knex('order_items')
        .select('order_items.order_id', 'order_items.id', 'menu_items.image_url', 'menu_items.name', 'order_items.quantity')
        .join('menu_items', 'menu_item_id', 'menu_items.id')
        .whereIn('order_items.order_id', orderIDs);
      })
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
        return console.error(err);
      });

  });

  router.get("/time/:id", (req, res) => {
    let orderId = req.params.id;
    knex('orders')
      .select('placed_at').where('id', orderId)
      .then((results) => {
        results[0].placed_at = moment(results[0].placed_at).fromNow();
        res.json(results);
      }).catch((err) => {
        return console.error(err);
      });

  });


  router.post("/estimate/:id", (req, res) => {
    let orderId = req.params.id;
    let time = req.body.time;

    knex('orders')
      .where('id', orderId)
      .update('time_estimate', time)
      .then((results) => {
        res.json(results);
      }).catch((err) => {
        return console.error(err);
      });
  });

  router.post("/complete/:id", (req, res) => {
    let orderId = req.params.id;
    let date = moment().tz("America/Vancouver").format();
    
    knex('orders')
      .where('id', orderId)
      .update('completed_at', date)
      .then((results) => {
        res.json(results);
      }).catch((err) => {
        return console.error(err);
      });
  });

  return router;
}
