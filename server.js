const express = require("express");
require('dotenv').config()

require('./services/passport')
require('./models/user')
const app = express();

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
