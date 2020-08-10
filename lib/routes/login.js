const express = require("express");
const router = express.Router();
const sessionstorage = require("sessionstorage");

router.get("/", function (req, res) {
  res.render("dashboard/login");
});

router.post("/", function (req, res) {
  const field = req.body.authent;

  sessionstorage.setItem("password", field);

  res.redirect("/dashboard");
});

module.exports = router;
