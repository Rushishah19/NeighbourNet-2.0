const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "neighbournet01@gmail.com",
    pass: "pctlpdtdmdklhdaz",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function sendMail(to, subject, text, html) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'neighbournet01@gmail.com', // sender address
    to, // list of receivers
    subject, // Subject line
    text, // plain text body
    html  // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <neighbournet01@gmail.com>
}

module.exports = { sendMail };

