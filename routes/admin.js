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

 
//Route for displaying the admin page for the artists
router.get('/artists', ensureAuthenticated, (req, res) => {
    //Redirect users trying to access the clerk's page
    if (req.user.role != "admin") {
        req.flash('error_msg', 'Only for clerks');
        res.redirect('/users/login');
    } else {
        RegisterArtist.find({}, function (err, data) {
            if (err) {
                console.log(err);
            } else {

                //Render the admin's page
                res.render('admin', {
                    user: data,
                    moment: require('moment')
                });
                // console.log(data);
            }
        });
    }

});


//Route to handle the admin page of the bands
router.get('/bands', ensureAuthenticated, async (req, res) => {

    //Get all the bands
    Band.find({}, async function (err, data) {
        if (err) {
            console.log(err);
        } else {
            try {
                //Variable to store the bands that are rendered to the page
                var users = await Band.find();

                if (req.query.search) {
                    console.log('Here')
                    //Search for the bands based on their band names
                    await Band.find({ bandname: req.query.search })
                        .then(data => {
                            console.log(data)
                            //Incase there are no bands matching the search criteria
                            if (data.length == 0) {
                                console.log('No results')
                                req.flash(
                                    'error_msg',
                                    'No search results'
                                );
                                res.redirect('/admin/bands')
                            } else {
                                //Return the bands matching the searched band names
                                users = data
                                res.render('admin_band', {
                                    user: users,
                                    moment: require('moment')
                                })
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                    console.log('Here')
                } else {
                    //Render the normal page incase there is no search criteria
                    res.render('admin_band', {
                        user: users,
                        moment: require('moment')
                    })
                }
            } catch (err) {
                console.log(err)
            }
        }
    });

});

//Route to handle the admin page of the comedians
router.get('/comedians', ensureAuthenticated, async (req, res) => {

    if (req.user.role != "admin") {
        req.flash('error_msg', 'Only for clerks');
        res.redirect('/users/login');
    } else {
        try {
            //Variable to store the comedians that are rendered to the page
            var users = await Comedian.find();
            if (req.query.username) {
                console.log('Here')
                //Search for the comedians based on their stage names
                await Comedian.find({ stagename: req.query.username })
                    .then(data => {
                        console.log(data)
                        //Check if the comedian with the stagename actually exists
                        if (data.length == 0) {
                            console.log('No results')
                            req.flash(
                                'error_msg',
                                'No search results'
                            );
                            res.redirect('/admin/comedians')
                        } else {
                            //Return the comedians matching the stagename searched
                            users = data
                            res.render('admin_comedian', {
                                user: users,
                                moment: require('moment')
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
                console.log('Here')
            } else {

                res.render('admin_comedian', {
                    user: users,
                    moment: require('moment')
                })
            }
        } catch (err) {
            console.log(err)
        }
    }

});

//Route handling the search for artists on the admin page
router.post("/search", async (req, res) => {
    console.log(req.body)
    // const findArtist = await RegisterArtist.find({})
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

