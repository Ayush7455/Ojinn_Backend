const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const cron = require("node-cron");
const moment = require("moment-timezone");
require("dotenv").config();

async function mailer(receiverEmail) {
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

  let info = await transporter.sendMail({
    from: "Ojinn",
    to: receiverEmail,
    subject: "Reminder",
    html: ``,
  });
}

// Set the default time zone to "Asia/Kolkata" (Indian Standard Time)
moment.tz.setDefault('Asia/Kolkata');

router.post('/schedule', (req, res) => {
  const { email, message, schedule } = req.body;

  cron.schedule(schedule, async () => {
    await mailer(email);
  });

  res.json({ message: 'Notification scheduled successfully' });
});

module.exports = router;