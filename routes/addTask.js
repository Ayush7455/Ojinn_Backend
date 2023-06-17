const express=require("express")
const router=express.Router();
const mongoose=require("mongoose")
const User=mongoose.model("User")
const { v4: uuidv4 } = require("uuid");
const moment=require("moment")

require("dotenv").config()

router.post("/addTask", (req, res) => {
    const { email, title, start, end, dueDate, category,createdAt,color} = req.body;
    const today = moment(new Date()).format('MM/DD/YYYY')

    if (!email || !title || !start || !end || !dueDate || !category || !createdAt||!color) {
        return res.status(200).json({ message: "Required fields are missing" });
    } 
    else {
        User.findOne({ email: email })
            .then((savedUser) => {
                if (!savedUser) {
                    return res.status(200).json({ message: "Invalid Credentials" });
                }
                
            
                const  overlappingTasks = savedUser.tasks.filter((task) => {
                    return (task.start <= end && task.end >= start && (((task.createdAt>createdAt&&task.dueDate>dueDate&&dueDate>=task.createdAt)||(task.createdAt>createdAt&&task.dueDate<dueDate&&dueDate>=task.createdAt)||(task.createdAt>createdAt&&task.dueDate==dueDate&&dueDate>=task.createdAt))||((task.createdAt<createdAt&&task.dueDate>dueDate&&task.dueDate>=createdAt)||(task.createdAt<createdAt&&task.dueDate<dueDate&&task.dueDate>=createdAt)||(task.createdAt<createdAt&&task.dueDate==dueDate&&task.dueDate>=createdAt))||((task.createdAt==createdAt&&task.dueDate>dueDate)||(task.createdAt==createdAt&&task.dueDate<dueDate)||(task.createdAt==createdAt&&task.dueDate==dueDate))));
                  });
                  console.log(overlappingTasks.length)
                  console.log(overlappingTasks)
                if (overlappingTasks.length > 0) {
                    return res.status(200).json({ message: "New task overlaps with previously added tasks" });
                }
                const taskId = uuidv4();
                savedUser.tasks.push({ title, start, end, dueDate, category,createdAt,taskId,color,description:"",notes:"",taskCreationTime:new Date()});
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