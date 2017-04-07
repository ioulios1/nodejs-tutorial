//index.js

const express = require('express')
const passport = require('passport')
const session = require('express-session')
const pg = require('pg')
const pgSession = require('connect-pg-simple')(session)
const exphbs = require('express-handlebars')
const path = require('path')

const app = express()

app.use(session({
  strore : new (require('connect-pg-simple')(session))(),
  sexret : process.env.FOO_COOKIE_SECRET,
  resave : false,
  saveUninitialized : false
}))

app.use(passport.initialize())
app.use(passport.session())

app.engine('.hbs',exphbs({
  defaultLayout : 'layout',
  extname: '.hbs',
  layoutsDir: path.join(__dirname)
}))

app.set('view engine','.hbs')
app.set('views',__dirname)



module.exports = app