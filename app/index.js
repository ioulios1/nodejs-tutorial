//app/index.js

const express = require('express')
const passport = require('passport')
const session = require('express-session')
const pg = require('pg')
const pgSession = require('connect-pg-simple')(session)
const exphbs = require('express-handlebars')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()

require('./authentication').init(app)

app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(session({
  strore : new pgSession({
  conString : 'postgres://ioulios:1995@localhost/ioulios'
}),
  secret : 'secretMessage',
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

require('./user').init(app)

module.exports = app
