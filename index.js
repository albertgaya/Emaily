const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const { MongoStore } = require('connect-mongo')
const keys = require('./config/keys')
require('./models/User')
require('./services/passport')

mongoose.connect(keys.mongoURI)

const app = express()

app.use(session({
    secret: keys.sessionKey,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: keys.mongoURI }),
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
}))
app.use(passport.initialize())
app.use(passport.session())

require('./routes/authRoutes')(app)

const PORT = process.env.PORT || 5000
app.listen(PORT)
