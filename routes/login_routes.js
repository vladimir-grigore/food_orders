"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  router.get("/", (req, res) => {
    res.render("login");
  });

  router.post("/", (req, res) => {
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
