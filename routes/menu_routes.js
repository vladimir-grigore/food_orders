"use strict";

const express = require('express');
const moment  = require('moment-timezone');
const router  = express.Router();

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


    let date = moment().tz("America/Vancouver").format();
    console.log("DATE", date);
    let user_id = req.cookies.user_id;
    console.log("USER ID", user_id);
    let payment_option = "in_person";

    knex('orders')
      .insert({user_id: user_id, payment_option: payment_option, placed_at: date})
      .then((results) => {
        console.log(results);
      })

    // knex
    //   .select("id")
    //   .from("users")
    //   .where('username', reqUsername)
    //   .then((results) => {
    //     // set the cookie for the user
    //     res.cookie('user_id', results[0].id);
    //     res.json(results);
    // });
  });
  return router;
}
