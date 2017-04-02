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
          console.log("TIME", moment(row.placed_at).fromNow())
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
        console.log(err)
      });

  });

  router.get("/:id", (req, res) => {
    let orderId = req.params.id;
    knex('orders')
      .select('placed_at').where('id', orderId)
      .then((results) => {
        results[0].placed_at = moment(results[0].placed_at).fromNow();
        console.log("REZZZZ", results);
        res.json(results);
      }).catch((err) => {
        console.log(err)
      });

  });

  router.post("/", (req, res) => {
   // TODO get order id
   // redirect to /orders/:id
  });

  router.post("/:id", (req, res) => {
   // TODO admin now has option to add time estimate
   // redirect to /admin
  });

  return router;
}
