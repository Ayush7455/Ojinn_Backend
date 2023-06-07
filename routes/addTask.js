const express=require("express")
const router=express.Router();
const mongoose=require("mongoose")
const User=mongoose.model("User")

require("dotenv").config()

router.post("/addTask", (req, res) => {
    const { email, title, start, end, dueDate, category} = req.body;

    if (!email || !title || !start || !end || !dueDate || !category) {
        return res.status(422).json({ error: "Required fields are missing" });
    } else {
        User.findOne({ email: email })
            .then((savedUser) => {
                if (!savedUser) {
                    return res.status(422).json({ error: "Invalid Credentials" });
                }

            
                const overlappingTasks = savedUser.tasks.filter((task) => {
                    return (task.start <= end && task.end >= start && task.dueDate>=dueDate);
                });

                if (overlappingTasks.length > 0) {
                    return res.status(422).json({ error: "New task overlaps with previously added tasks" });
                }

                savedUser.tasks.push({ title, start, end, dueDate, category});
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