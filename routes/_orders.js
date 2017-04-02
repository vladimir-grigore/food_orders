"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {

    knex('orders')
      .select('id').whereNull('time_estimate')
      .then((rows) => {
        let orderIDs = [];
        rows.forEach((row) =>{
          orderIDs.push(row.id);
        });
        return knex('order_items')
        .select('order_items.order_id', 'menu_items.image_url', 'menu_items.name', 'order_items.quantity')
        .join('menu_items', 'menu_item_id', 'menu_items.id')
        .whereIn('order_items.order_id', orderIDs);
      })
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
        console.log(err)
      });

    
    // knex
    //   .select("*")
    //   .from("orders")
    //   .then((results) => {
    //     res.json(results);
    // });
  });

  router.post("/", (req, res) => {
    // TODO get order id
    // redirect to /orders/:id
  });

  router.get("/:id", (req, res) => {
    // TODO get all menu_items based on order ID
  });

  router.post("/:id", (req, res) => {
    // TODO admin now has option to add time estimate
    // redirect to /admin
  });

  return router;
}
