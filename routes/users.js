const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const RegisterArtist = require('../models/artistModel');

const Users = require('../models/UserModel')
const Admin = require('../models/adminModel');

router.get('/login', (req, res) => {
    res.render('login2')
})


//Login Handle
router.post('/login', async (req, res, next) => {

    const artist = await Users.findOne({ email: req.body.email })
    if (artist) {

        await Users.findOne({ email: req.body.email })
            .exec()
            .then(data => {
                if (data) {
                    console.log(data.role)
                    if (data.role == "artist") {
                        passport.authenticate('local', {
                            successRedirect: '/test/dashboard',
                            failureRedirect: '/users/login',
                            failureFlash: true,

                        })(req, res, next);
                    } else if (data.role == "admin") {
                        passport.authenticate('local', {
                            successRedirect: '/register/artists',
                            failureRedirect: '/users/login',
                            failureFlash: true,
                        })(req, res, next);
                    } else if (data.role == "band") {
                        passport.authenticate('local', {
                            successRedirect: '/test/bandaccount',
                            failureRedirect: '/users/login',
                            failureFlash: true,
                        })(req, res, next);
                    } else if (data.role == "comedian") {
                        passport.authenticate('local', {
                            successRedirect: '/test/comedianacc',
                            failureRedirect: '/users/login',
                            failureFlash: true,
                        })(req, res, next);
                    }
                } else {
                    console.log('Nothing')
                }
            })
            .catch(err => {
                console.log(err)

            })
    } else {
        req.flash('error_msg', 'Invalid login details');
        res.redirect('/users/login')
    }
    console.log('Unable')
})

//logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
});

module.exports = router;