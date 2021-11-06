const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const multer = require('multer');
const nodemailer = require('nodemailer');
const { ensureAuthenticated } = require('../config/auth')
const Comedian = require('../models/comedianModel')

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        var images = file.fieldname;
        console.log(images);
        cb(null, file.fieldname + '-' + Date.now());
    },
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter,
});

router.get('/', (req, res) => {
    Comedian.find({}, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            var img = data[0].img;
            console.log(img);
            res.render('comedians', {
                user: data,
            });
            // console.log(data);
        }
    });
});

router.get('/register', (req, res) => {
    res.render('admin-comedians', {
        user: { name: 'Odeke Trevor', age: 24 },
    });
})

router.post('/register', upload.single('image'), async (req, res) => {
    const create = new Comedian(req.body);
    create.img = req.file.path.substr(6);
    const checkUser = await Comedian.findOne({
        username: req.body.username,
    });
    const checkEmail = await Comedian.findOne({
        email: req.body.email,
    });
    const checkId = await Comedian.findOne({
        artistid: req.body.comedianid,
    });
    const checkNIN = await Comedian.findOne({
        nin: req.body.nin,
    });
    const checkContact = await Comedian.findOne({
        contact: req.body.contact,
    });

    // const results = await checkUser.toArray();

    if (checkUser) {

        console.log('User exists');
        req.flash('error_msg', 'This user exists');
        res.render('admin-comedians', {
            user: {
                name: `${req.body.username}`,
                age: 24,
                success: false,
                msg: 'User name exists.',

            },
        });

    } else if (checkEmail) {
        console.log('This email exists')
        req.flash('error_msg', 'Artist id already exists');
        res.render('admin-comedians', {
            user: {
                name: `${req.body.username}`,
                age: 24,
                success: false,
                msg: 'This email already exists.'
            },
        });
    }
    else if (checkNIN) {
        console.log('This NIN exists')
        req.flash('error_msg', 'Artist id already exists');
        res.render('admin-comedians', {
            user: {
                name: `${req.body.username}`,
                age: 24,
                success: false,
                msg: 'NIN already exists.'
            },
        });
    }
    else if (checkContact) {
        console.log('This contact exists')
        req.flash('error_msg', 'Artist id already exists');
        res.render('admin-comedians', {
            user: {
                name: `${req.body.username}`,
                age: 24,
                success: false,
                msg: 'This contact already exists.'
            },
        });
    }
    else if (checkId) {
        console.log('This id exists')
        req.flash('error_msg', 'Artist id already exists');
        res.render('admin-comedians', {
            user: {
                name: `${req.body.username}`,
                age: 24,
                success: false,
                msg: 'Artist ID already exists.',
            },
        });
    }


    else {
        console.log('User does not exist');
        try {
            create
                .save(checkUser)
                .then((data) => {


                    console.log(data);
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'trevodex@gmail.com',
                            pass: 'gonzaelvis',
                        },
                    });

                    var mailOptions = {
                        from: 'trevodex@gmail.com',
                        to: 'angulotrevor@gmail.com',
                        subject: 'Create password',
                        html: `<html><body><h2>Click the link below to create your password and login.</h2><a href=http://localhost:3000/password/create/${req.body.email}/artist>Click here</a></body></html>`,
                    };

                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                    req.flash('error_msg', 'Artist id already exists');
                    res.render('admin-comedians', {
                        user: {
                            name: `${req.body.username}`,
                            age: 24,
                            success: true,
                        },
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (err) {
            console.log(err);
        }



    }

    // create.save((error, savedUser) => {
    //     if (error) throw error;
    //     res.json(savedUser);
    // });
});

module.exports = router;