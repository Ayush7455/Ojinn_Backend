const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");

require("dotenv").config();


router.post("/getTasks", (req, res) => {
  const { email, selectedDate } = req.body;


  User.findOne({ email: email })
    .then((user) => {
      const tasks = user.tasks.filter((task) => {
        return (task.dueDate>=selectedDate);
      });
      res.status(200).send(tasks);
    })
    .catch((err) => {
      console.log(err);
      res.status(422).send(err.message);
    });
});

module.exports = router;
