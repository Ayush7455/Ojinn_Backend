const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");

require("dotenv").config();

router.post("/autoschedule", (req, res) => {
  const { email, title, duration, category, dueDate } = req.body;

  if (!email || !title || !duration || !category || !dueDate) {
    return res.status(422).json({ error: "Required fields are missing" });
  }

  User.findOne({ email: email })
    .then((savedUser) => {
      if (!savedUser) {
        return res.status(422).json({ error: "Invalid Credentials" });
      }

      const currentTime = new Date();
      const currentHour = currentTime.getHours();
      const currentMinute = currentTime.getMinutes();

      let startTime;
      if (dueDate === getCurrentDate()) {
        startTime = `${currentHour.toString().padStart(2, "0")}:${currentMinute.toString().padStart(2, "0")}`;
      } else {
        startTime = "00:00";
      }

      const existingTasks = savedUser.tasks;
      let end = calculateEndTime(startTime, duration);

      let overlappingTasks = existingTasks.filter((task) => {
        return task.start <= end && task.end >= startTime && task.dueDate >= dueDate;
      });

      while (overlappingTasks.length > 0) {
        const [hour, minute] = startTime.split(":");
        const currentMinute = parseInt(minute, 10);
        const nextMinute = (currentMinute + 1) % 60;
        const nextHour = nextMinute === 0 ? (parseInt(hour, 10) + 1) % 24 : hour;
        startTime = `${nextHour.toString().padStart(2, "0")}:${nextMinute.toString().padStart(2, "0")}`;
        end = calculateEndTime(startTime, duration);

        overlappingTasks = existingTasks.filter((task) => {
          return task.start <= end && task.end >= startTime && task.dueDate >= dueDate;
        });
      }

      if (end < startTime) {
        return res.status(422).json({ error: "No available slot found for scheduling" });
      }

      const newTask = {
        title,
        start: startTime,
        end,
        dueDate,
        category,
      };

      savedUser.tasks.push(newTask);

      savedUser
        .save()
        .then((user) => {
          res.json({ message: "Task added successfully" });
        })
        .catch((err) => {
          res.json({ error: "Error adding Task" });
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

function calculateEndTime(startTime, duration) {
  const [startHour, startMinute] = startTime.split(':');

  const hour = parseInt(startHour, 10);
  const minute = parseInt(startMinute, 10);

  const durationInMinutes = parseInt(duration, 10);

  const startTimeObj = new Date();
  startTimeObj.setHours(hour);
  startTimeObj.setMinutes(minute);

  const endTimeObj = new Date(startTimeObj.getTime() + durationInMinutes * 60000);

  const endHour = endTimeObj.getHours();
  const endMinute = endTimeObj.getMinutes();

  const formattedEndHour = endHour.toString().padStart(2, '0');
  const formattedEndMinute = endMinute.toString().padStart(2, '0');

  return `${formattedEndHour}:${formattedEndMinute}`;
}

function getCurrentDate() {
  const currentDate = new Date();
  const formattedDate = `${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/$${currentDate.getDate().toString().padStart(2, '0')}/${currentDate.getFullYear()}`;
  return formattedDate;
}

module.exports = router;
