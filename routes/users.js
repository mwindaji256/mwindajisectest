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

    const user = await Users.findOne({ email: req.body.email })
    if (user) {

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
                            successRedirect: '/admin/artists',
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

//Updating passwords
router.post('/password_update/:email', (req, res) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password1, salt, async (err, hash) => {
            if (err) throw err;
            Users.findOneAndUpdate({ email: req.params.email }, { password: hash })
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

//logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
});

module.exports = router;