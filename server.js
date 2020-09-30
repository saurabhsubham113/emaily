const express = require("express");
if ((process.env.NODE_ENV !== 'production')) {
    require('dotenv').config()
}

const morgan = require('morgan')
const cookieSession = require('cookie-session') //give access to cookie
const passport = require('passport') //to tell passport to use cookie

require('./models/user')
require('./services/passport')
const app = express();

//managing cookie based authentication
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [process.env.COOKIE_KEY]
    })
)
app.use(passport.initialize())
app.use(passport.session())

//for devlopment purpose
// app.use(morgan("dev"))

/*Returns middleware that only parses json and only looks at requests
 where the Content-Type header matches the type option. */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//calling Database connection
require('./services/db')

//Routes
const authRoute = require('./Routes/authRoutes')
const billingRoute = require('./Routes/billingRoutes')
app.use(authRoute)
app.use(billingRoute)

if (process.env.NODE_ENV === 'production') {
    //express will serve up production assets
    //like main.js or main.css file
    app.use(express.static('client/build'))

    //express will serve up the index.html file
    //it it doesn't recognize the route
    const path = require('path')
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

//server listening on port
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("server started on port 5000");
});
