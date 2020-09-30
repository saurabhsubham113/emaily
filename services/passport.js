const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require('mongoose')

const User = mongoose.model('User')
//passport a new strategy is available and here it is . Make use of it

passport.serializeUser((user, done) => {
    done(null, user.id)     //user.id is the mongodb unique id
})

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user)
        })
})
passport.use(
    new GoogleStrategy({
        clientID: process.env.GoogleClientId,
        clientSecret: process.env.GoogleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleId: profile.id })
            .then((existingUser) => {
                if (existingUser) {
                    //we already have a user with this Id,don't create a new user in database
                    done(null, existingUser)     //done is called after we are donwe with the user
                } else {
                    //we don't have a user record with this Id, Please save it in the database
                    new User({ googleId: profile.id }).save()
                        .then(user => {
                            done(null, user)     //done is called after we are donwe with the user
                        })
                }
            })


    })
)
