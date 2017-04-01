"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
  router.get("/:id", (req, res) => {
    console.log("YOU HAVE REACHED /checkout/:id");
  });

  // router.post("/", (req, res) => {
  //   });
  return router;
}
