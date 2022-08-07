const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Band = require('../models/bandModel');
const User = require('../models/UserModel')
// const passport = require('passport-local-mongoose');
const multer = require('multer');
const nodemailer = require('nodemailer');
const passport = require('passport');

//Multer middleware to handle image uploads
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
    res.render('admin_band', {
        user: { name: 'Odeke Trevor', age: 24 },
    });
})

//Route to register bands
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
    //Check if the email aleady exists
    if (checkUser) {

        req.flash('error_msg', 'Email already exists');
        res.redirect('/admin/bands');

        //Check if the bandname already exists
    } else if (checkBandName) {
        console.log('This id exists')
        req.flash('error_msg', 'Band name already exists');
        res.redirect('/admin/bands');
    }

    //Send an email to create a password
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
                    req.flash('success_msg', 'Band registered successfully');
                    res.redirect('/admin/bands');
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (err) {
            console.log(err);
        }
    }

});

router.get('/', (req, res) => {
    Band.find({}, function (err, data) {
        if (err) {
            console.log(err);
        } else {

            console.log(data);
            res.render('bandpage', {
                user: data,
            });
            // console.log(data);
        }
    });
});

//Search bands by public user
router.post('/', async (req, res) => {
    //Search for bands based on names
    if (req.body.filter == "Name") {
        console.log('Here')
        await Band.find({ bandname: req.body.search })
            .then(data => {
                if (data.length > 0) {
                    console.log(data)
                    //render page if user exists
                    res.render('bandpage', {
                        user: data,
                    });
                } else {
                    Band.find({}, function (err, data) {
                        if (err) {
                            console.log(err);
                        } else {

                            console.log('Here');
                            req.flash('error_msg', 'Band does not exist');
                            res.redirect('/bands')
                            // console.log(data);
                        }
                    });
                }
            })
            .catch(err => {
                console.log(err)
            })
        //Search for bands based on genre
    } else if (req.body.filter == "Genre") {
        const gen = req.body.search;
        const search_val = gen.charAt(0).toUpperCase() + gen.slice(1).toLowerCase();
        console.log(search_val);
        await Band.find({ category: search_val })
            .then(data => {
                if (data.length > 0) {
                    console.log(data)
                    //render page if user exists
                    res.render('bandpage', {
                        user: data,
                    });
                } else {
                    Band.find({}, function (err, data) {
                        if (err) {
                            console.log(err);
                        } else {

                            req.flash('error_msg', 'Genre does not exist');
                            res.redirect('/bands')
                            // console.log(data);
                        }
                    });
                }
            })
            .catch(err => {
                console.log(err)
            })
        //Search for bands based on their home location
    } else if (req.body.filter == "Home") {

        await Band.find({ home: req.body.search })
            .then(data => {
                if (data.length > 0) {
                    console.log('Mine')
                    console.log(data)
                    res.render('bandpage', {
                        user: data,
                    });
                } else {
                    Band.find({}, function (err, data) {
                        if (err) {
                            console.log(err);
                        } else {

                            req.flash('error_msg', `No bands from ${req.body.search}`);
                            res.redirect('/bands')
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

//Update user band details
router.post('/update/:id', async (req, res) => {
    var pass = false;
    const name = Band.findOne({ bandname: req.body.bandname })
    //Check if the bandname already exists
    await Band.findOne({ _id: req.params.id })
        .then(data => {
            if (data.bandname == req.body.bandname) {
                pass = true;
            } else if (name) {
                req.flash('error_msg', 'Bandname already exists');
                res.redirect('/profile/bandaccount')
            } else {
                pass = true
            }
        }).catch(err => {
            console.log(err)
        })

    if (pass) {
        Band.findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(data => {

                req.flash('success_msg', 'Successfully updated details');
                res.redirect('/profile/bandaccount')
            })
            .catch(err => {
                console.log(err)
            })
    }
})

//Update a band by a clerk
router.post('/admin-update/:id', async (req, res) => {
    console.log(req.body)

    const noNumber = /^[A-Za-z]+$/;
    const capitalize = /^[A-Z][a-z]/;
    const moreThan1 = /[\w\s]+/;
    const alphaNumeric = /^[a-zA-Z0-9]+$/;

    //Validatng the fields for the update form
    if (req.body.bandname == '' || req.body.owner == '' || req.body.slogan == '' || req.body.albums == '') {
        req.flash('error_msg', 'Missing fields, unable to update')
        res.redirect('/admin/bands')
    } else if (req.body.bandname.length <= 1 || !req.body.bandname.match(capitalize) || !req.body.bandname.match(alphaNumeric)) {
        req.flash('error_msg', 'Invalid bandname')
        res.redirect('/admin/bands')
    } else if (req.body.slogan.length <= 1) {
        req.flash('error_msg', 'Invalid slogan')
        res.redirect('/admin/bands')
    } else if (req.body.profile.length <= 1) {
        req.flash('error_msg', 'Invalid profile')
        res.redirect('/admin/bands')
    } else if (req.body.sponsors.length > 1) {
        if (req.body.sponsors.length <= 1) {
            req.flash('error_msg', 'Invalid name of sponsors')
            res.redirect('/admin/bands')
        }
    }
    else {
        const check = false
        var checkName = false
        const name = await Band.findOne({ bandname: req.body.bandname, })


        await Band.findOne({ _id: req.params.id })
            .then(data => {
                //Set checkName to true incase the name has not been changed in the form
                if (data.bandname == req.body.bandname) {
                    console.log('Current name')
                    checkName = true
                    //Check if the band name exists
                } else if (name) {

                    console.log('Name exists')
                    req.flash('error_msg', 'Band name exists');
                    res.redirect('/admin/bands')
                } else {
                    //Set checkName to true if the name does not exist
                    console.log('Name passes')
                    checkName = true
                }



            })
        console.log('Pass')
        //Udate after the form passes all the tests
        if (checkName) {

            const { email } = Band.findOne({ _id: req.params.id })

            await Band.findOneAndUpdate({ _id: req.params.id }, req.body)
                .then(data => {
                    console.log(data)

                    req.flash('success_msg', 'Successfully updated details');
                    res.redirect('/admin/bands')
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
})

//Delete a band
router.get('/delete/:id', async (req, res) => {
    console.log(req.body)
    await Band.findByIdAndRemove({ _id: req.params.id }, req.body)
        .then(data => {
            console.log(data)
            User.deleteOne({ email: data.email })
                .then(data => {
                    console.log(data)
                })
                .catch(err => {
                    console.log(err)
                })
            req.flash('success_msg', 'Band successfully deleted');
            res.redirect('/admin/bands')
        })
        .catch(err => {
            console.log(err)
        })
    res.redirect('/admin')
})

//Detail page for bands
router.get("/:id", async (req, res) => {
    try {
        const details = await Band.findOne({ _id: req.params.id });
        console.log(details);
        res.render("band-detail", { user: details });
    } catch (err) {
        res.status(400).send("Cannot find band");
    }
});
module.exports = router;

