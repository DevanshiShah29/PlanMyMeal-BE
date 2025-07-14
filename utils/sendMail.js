const nodemailer = require("nodemailer");

const sendMail = async ({ to, subject, text }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL, // your Gmail
      pass: process.env.EMAIL_PASS, // app password (not your Gmail login)
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendMail;
