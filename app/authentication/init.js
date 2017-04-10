// app/authentication/init.js
'use strict'

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const pg = require('pg')
var bcrypt = require('bcrypt-nodejs')

const authenticationMiddleware = require('./middleware')

const conString = 'postgres://ioulios:1995@localhost/ioulios'

//users info struct
var user = {
  username:'',
  password:'',
  id:''
}

/**
*Search user in database
*@username string :users username
*@callback function (err,user)
*/
function findUser (username,callback){
  pg.connect(conString,function (err, client, done) {
     if (err) {
       return console.error('error fetching client from pool', err)
     }
     client.query('SELECT * from users where username = $1;',[username], function (err, result) {
       done()
       if (err) {
         return console.error('error happened during query', err)
       }

       done()
       if(result.rows.length==1)
       {
         user.username=result.rows[0].username
         user.password=result.rows[0].password
         user.id=result.rows[0].id

         console.log(user)
         return callback(null,user)
       }
       return callback(null)
       //process.exit(0)
     })


  })
}

/**
*Comprare a pasword and a hashed password
*@password string
*@hash string : hashed value of a password
*@callback function (err,result)
*/
function comparePassword(password,hash,ret){
  bcrypt.compare(password, hash, function(err, res) {
      ret(err, res)
  })
}

passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
  findUser(username, function(err, user) {
    done(err, user);
  });
});


//create strategy for login authentication
function initPassport () {
  passport.use(new LocalStrategy(
    function(username, password, done) {
      console.log(username)
      findUser(username, function (err, user) {
        comparePassword(password,user.password,function (err,res){
          if (err) {
            return done(err)
          }
          if (!user) {
            return done(null, false)
          }
          if (!res) {
            return done(null, false)
          }
          return done(null, user)
        })
      })
    }
  ))
  passport.authenticationMiddleware=authenticationMiddleware
}



module.exports= initPassport
