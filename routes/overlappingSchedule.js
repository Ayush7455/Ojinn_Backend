const express=require("express")
const router=express.Router();
const mongoose=require("mongoose")
const User=mongoose.model("User")
const { v4: uuidv4 } = require("uuid");
require("dotenv").config()


router.post("/overlappingSchedule", (req, res) => {
    const { email, title,start,end,scheduledStart,category,dueDate,createdAt } = req.body;
    const taskId = uuidv4();
    if (!email || !title || !start||!end||!scheduledStart||!category||!dueDate ||!createdAt) {
        return res.status(422).json({ error: "Required fields are missing" });
    } 
    else {
            User.findOne({ email: email })
                .then((savedUser) => {
                    if (!savedUser) {
                        return res.status(200).json({ message: "Invalid Credentials" });
                    }
                    const duration=calculateDuration(start,end)
                    const endTime = calculateEndTime(scheduledStart, duration);
                    // const overlappingTasks = savedUser.tasks.filter((task) => {
                    //     return (task.start < end && task.end > start);
                    // });
    
                    // if (overlappingTasks.length > 0) {
                    //     return res.status(422).json({ error: "New task overlaps with previously added tasks" });
                    // }
                    if(endTime<scheduledStart){
                        return res.status(200).json({message:"Schedule extending to other date"})
                    }
                    savedUser.tasks.push({ title, start:scheduledStart, end:endTime, dueDate, category,createdAt,taskId});
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
      
      function calculateDuration(start, end) {
        const startTime = new Date(`2000-01-01T${start}:00`);
        const endTime = new Date(`2000-01-01T${end}:00`);
    
        const differenceMs = endTime - startTime;
        const durationMinutes = Math.round(differenceMs / 60000);
      
        return durationMinutes;
      }
      

module.exports=router