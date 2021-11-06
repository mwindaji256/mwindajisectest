const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const RegisterArtist = require('../models/artistModel');
const User = require('../models/UserModel')
const Band = require('../models/bandModel')
const Comedian = require('../models/comedianModel')


router.get('/create/:id/:role', async (req, res) => {
    // await RegisterArtist.findOne({
    //     email: req.params.id,
    // })
    //     .then((data) => {
    //         if (data.password != 'password') {
    //             res.redirect('/login');
    //         } else {
    //             res.render('setpassword', {
    //                 info: {
    //                     success: false,
    //                 },
    //             });
    //         }
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
    const user = await User.findOne({
        email: req.params.id
    });
    if (user) {
        console.log(user)
        res.redirect('/login');
    } else {
        res.render('setpassword', {
            info: {
                success: false,
            },
        });
    }
});

router.post('/create/:id/:role', async (req, res) => {
    const checkUser = await RegisterArtist.findOne({
        artistid: req.params.id,
    });
    const newCheck = await User.findOne({
        email: req.params.id
    })
    const checkBand = await Band.findOne({
        email: req.params.id
    })
    const checkComedian = await Band.findOne({
        email: req.params.id
    })

    if (!newCheck) {
        const newUser = await RegisterArtist.findOne({
            email: req.params.id
        });
        if (!checkBand && !newUser && !checkComedian) {
            console.log('Here')
            res.redirect('/users/login');
        } else if (req.body.password1 == 'password') {
            console.log('please provide a better password');
            res.render('setpassword', {
                info: {
                    success: false,
                },
            });
        } else {
            //Hashing the password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.body.password1, salt, async (err, hash) => {
                    if (err) throw err;
                    //Set password to hashed
                    // await RegisterArtist.updateOne(
                    //     { artistid: req.params.id },
                    //     { password: hash }
                    // )
                    //     .then((result) => {
                    //         console.log(result);
                    //         if (result.modifiedCount > 0) {
                    //             console.log('success');
                    //             res.redirect('/login');
                    //         }
                    //     })
                    //     .catch((err) => {
                    //         console.log(err);
                    //     });
                    const new_user = new User({
                        email: req.params.id,
                        password: hash,
                        role: req.params.role
                    });
                    new_user
                        .save()
                        .then(data => {
                            console.log('Here')
                            console.log(data)
                            res.redirect('/users/login');
                        })
                        .catch(err => {
                            console.log(err)
                        })
                });
            });

        }
    }
});

module.exports = router;