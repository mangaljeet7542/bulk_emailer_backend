const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()

const app = express();
app.use(cors());
app.use(bodyParser.json());

// console.log(process.env.EMAIL_HOST_USER, process.env.EMAIL_HOST_PASSWORD)

const transporter = nodemailer.createTransport({
    host: "smpt.hostinger.com",
    secure: true, 
    secureConnection: false,
    tls: {
       ciphers: "SSLv3",
    },
    requireTLS: true,
    port: 465,
    debug: true,
    connectionTimeout: 10000,
    auth: {
        user: process.env.EMAIL_HOST_USER,
        pass: process.env.EMAIL_HOST_PASSWORD,
    },
});

app.post('/api/send-email', async (req, res) => {
    const { to, cc, bcc, subject, text } = req.body;

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_HOST_USER,
            to,
            cc,
            bcc,
            subject,
            text,
        });
        res.status(200).send('Email sent');
    } catch (error) {
        // console.log(process.env.EMAIL_HOST_USER, process.env.EMAIL_HOST_PASSWORD)
        console.log("this is the error", error)
        res.status(500).send('Error sending email');
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
