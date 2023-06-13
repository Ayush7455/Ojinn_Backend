const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");

require("dotenv").config();

router.post("/getCategories", (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    User.findOne({ email: email })
        .then((savedUser) => {
            if (!savedUser) {
                return res.status(404).json({ message: "User not found" });
            }

            const categories = savedUser.tasks.reduce((acc, task) => {
                if (!acc.find(cat => cat.category === task.category)) {
                    acc.push({ category: task.category, color: task.color });
                }
                return acc;
            }, []);

            res.json({ categories });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Internal Server Error" });
        });
});

module.exports = router;