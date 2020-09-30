const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}))

//It will not authenticate with oAuth flow make it will into a user profile
router.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
        res.redirect('/surveys')
    })

//logging out of the application
router.get('/api/logout', (req, res) => {
    req.logOut()
    res.redirect('/')
})

//get the current user
router.get('/api/current-user', (req, res) => {
    res.send(req.user)      //passport attaches with the req object
})
module.exports = router