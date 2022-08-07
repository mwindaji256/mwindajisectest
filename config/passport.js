const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

//Load User Model
const Users = require('../models/UserModel')

module.exports = function (passport) {
    passport.use(
        new localStrategy({ usernameField: 'email' }, (email, password, done) => {
            //Match User 
            const user = Users.findOne({ email: email })

            //If the user exists
            if (user) {
                user
                    .then(user => {
                        if (!user) {
                            console.log('Email not regsitered')
                            return done(null, false, { message: 'That email is not registered' })

                        }
                        //Match password
                        bcrypt.compare(password, user.password, (err, isMatch) => {
                            if (err) {
                                console.log(err)
                            }

                            if (isMatch) {
                                return done(null, user)
                            } else {
                                console.log('Passwords do not match')
                                return done(null, false, { message: 'Password incorrect' })

                            }
                        })

                    })
                    .catch(err => console.log(err))
            }
        })
    )
    //Serialize the user
    passport.serializeUser((user, done) => {
        done(null, user.id)
    });

    //Deserialise the user
    passport.deserializeUser((id, done) => {
        Users.findById(id, function (err, user) {
            done(err, user)
        });
    });

}