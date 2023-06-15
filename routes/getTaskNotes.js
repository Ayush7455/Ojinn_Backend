const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");

require("dotenv").config();


router.post("/getTaskNotes", (req, res) => {
    const { email, taskId } = req.body;
  
    User.findOne({ email: email })
      .then((user) => {
        const task = user.tasks.find((task) => task.taskId === taskId);
  
        if (task) {
          res.status(200).send({ notes: task.notes });
        } else {
          res.status(404).send({ message: "Task not found" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ error: "Internal Server Error" });
      });
  });
  
  module.exports = router;
  
module.exports = router;
