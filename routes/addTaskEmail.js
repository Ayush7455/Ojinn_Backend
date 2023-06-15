const express = require('express');
const router = express.Router();
require('dotenv').config();
const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path');
const mongoose=require("mongoose")
const User=mongoose.model("User")

async function mailer(receiverEmail, title,start,end,dueDate,category) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.NodeMailer_email,
      pass: process.env.NodeMailer_password,
    },
  });

  const templatePath = path.join(__dirname, 'templates', 'addTaskEmail.ejs');
  const emailHTML = await ejs.renderFile(templatePath, {title,start,end,dueDate,category});

  let info = await transporter.sendMail({
    from: "Ojinn",
    to: receiverEmail,
    subject: title,
    html: emailHTML,
  });
}

router.post('/addTaskEmail', async (req, res) => {
  const { email , title,start,end,dueDate,category} = req.body;

  if (!email||!title||!start||!end||!dueDate||!category) {
    return res.status(422).json({ error: "Please add all the fields" });
  }

  try {
    const user = await User.findOne({ email }); 

    if (user) {
      await mailer(email, title,start,end,dueDate,category);
    } else {
      res.status(200).json({ message: "Entered Email is either invalid or not registered with Ojinn" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
