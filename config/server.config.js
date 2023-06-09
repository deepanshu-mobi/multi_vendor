

require('dotenv').config();

module.exports = {
    PORT: process.env.PORT,
    SECRET: process.env.SECRET_TOKEN,
    SMTP_EMAIL: process.env.SMTP_EMAIL,
    SMTP_PASS: process.env.SMTP_PASS,
}