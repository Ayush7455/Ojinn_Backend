const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

router.post("/autoschedule", (req, res) => {
  const { email, title, startSchedule,endSchedule, category, dueDate,createdAt ,color} = req.body;

  if (!email || !title || !startSchedule ||!endSchedule|| !category || !dueDate||!createdAt||!color) {
    return res.status(422).json({ error: "Required fields are missing" });
  }
  const taskId = uuidv4();
  User.findOne({ email: email })
    .then((savedUser) => {
      if (!savedUser) {
        return res.status(422).json({ error: "Invalid Credentials" });
      }

      const currentTime = new Date();
      const currentHour = currentTime.getHours();
      const currentMinute = currentTime.getMinutes();
      const duration=calculateDuration(startSchedule,endSchedule)

      let startTime= "13:32";
      // if (createdAt === getCurrentDate()) {
      //   startTime = `${currentHour.toString().padStart(2, "0")}:${currentMinute.toString().padStart(2, "0")}`;
      // } else {
      //   startTime = "00:00";
      // }

      const existingTasks = savedUser.tasks;
      let end = calculateEndTime(startTime, duration);

      let overlappingTasks = existingTasks.filter((task) => {
        return (task.start <= end && task.end >= startTime && (((task.createdAt>createdAt&&task.dueDate>dueDate&&dueDate>=task.createdAt)||(task.createdAt>createdAt&&task.dueDate<dueDate&&dueDate>=task.createdAt)||(task.createdAt>createdAt&&task.dueDate==dueDate&&dueDate>=task.createdAt))||((task.createdAt<createdAt&&task.dueDate>dueDate&&task.dueDate>=createdAt)||(task.createdAt<createdAt&&task.dueDate<dueDate&&task.dueDate>=createdAt)||(task.createdAt<createdAt&&task.dueDate==dueDate&&task.dueDate>=createdAt))||((task.createdAt==createdAt&&task.dueDate>dueDate)||(task.createdAt==createdAt&&task.dueDate<dueDate)||(task.createdAt==createdAt&&task.dueDate==dueDate))));
      });

      while (overlappingTasks.length > 0) {
        const [hour, minute] = startTime.split(":");
        const currentHour = parseInt(hour, 10);
        const currentMinute = parseInt(minute, 10);
        let nextHour = currentHour;
        let nextMinute = (currentMinute + 1) % 60;
        if (nextMinute === 0) {
          nextHour = (currentHour + 1) % 24;
        }
        startTime = `${nextHour.toString().padStart(2, "0")}:${nextMinute.toString().padStart(2, "0")}`;
        end = calculateEndTime(startTime, duration);

        overlappingTasks = existingTasks.filter((task) => {
          return (task.start <= end && task.end >= startTime && (((task.createdAt>createdAt&&task.dueDate>dueDate&&dueDate>=task.createdAt)||(task.createdAt>createdAt&&task.dueDate<dueDate&&dueDate>=task.createdAt)||(task.createdAt>createdAt&&task.dueDate==dueDate&&dueDate>=task.createdAt))||((task.createdAt<createdAt&&task.dueDate>dueDate&&task.dueDate>=createdAt)||(task.createdAt<createdAt&&task.dueDate<dueDate&&task.dueDate>=createdAt)||(task.createdAt<createdAt&&task.dueDate==dueDate&&task.dueDate>=createdAt))||((task.createdAt==createdAt&&task.dueDate>dueDate)||(task.createdAt==createdAt&&task.dueDate<dueDate)||(task.createdAt==createdAt&&task.dueDate==dueDate))));
        });
      }

      if (end < startTime) {
        return res.status(200).json({ message: "No available slot found for scheduling" });
      }

      const newTask = {
        title,
        start: startTime,
        end,
        dueDate,
        category,
        createdAt,
        taskId,
        color,
        description:"",
        notes:""
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
  const formattedDate = `${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getDate().toString().padStart(2, '0')}/${currentDate.getFullYear()}`;
  return formattedDate;
}
function calculateDuration(start, end) {
  const startTime = new Date(`2000-01-01T${start}:00`);
  const endTime = new Date(`2000-01-01T${end}:00`);

  const differenceMs = endTime - startTime;
  const durationMinutes = Math.round(differenceMs / 60000);

  return durationMinutes;
}
module.exports = router;
