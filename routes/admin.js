const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const RegisterArtist = require('../models/artistModel');
const User = require('../models/UserModel')
const Band = require('../models/bandModel')
const Comedian = require('../models/comedianModel')
// const passport = require('passport-local-mongoose');
const multer = require('multer');
const nodemailer = require('nodemailer');
const passport = require('passport');
const { ensureAuthenticated } = require('../config/auth')

router.get('/artists', (req, res) => {

    RegisterArtist.find({}, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            var img = data[0].img;
            console.log(img);
            res.render('admin', {
                user: data,
                moment: require('moment')
            });
            // console.log(data);
        }
    });
});

router.get('/comedians', (req, res) => {

    Comedian.find({}, function (err, data) {
        if (err) {
            console.log(err);
        } else {


            res.render('admin_comedian', {
                user: data,
                moment: require('moment')
            });
            // console.log(data);
        }
    });
});

router.get('/bands', async (req, res) => {


    try {
        let users = await Band.find();
        if (req.query.search) {
            await Band.find({ bandname: req.query.search })
                .then(data => {
                    if (data.length == 0) {
                        console.log('No users')
                        req.flash(
                            'error_msg',
                            'Band does not exist'
                        );
                        res.redirect('/admin/bands')
                    } else {
                        users = data
                    }
                })
                .catch(err => {
                    console.log(err)
                })

        }
        res.render('admin_band', {
            user: users,
            moment: require('moment')
        });
    } catch (err) {
        console.log(err)
    }
});

router.get('/comedians',async (req, res) => {

    // Comedian.find({}, function (err, data) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log(img);
    //         res.render('admin_comedian', {
    //             user: data,
    //             moment: require('moment')
    //         });
    //         // console.log(data);
    //     }
    // });

    let users = await Comedian.find({})

    res.render('admin_comedian',{
        user = users,
        moment: require('moment')
    })
});

router.post("/search", async (req, res) => {
    console.log(req.body)
    const findArtist = await RegisterArtist.find({})
    await RegisterArtist.find({ username: req.body.search })
        .then(data => {

            if (data.length > 0) {
                console.log(data)
                res.render('admin', {
                    user: data,
                    success: true,
                    msg: 'User name exists.',
                })
            } else {
                req.flash(
                    'error_msg',
                    'User does not exist'
                );
                res.redirect('/admin/artists')
            }
        })
        .catch(err => {
            console.log(err)
        })

})



module.exports = router;

