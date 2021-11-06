const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Band = require('../models/bandModel');
// const passport = require('passport-local-mongoose');
const multer = require('multer');
const nodemailer = require('nodemailer');
const passport = require('passport');

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

router.get('/register', (req, res) => {
    res.render('admin-band', {
        user: { name: 'Odeke Trevor', age: 24 },
    });
})

router.post('/register', upload.fields([{
    name: 'bandicon', maxCount: 1
}, {
    name: 'bandimage', maxCount: 1
}]), async (req, res) => {
    const create = new Band(req.body);
    create.bandicon = req.files.bandicon[0].path.substr(6);
    create.bandimage = req.files.bandimage[0].path.substr(6);
    const checkUser = await Band.findOne({
        email: req.body.email,
    });
    const checkBandName = await Band.findOne({
        bandname: req.body.bandname,
    });

    // const results = await checkUser.toArray();

    if (checkUser) {

        console.log('Band exists');
        res.render('admin-band', {
            user: {
                name: `${req.body.username}`,
                age: 24,
                success: false,
                msg: 'Email already exists.'
            },
        });
        req.flash('error_msg', 'This band exists');
    } else if (checkBandName) {
        console.log('This id exists')
        req.flash('error_msg', 'Band name already exists');
        res.render('admin-band', {
            user: {
                name: `${req.body.username}`,
                age: 24,
                success: false,
                msg: 'Band name already exists.'
            },
        });
    }
    else {
        console.log('Band does not exist');
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
                        html: `<html><body><h2>Click the link below to create your password and login.</h2><a href=http://localhost:3000/password/create/${req.body.email}/band>Click here</a></body></html>`,
                    };

                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });

                    console.log(data);

                    res.render('admin-artist', {
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

router.get('/show', (req, res) => {
    Band.find({}, function (err, data) {
        if (err) {
            console.log(err);
        } else {

            console.log(data);
            res.render('band', {
                user: data,
            });
            // console.log(data);
        }
    });
});

router.post('/show', async (req, res) => {
    if (req.body.filter == "Name") {
        console.log('Here')
        await Band.find({ bandname: req.body.search })
            .then(data => {
                if (data.length > 0) {
                    console.log(data)
                    //render page if user exists
                    res.render('band', {
                        user: data,
                    });
                } else {
                    Band.find({}, function (err, data) {
                        if (err) {
                            console.log(err);
                        } else {

                            console.log('Here');
                            res.render('band', {
                                user: data,
                                error: true
                            });
                            // console.log(data);
                        }
                    });
                }
            })
            .catch(err => {
                console.log(err)
            })
    } else if (req.body.filter == "Genre") {
        console.log('Gender')
        await Band.find({ genre: req.body.search.toLowerCase() })
            .then(data => {
                if (data.length > 0) {
                    console.log('Mine')
                    console.log(data)
                    res.render('band', {
                        user: data,
                    });
                } else {
                    Band.find({}, function (err, data) {
                        if (err) {
                            console.log(err);
                        } else {

                            console.log('Here');
                            res.render('band', {
                                user: data,
                                error: true
                            });
                            // console.log(data);
                        }
                    });
                }
            })
            .catch(err => {
                console.log(err)
            })
    } else if (req.body.filter == "Home") {

        await Band.find({ home: req.body.search })
            .then(data => {
                if (data.length > 0) {
                    console.log('Mine')
                    console.log(data)
                    res.render('band', {
                        user: data,
                    });
                } else {
                    Band.find({}, function (err, data) {
                        if (err) {
                            console.log(err);
                        } else {

                            console.log('Here');
                            res.render('band', {
                                user: data,
                                error: true
                            });
                            // console.log(data);
                        }
                    });
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
})

router.post('/update/:id', async (req, res) => {
    console.log(req.body)
    await Band.findOneAndUpdate({ _id: req.params.id }, req.body)
        .then(data => {
            console.log(data)
            req.flash('success_msg', 'Successfully updated details');
            res.redirect('/test/bandaccount')
        })
        .catch(err => {
            console.log(err)
        })
})

module.exports = router;

