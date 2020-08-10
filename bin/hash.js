const bcrypt = require("bcrypt");

const Password = require("../lib/models/passwordSchema");

const saltRounds = 10;

bcrypt.genSalt(10, function (err, salt) {
  bcrypt.hash(process.env.LOG_PASS, saltRounds, function (err, hash) {
    const password = new Password({
      password: hash,
    });
    password.save(function (err) {
      if (err) {
        console.log(err);
      }
    });
    if (err) {
      console.log(err);
    }
  });
});

module.exports = bcrypt;
