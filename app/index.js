//index.js

const express = require('express')
const passport = require('passport')
const session = require('express-session')
const pg = require('pg')
const pgSession = require('connect-pg-simple')(session)

const app = express()
app.use(session({
  strore : new (require('connect-pg-simple')(session))(),
  sexret : process.env.FOO_COOKIE_SECRET,
  resave : false,
  saveUninitialized : false
}))

app.use(passport.initialize())
app.use(passport.session())

module.exports = app
