const express = require('express');
const router = express.Router();
require('dotenv').config();
const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path');
const mongoose=require("mongoose")
const User=mongoose.model("User")

async function mailer(receiverEmail, code) {
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

  const templatePath = path.join(__dirname, 'templates', 'verificationEmail.ejs');
  const emailHTML = await ejs.renderFile(templatePath, { code });

  let info = await transporter.sendMail({
    from: "Ojinn",
    to: receiverEmail,
    subject: "Email Verification",
    html: emailHTML,
  });
}

router.post('/syncEmail', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(422).json({ error: "Please add all the fields" });
  }

  try {
    const user = await User.findOne({ email }); // Find the user in the User model

    if (user) {
      let verificationCode = Math.floor(1000 + Math.random() * 9000);
      await mailer(email, verificationCode);
      res.send({ verificationCode });
    } else {
      res.status(200).json({ message: "Entered Email is either invalid or not registered with Ojinn" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
