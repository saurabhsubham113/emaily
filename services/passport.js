const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
console.log('passport files');
const mongoose = require('mongoose')
const User = mongoose.model('User')
//passport a new strategy is available and here it is . Make use of it
passport.use(
    new GoogleStrategy({
        clientID: process.env.GoogleClientId,
        clientSecret: process.env.GoogleClientSecret,
        callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
        new User({ googleId: profile.id }).save()
        console.log(accessToken);
        console.log('profile', profile);
    })
)
