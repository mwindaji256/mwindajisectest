const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')
const Artist = require('../models/artistModel')
const Band = require('../models/bandModel')
const Comedian = require('../models/comedianModel')
// Welcome page
router.get('/', ensureAuthenticated, (req, res) => {
    res.render('welcome');
});

router.get('/artistacc', ensureAuthenticated, (req, res) => {

    Artist.findOne({ email: req.user.email })
        .then(data => {
            console.log(data)
            res.render('profile', {
                user: data,

            })
        })
        .catch(err => {
            console.log(err)
        })


});

router.get('/bandaccount', ensureAuthenticated, (req, res) => {

    Band.findOne({ email: req.user.email })
        .then(data => {
            console.log(data)
            res.render('bandprofile', {
                user: data,

            })
        })
        .catch(err => {
            console.log(err)
        })


});

router.get('/comedianacc', ensureAuthenticated, (req, res) => {

    Comedian.findOne({ email: req.user.email })
        .then(data => {
            console.log(data)
            res.render('comprofile', {
                user: data,

            })
        })
        .catch(err => {
            console.log(err)
        })


});

router.post('/update/:id', async (req, res) => {
    var pass = false;
    const name = Artist.findOne({ stagename: req.body.stagename })
    //Check if the stagename already exists
    await Artist.findOne({ _id: req.params.id })
        .then(data => {
            if (data.stagename == req.body.stagename) {
                pass = true;
            } else if (name) {
                req.flash('error_msg', 'Stagename already exists');
                res.redirect('/profile/artistacc')
            } else {
                pass = true
            }
        }).catch(err => {
            console.log(err)
        })

    if (pass) {
        Artist.findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(data => {

                req.flash('success_msg', 'Successfully updated details');
                res.redirect('/profile/artistacc')
            })
            .catch(err => {
                console.log(err)
            })
    }

})


module.exports = router;