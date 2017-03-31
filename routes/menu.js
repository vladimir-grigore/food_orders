"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  router.get("/", (req, res) => {
    // TODO load all menu items
  });

  router.post("/", (req, res) => {
    // TODO create entry in the orders table - get order_id
    // TODO create entry in the menu-items table

    let reqUsername = req.body.username;

    knex
      .select("id")
      .from("users")
      .where('username', reqUsername)
      .then((results) => {
        // set the cookie for the user
        res.cookie('user_id', results[0].id);
        res.json(results);
    });
  });
  return router;
}
