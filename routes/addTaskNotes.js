const express=require("express")
const router=express.Router();
const mongoose=require("mongoose")
const User=mongoose.model("User")


require("dotenv").config()

router.post("/addTaskNotes", (req, res) => {
    const { email, taskId, notes } = req.body;
  
    if (!email || !taskId) {
      return res.status(400).json({ message: "Email and taskId are required" });
    }
  
    User.findOneAndUpdate(
      { email: email, "tasks.taskId": taskId },
      { $set: { "tasks.$.notes": notes } },
      { new: true }
    )
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "User or Task not found" });
        }
  
        res.json({ message: "Task notes updated successfully" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
      });
  });
  
  module.exports=router