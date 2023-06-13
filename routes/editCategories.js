const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");

require("dotenv").config();

router.post("/editCategories", (req, res) => {
    const { email, color, category } = req.body;

    if (!email || !color || !category) {
        return res.status(400).json({ message: "Email, color, and category are required" });
    }

    User.findOne({ email: email })
        .then((savedUser) => {
            if (!savedUser) {
                return res.status(404).json({ message: "User not found" });
            }

            savedUser.tasks.forEach((task) => {
                if (task.category === category) {
                    task.color = color;
                }
            });

            savedUser.markModified("tasks");

            savedUser.save()
                .then(() => {
                    res.json({ message: "Categories updated successfully" });
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).json({ error: "Internal Server Error" });
                });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
        });
});

module.exports = router;
