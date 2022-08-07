const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const RegisterArtist = require('../models/artistModel');
const User = require('../models/UserModel')
// const passport = require('passport-local-mongoose');
const multer = require('multer');
const nodemailer = require('nodemailer');
const passport = require('passport');
const { ensureAuthenticated } = require('../config/auth')

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        var images = file.fieldname;

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

router.get('/artists', (req, res) => {
    RegisterArtist.find({}, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            var img = data[0].img;
            console.log(img);
            res.render('artist', {
                user: data,
            });
            // console.log(data);
        }
    });
});

// router.get('/login', (req, res) => {
//     res.render('login', {
//         user: "Hello",
//     });
// })


router.post('/artists', async (req, res) => {
    //dropdown menu filter
    if (req.body.filter == "Name") {
        console.log('Here')
        await RegisterArtist.find({ stagename: req.body.search })
            .then(data => {
                if (data.length > 0) {
                    console.log(data)
                    //render page if user exists
                    res.render('artist', {
                        user: data,
                    });
                } else {
                    RegisterArtist.find({}, function (err, data) {
                        if (err) {
                            console.log(err);
                        } else {

                            console.log('Here');
                            req.flash('error_msg', 'Artist does not exist');
                            res.redirect('/artists');
                            // console.log(data);
                        }
                    });
                }
            })
            .catch(err => {
                console.log(err)
            })
    } else if (req.body.filter == "Gender") {
        console.log('Gender')
        await RegisterArtist.find({ gender: req.body.search.toLowerCase() })
            .then(data => {
                if (data.length > 0) {
                    console.log('Mine')
                    console.log(data)
                    res.render('artist', {
                        user: data,
                    });
                } else {
                    RegisterArtist.find({}, function (err, data) {
                        if (err) {
                            console.log(err);
                        } else {
                            req.flash('error_msg', 'No artists of that gender');
                            res.redirect('/artists');
                            // console.log(data);
                        }
                    });
                }
            })
            .catch(err => {
                console.log(err)
            })
    } else if (req.body.filter == "Home") {
        console.log('Home')
        await RegisterArtist.find({ area: req.body.search })
            .then(data => {
                if (data.length > 0) {
                    console.log('Mine')
                    console.log(data)
                    res.render('artist', {
                        user: data,
                    });
                } else {
                    RegisterArtist.find({}, function (err, data) {
                        if (err) {
                            console.log(err);
                        } else {

                            console.log('Here');
                            req.flash('error_msg', 'No artists from that area');
                            res.redirect('/artists');
                            // console.log(data);
                        }
                    });
                }
            })
            .catch(err => {
                console.log(err)
            })
    } else {
        RegisterArtist.find({}, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                var img = data[0].img;
                console.log(img);
                res.render('artist', {
                    user: data,
                    error: true
                });
                // console.log(data);
            }
        });
        console.log(req.body)
        console.log('failed')
    }

})

router.get('/register/artists', ensureAuthenticated, (req, res) => {
    if (req.user.role != "admin") {
        req.flash('error_msg', 'Only for clerks');
        res.redirect('/users/login');
    } else {
        res.render('admin', {
            user: { name: 'Odeke Trevor', age: 24 },
        });
    }
});

