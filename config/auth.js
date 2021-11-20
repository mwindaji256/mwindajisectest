module.exports = {
    ensureAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        //Redirect users who havent logged in to the login form with a message
        req.flash('error_msg', 'Please login to view this resource')
        res.redirect('/users/login')
    }
}