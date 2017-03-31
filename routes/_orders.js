"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    
    knex
      .select("*")
      .from("orders")
      .then((results) => {
        res.json(results);
    });
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
