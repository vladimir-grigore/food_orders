"use strict";

const express = require('express');
const router  = express.Router();

module.exports = () => {
  router.get("/", (req, res) => {
    res.redirect('/');
  });

  router.post("/", (req, res) => {
    res.clearCookie('user_id');
    res.redirect('/');
  });
  return router;
}