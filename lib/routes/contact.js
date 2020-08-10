const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.get("/", function (req, res) {
  res.render("contact/contactPage");
});

router.post("/sendMail", function (req, res) {
  const from = process.env.FROM_MAIL;
  const fromPass = process.env.MAIL_PASS;
  const to = process.env.TO_MAIL;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: from,
      pass: fromPass,
    },
  });

  const mailOptions = {
    from: from, // sender address
    to: to, // list of receivers
    subject: "Received message from personal blog.", // Subject line
    html: req.body.email + "<br>" + req.body.subject + "<br>" + req.body.text,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
      res.render("contact/messageSent", { message: "Unable to send message" });
    } else {
      res.render("contact/messageSent", {
        message: "Thank you. Message Sent!",
      });
    }
  });
});

module.exports = router;
