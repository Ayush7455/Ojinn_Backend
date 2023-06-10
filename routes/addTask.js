const express=require("express")
const router=express.Router();
const mongoose=require("mongoose")
const User=mongoose.model("User")
const { v4: uuidv4 } = require("uuid");

require("dotenv").config()

router.post("/addTask", (req, res) => {
    const { email, title, start, end, dueDate, category,createdAt} = req.body;

    if (!email || !title || !start || !end || !dueDate || !category || !createdAt) {
        return res.status(200).json({ message: "Required fields are missing" });
    } 
    else {
        User.findOne({ email: email })
            .then((savedUser) => {
                if (!savedUser) {
                    return res.status(200).json({ message: "Invalid Credentials" });
                }
                
            
                const  overlappingTasks = savedUser.tasks.filter((task) => {
                    return (task.start <= end && task.end >= start && task.dueDate >= dueDate&&dueDate>=task.createdAt);
                  });
                  console.log(overlappingTasks.length)
                  console.log(overlappingTasks)
                if (overlappingTasks.length > 0) {
                    return res.status(200).json({ message: "New task overlaps with previously added tasks" });
                }
                const taskId = uuidv4();
                savedUser.tasks.push({ title, start, end, dueDate, category,createdAt,taskId});
                savedUser.save()
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
    }
});




module.exports=router