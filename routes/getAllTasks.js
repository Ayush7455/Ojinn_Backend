const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");

require("dotenv").config();


router.post("/getAllTasks", (req, res) => {
  const { email} = req.body;


  User.findOne({ email: email })
    .then((user) => {
      res.status(200).send(user.tasks);
    })
    .catch((err) => {
      console.log(err);
      res.status(422).send(err.message);
    });
});

module.exports = router;
