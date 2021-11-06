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

router.get('/dashboard', ensureAuthenticated, (req, res) => {

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
    console.log(req.body)
    await Artist.findOneAndUpdate({ _id: req.params.id }, req.body)
        .then(data => {
            console.log(data)
            req.flash('success_msg', 'Successfully updated details');
            res.redirect('/test/dashboard')
        })
        .catch(err => {
            console.log(err)
        })
})


module.exports = router;