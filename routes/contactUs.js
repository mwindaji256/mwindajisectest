const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const nodemailer = require('nodemailer');

require('dotenv').config();

//Rendering the contact us page
router.get('/', (req, res) => {
    res.render('contact-us')
})

//Sending the emails from the contact us form
router.post('/register', (req, res) => {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'trevodex@gmail.com',
            pass: '*****',
        },
    });

    var mailOptions = {
        from: 'trevodex@gmail.com',
        to: 'angulotrevor@gmail.com',
        subject: 'Feedback',
        html: `<html><body><h3>${req.body.subject}</h3><p>Name : ${req.body.name}</p>Email : <p>${req.body.email}</p><p>Message : ${req.body.message}</p></body></html>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            req.flash('error_msg', 'Failed to send email.');
            res.redirect('/contact')
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    req.flash('success_msg', 'Thank you for reaching out.');
    res.redirect('/contact')
})

module.exports = router;