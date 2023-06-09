const nodemailer = require('nodemailer');
const path = require('path');
const ejs = require('ejs')
const templatePath = path.join(__dirname, '../views/templates/email.ejs');
const serverConfig = require('../config/server.config')


const sendEmail = async (email, token) => {

 const htmlToSend = await ejs.renderFile(templatePath, { token });

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: serverConfig.SMTP_EMAIL,
      pass: serverConfig.SMTP_PASS,
    },
    secure: true,
  });
  mailOption = {
    from: 'multi_vendor@gmail.com',
    to: `${email}`,
    subject: 'Verifying Email',
    html: htmlToSend,
  };
  transport.sendMail(mailOption, (err, info) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log(`message sent successfully`);
    }
  });
};

module.exports = {
  sendEmail,
};