const express = require("express");
require('dotenv').config()

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


/*Returns middleware that only parses json and only looks at requests
 where the Content-Type header matches the type option. */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//calling Database connection
require('./services/db')

//Routes
const authRoute = require('./Routes/authRoutes')
app.use(authRoute)

//server listening on port
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("server started on port 5000");
});
