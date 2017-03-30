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
        res.json(results);
    });

    // res.redirect("/");
  });

  return router;
}