router.post('/register/artists', upload.single('image'), async (req, res) => {
    const create = new RegisterArtist({
        username: req.body.username,
        stagename: req.body.stagename,
        email: req.body.email,
        profile: req.body.profile,
        dob: req.body.dob,
        startdate: req.body.startdate,
        gender: req.body.gender,
        nin: req.body.nin,
        location: req.body.location,
        albums: req.body.albums,
        artistid: req.body.artistid,
        contact: req.body.contact,
        area: req.body.area,
        img: req.file.path.substr(6),

    });
    const checkUser = await RegisterArtist.findOne({
        username: req.body.username,
    });
    const checkEmail = await RegisterArtist.findOne({
        email: req.body.email,
    });
    const checkId = await RegisterArtist.findOne({
        artistid: req.body.artistid,
    });
    const checkNIN = await RegisterArtist.findOne({
        nin: req.body.nin,
    });
    const checkContact = await RegisterArtist.findOne({
        contact: req.body.contact,
    });

    // const results = await checkUser.toArray();

    if (checkUser) {

        console.log('My user exists');
        req.flash('error_msg', 'This user exists');
        res.redirect('/admin/artists');

    } else if (checkEmail) {
        console.log('This email exists')
        req.flash('error_msg', 'Artist id already exists');
        res.redirect('/admin/artists');
    }
    else if (checkNIN) {
        console.log('This NIN exists')
        req.flash('error_msg', 'NIN already exists');
        res.redirect('/admin/artists');
    }
    else if (checkContact) {
        console.log('This contact exists')
        req.flash('error_msg', 'This contact exists');
        res.redirect('/admin/artists');
    }
    else if (checkId) {
        console.log('This id already exists')
        req.flash('error_msg', 'Artist id already exists');
        res.redirect('/admin/artists');
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
                    req.flash('success_msg', 'Artist successfully added');
                    res.redirect('/admin/artists')
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

//Deleting an artist
router.get('/delete/:id', async (req, res) => {
    console.log(req.body)
    await RegisterArtist.findByIdAndRemove({ _id: req.params.id }, req.body)
        .then(data => {
            console.log(data)
            User.deleteOne({ email: data.email })
                .then(data => {
                    console.log(data)
                })
                .catch(err => {
                    console.log(err)
                })
            req.flash('success_msg', 'Artist successfully deleted');
            res.redirect('/admin/artists')
        })
        .catch(err => {
            console.log(err)
        })
    res.redirect('/admin/artists')
})

//Delete artist, new code
router.post('/deleteartist', async (req, res) => {
    if (req.session.user) {
        try {
            await RegisterArtist.deleteOne({ email: req.body.id });
            await User.deleteOne({ email: req.body.id });
            res.redirect('back');
        } catch (err) {
            res.send('You are unable to delete an artist ', err);
        }
    } else {
        console.log('cant find session');
        res.redirect('/login');
    }
});



//Update an artist
router.post('/update/:id', async (req, res) => {

    var checkName = false
    var checkContact = false

    const noNumber = /^[A-Za-z]+$/;
    const capitalize = /^[A-Z][a-z]/;
    const moreThan1 = /[\w\s]+/;
    const alphaNumeric = /^[a-zA-Z0-9]+$/;
    const artistIdformart = /^[a-z]{3}\d+[a-z]{3}/;
    const nationalIDFormat = /^[A-Z]{2}\d+[A-Z]{3}/;
    const phoneFormat = /^\d{12}$/;
    const emailFormat = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;

    //Backend validation for update forms
    if (req.body.stagename == '' || req.body.contact == '' || req.body.area == '' || req.body.albums == '' || req.body.location == '' || req.body.profile == '') {
        req.flash('error_msg', 'Missing fields, unable to update')
        res.redirect('/admin/artists')
    } else if (req.body.stagename.length < 1 || !req.body.stagename.match(capitalize) || !req.body.stagename.match(alphaNumeric)) {
        req.flash('error_msg', 'Invalid stagename')
        res.redirect('/admin/artists')
    } else if (req.body.location.length < 1 || !req.body.location.match(capitalize) || !req.body.location.match(noNumber)) {
        req.flash('error_msg', 'Invalid location')
        res.redirect('/admin/artists')
    } else if (req.body.area.length < 1 || !req.body.area.match(capitalize) || !req.body.area.match(noNumber)) {
        req.flash('error_msg', 'Invalid area')
        res.redirect('/admin/artists')
    } else {



        const stagename = await RegisterArtist.findOne({ stagename: req.body.stagename, })
        const nin = await RegisterArtist.findOne({ nin: req.body.nin, })
        const artistid = await RegisterArtist.findOne({ artistid: req.body.artistid, })
        const contact = await RegisterArtist.findOne({ contact: req.body.contact, })

        await RegisterArtist.findOne({ _id: req.params.id })
            .then(data => {
                //Check stagename
                if (data.stagename == req.body.stagename) {
                    console.log('Current name')
                    checkName = true
                } else if (stagename) {

                    console.log('Stagename exists')
                    req.flash('error_msg', 'Stagename exists');
                    res.redirect('/admin/artists')
                } else {
                    console.log('Stagename passes')
                    checkName = true
                }

                //Check contact
                if (data.contact == req.body.contact) {
                    console.log('Current contact')
                    checkContact = true
                } else if (contact) {
                    console.log('Contact exists')
                    req.flash('error_msg', 'Contact exists');
                    res.redirect('/admin/artists')
                } else {
                    console.log('Contact passes')
                    checkContact = true
                }

            })
        console.log('Pass')
        //Udate after the form passes all the tests
        if (checkName && checkContact) {
            //Store the email before updating
            const { email } = RegisterArtist.findOne({ _id: req.params.id })

            await RegisterArtist.findOneAndUpdate({ _id: req.params.id }, req.body)
                .then(data => {
                    console.log(data)

                    req.flash('success_msg', 'Successfully updated details');
                    res.redirect('/admin/artists')
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
})

// get particular artist Information
router.get("/artist/:id", async (req, res) => {
    try {
        const details = await RegisterArtist.findOne({ _id: req.params.id });
        res.render("detail2", { user: details });
    } catch (err) {
        res.status(400).send("Cannot find Artist");
    }
});



module.exports = router;
