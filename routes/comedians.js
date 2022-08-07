const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const multer = require('multer');
const nodemailer = require('nodemailer');
const { ensureAuthenticated } = require('../config/auth')
const Comedian = require('../models/comedianModel')
const User = require('../models/UserModel')
const bcrypt = require('bcryptjs')

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

//Search for comedians based on filters
router.post('/', async (req, res) => {
    //dropdown menu filter
    if (req.body.filter == "Name") {
        console.log('Here')
        await Comedian.find({ stagename: req.body.search })
            .then(data => {
                if (data.length > 0) {
                    console.log(data)
                    //render page if user exists
                    res.render('comedians', {
                        user: data,
                    });
                } else {
                    Comedian.find({}, function (err, data) {
                        if (err) {
                            console.log(err);
                        } else {

                            console.log('Here');
                            req.flash('error_msg', 'Comedian does not exist');
                            res.redirect('/comedians')
                            // console.log(data);
                        }
                    });
                }
            })
            .catch(err => {
                console.log(err)
            })
        //return comedians based on their gender
    } else if (req.body.filter == "Gender") {
        console.log('Gender')
        await Comedian.find({ gender: req.body.search.toLowerCase() })
            .then(data => {
                if (data.length > 0) {
                    console.log('Mine')
                    console.log(data)
                    res.render('comedians', {
                        user: data,
                    });
                } else {
                    Comedian.find({}, function (err, data) {
                        if (err) {
                            console.log(err);
                        } else {

                            req.flash('error_msg', `No ${req.body.search.toLowerCase()} comedians`);
                            res.redirect('/comedians')
                            // console.log(data);
                        }
                    });
                }
            })
            .catch(err => {
                console.log(err)
            })
        //Return comedians based on their location
    } else if (req.body.filter == "Location") {
        console.log('Home')
        await Comedian.find({ location: req.body.search })
            .then(data => {
                if (data.length > 0) {
                    console.log('Mine')
                    console.log(data)
                    res.render('comedians', {
                        user: data,
                    });
                } else {
                    Comedian.find({}, function (err, data) {
                        if (err) {
                            console.log(err);
                        } else {

                            req.flash('error_msg', 'No comedians from that location');
                            res.redirect('/comedians')
                            // console.log(data);
                        }
                    });
                }
            })
            .catch(err => {
                console.log(err)
            })
    } else {
        Comedian.find({}, function (err, data) {
            if (err) {
                console.log(err);
            } else {

                res.render('comedians', {
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


router.get('/register', (req, res) => {
    res.render('admin_comedians', {
        user: { name: 'Odeke Trevor', age: 24 },
    });
})

//Registering a new comedian
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
        comedianid: req.body.comedianid,
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
        res.redirect('/admin/comedians');

    } else if (checkEmail) {
        console.log('This email exists')
        req.flash('error_msg', 'This email already exists');
        res.redirect('/admin/comedians')
    }
    else if (checkNIN) {
        console.log('This NIN exists')
        req.flash('error_msg', 'This NIN already exists');
        res.redirect('/admin/comedians')
    }
    else if (checkContact) {
        console.log('This contact exists')
        req.flash('error_msg', 'Artist id already exists');
        res.redirect('/admin/comedians')
    }
    else if (checkId) {
        console.log('This id exists')
        req.flash('error_msg', 'This comedian id already exists');
        res.redirect('/admin/comedians')
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
                        html: `<html><body><h2>Click the link below to create your password and login.</h2><a href=http://localhost:3000/password/create/${req.body.email}/comedian>Click here</a></body></html>`,
                    };

                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                    req.flash('success_msg', 'Comedian successfully created');
                    res.redirect('/admin/comedians')
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


//Updating done by the clerk
router.post('/admin-update/:id', async (req, res) => {
    console.log(req.body)

    const capitalize = /^[A-Z][a-z]/;
    const moreThan1 = /[\w\s]+/;
    const alphaNumeric = /^[a-zA-Z0-9]+$/;

    if (req.body.username == '' || req.body.profile == '') {
        req.flash('error_msg', 'Missing fields, unable to update')
        res.redirect('/admin/comedians')
    } else if (req.body.username.length <= 1 || !req.body.username.match(capitalize) || !req.body.username.match(alphaNumeric)) {
        req.flash('error_msg', 'Invalid username')
        res.redirect('/admin/comedians')
    } else if (req.body.profile.length <= 1) {
        req.flash('error_msg', 'Invalid bio')
        res.redirect('/admin/comedians')
    } else {

        const check = false
        var checkName = false
        const name = await Comedian.findOne({ username: req.body.username, })


        await Comedian.findOne({ _id: req.params.id })
            .then(data => {
                //Check username
                if (data.username == req.body.username) {
                    console.log('Current name')
                    checkName = true
                } else if (name) {

                    console.log('Name exists')
                    req.flash('error_msg', 'Comedian name exists');
                    res.redirect('/admin/comedians')
                } else {
                    console.log('Name passes')
                    checkName = true
                }



            })
        console.log('Pass')
        //Udate after the form passes all the tests
        if (checkName) {
            await Comedian.findOneAndUpdate({ _id: req.params.id }, req.body)
                .then(data => {
                    console.log(data)

                    req.flash('success_msg', 'Successfully updated details');
                    res.redirect('/admin/comedians')
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
})

// comedian detail page
router.get("/:id", async (req, res) => {
    try {
        const details = await Comedian.findOne({ _id: req.params.id });
        console.log(details);
        res.render("comedian-detail", { user: details });
    } catch (err) {
        res.status(400).send("Cannot find Artist");
    }
});

//Deleting a comedian
router.get('/delete/:id', async (req, res) => {

    await Comedian.findByIdAndRemove({ _id: req.params.id }, req.body)
        .then(data => {
            console.log(data)
            User.deleteOne({ email: data.email })
                .then(data => {
                    console.log(data)
                })
                .catch(err => {
                    console.log(err)
                })
            req.flash('success_msg', 'Comedian successfully deleted');
            res.redirect('/admin/comedians')
        })
        .catch(err => {
            console.log(err)
        })
    res.redirect('/admin/comedians')
})

//Update password by comedian
router.post('/password_update/:email', (req, res) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password1, salt, async (err, hash) => {
            if (err) throw err;
            User.findOneAndUpdate({ email: req.params.email }, { password: hash })
                .then(data => {
                    console.log(data)
                    req.flash('error_msg', 'Login with new password')
                    res.redirect('/users/login')
                })
                .catch(err => {
                    console.log(err)
                })
        })
    })

})

//Updating on by the comedian
router.post('/update/:id', async (req, res) => {

    var pass = false;
    const name = Comedian.findOne({ stagename: req.body.stagename })
    //Check if the stagename already exists
    await Comedian.findOne({ _id: req.params.id })
        .then(data => {
            if (data.stagename == req.body.stagename) {
                pass = true;
            } else if (name) {
                req.flash('error_msg', 'Stagename already exists');
                res.redirect('/profile/comedianacc')
            } else {
                pass = true
            }
        }).catch(err => {
            console.log(err)
        })

    if (pass) {
        Comedian.findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(data => {

                req.flash('success_msg', 'Successfully updated details');
                res.redirect('/profile/comedianacc')
            })
            .catch(err => {
                console.log(err)
            })
    }

})

module.exports = router;