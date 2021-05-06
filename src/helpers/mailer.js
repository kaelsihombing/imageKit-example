const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.username, // email gmail
    pass: process.env.password, // password email
  },
});

module.exports = transporter;
