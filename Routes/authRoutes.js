const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}))

//It will not authenticate with oAuth flow make it will into a user profile
router.get('auth/google/callback', passport.authenticate('google'))

module.exports = router