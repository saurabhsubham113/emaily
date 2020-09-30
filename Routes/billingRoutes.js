const express = require('express')
const router = express.Router()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const requireLogin = require('../middleware/requireLogin')

router.post('/api/stripe', requireLogin, async (req, res) => {

    const charge = await stripe.charges.create({
        amount: 500,
        currency: 'inr',
        description: '$5 for 5 surveys',
        source: req.body.id
    })

    req.user.credits += 5
    const user = await req.user.save()
    res.send(user)
})

module.exports = router