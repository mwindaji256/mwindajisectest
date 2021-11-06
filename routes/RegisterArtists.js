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

router.post('/register', (req, res) => {
    console.log(req.body);
    const { name, email, password, stagename, startdate, dob, gender, nin, location, albums, artistid, conntact } = req.body;
    let errors = [];

    //Check required fields
    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields' });
    }

    //Check passwords
    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password should be at least 6 characters' });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2,
        });
    } else {
        //Validation pass
        User.findOne({ email: email }).then((user) => {
            if (user) {
                //user exists
                console.log('User exists');
                errors.push({ msg: 'Email is already registered' });
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2,
                });
            } else {
                const newUser = new User({
                    name,
                    email,
                    password,
                });

                //Hash password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        //Set password to hashed
                        newUser.password = hash;
                        //Save user
                        newUser
                            .save()
                            .then((user) => {
                                req.flash(
                                    'success_msg',
                                    'You are now registered and can log in'
                                );
                                res.redirect('/users/login');
                            })
                            .catch((err) => console.log(err));
                    });
                });

                console.log(newUser);
            }
        });
    }
});

router.post('/artists', async (req, res) => {
    //dropdown menu filter
    if (req.body.filter == "Name") {
        console.log('Here')
        await RegisterArtist.find({ username: req.body.search })
            .then(data => {
                if (data.length > 0) {
                    console.log(data)
                    //render page if user exists
                    res.render('artists', {
                        user: data,
                    });
                } else {
                    RegisterArtist.find({}, function (err, data) {
                        if (err) {
                            console.log(err);
                        } else {

                            console.log('Here');
                            res.render('artists', {
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
    } else if (req.body.filter == "Gender") {
        console.log('Gender')
        await RegisterArtist.find({ gender: req.body.search.toLowerCase() })
            .then(data => {
                if (data.length > 0) {
                    console.log('Mine')
                    console.log(data)
                    res.render('artists', {
                        user: data,
                    });
                } else {
                    RegisterArtist.find({}, function (err, data) {
                        if (err) {
                            console.log(err);
                        } else {

                            console.log('Here');
                            res.render('artists', {
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
        console.log('Home')
        await RegisterArtist.find({ area: req.body.search })
            .then(data => {
                if (data.length > 0) {
                    console.log('Mine')
                    console.log(data)
                    res.render('artists', {
                        user: data,
                    });
                } else {
                    RegisterArtist.find({}, function (err, data) {
                        if (err) {
                            console.log(err);
                        } else {

                            console.log('Here');
                            res.render('artists', {
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
    } else {
        RegisterArtist.find({}, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                var img = data[0].img;
                console.log(img);
                res.render('artists', {
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
        res.render('admin-artist', {
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
        // img: {
        //     data: fs.readFileSync(
        //         path.join(__dirname + '/public/uploads/' + req.file.filename)
        //     ),
        //     contentType: 'image/png',
        // },
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

        console.log('User exists');
        req.flash('error_msg', 'This user exists');
        res.render('admin', {
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
        res.render('admin', {
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
        req.flash('error_msg', 'NIN already exists');
        res.redirect('/admin');
    }
    else if (checkContact) {
        console.log('This contact exists')
        req.flash('error_msg', 'This contact exists');
        res.render('admin', {
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
        res.render('admin', {
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
                    req.flash('success_msg', 'Account successfully created');
                    res.redirect('/admin')
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
            res.redirect('/admin')
        })
        .catch(err => {
            console.log(err)
        })
    res.redirect('/admin')
})

//Update an artist
router.post('/update/:id', async (req, res) => {
    console.log(req.body)
    const check = false
    var checkName = false
    var checkNin = false
    var checkId = false
    var checkContact = false
    const name = await RegisterArtist.findOne({ username: req.body.username, })
    const nin = await RegisterArtist.findOne({ nin: req.body.nin, })
    const artistid = await RegisterArtist.findOne({ artistid: req.body.artistid, })
    const contact = await RegisterArtist.findOne({ contact: req.body.contact, })

    await RegisterArtist.findOne({ _id: req.params.id })
        .then(data => {
            //Check username
            if (data.username == req.body.username) {
                console.log('Current name')
                checkName = true
            } else if (name) {

                console.log('Name exists')
                req.flash('error_msg', 'Username exists');
                res.redirect('/admin/artists')
            } else {
                console.log('Name passes')
                checkName = true
            }
            //Check NIN
            if (data.nin == req.body.nin) {
                console.log('Current nin')
                checkNin = true
            } else if (nin) {
                console.log('NIN exists')
                req.flash('error_msg', 'NIN exists');
                res.redirect('/admin/artists')
            } else {
                console.log('NIN passes')
                checkNin = true
            }
            //Check artistid
            if (data.artistid == req.body.artistid) {
                console.log('Current id')
                checkId = true
            } else if (artistid) {
                console.log('ArtistID exists')
                req.flash('error_msg', 'ArtistID exists');
                res.redirect('/admin/artists')
            } else {
                console.log('ArtistID passes')
                checkId = true
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
    if (checkName && checkContact && checkNin && checkId) {
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
})

// get particular artist Information
router.get("/artist/:id", async (req, res) => {
    try {
        const detail2 = await RegisterArtist.findOne({ _id: req.params.id });
        res.status(201).render("detail2", { artist: detail2 });
    } catch (err) {
        res.status(400).send("Cannot find Artist");
    }
});



module.exports = router;
