// app/authentication/init.js
'use strict'

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const pg = require('pg')
const bcrypt = require('bcrypt-nodejs')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

const GOOGLE_CLIENT_ID = '44633740833-dgb60aa7tpbjlea2l2ol22bqsqgenb08.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET = 'FcMBou4P-6eIlHDsv88CGepK'

const authenticationMiddleware = require('./middleware')

const conString = 'postgres://ioulios:1995@localhost/ioulios'

//users info struct
var user = {
  id : '',
  name : {
    givenName:'',
    familyName:'',
  }
}


/**
*Search user in database, if it not exist , inserts the new user
*@profil [object] :users info as returned by google API
*@callback function (err,user)
*/
function findUser (profile,callback){
  pg.connect(conString,function (err, client, done) {
     if (err) {
       return console.error('error fetching client from pool', err)
     }
     client.query('SELECT * from google_users where id = $1;',[profile.id], function (err, result) {
       done()
       if (err) {
         return console.error('error happened during query', err)
       }


       if(result.rows.length==1)
       {
         user.name.givenName=profile.name.givenName
         user.name.familyName=profile.name.familyName
         user.id=profile.id

         return callback(null,user)
       }else if(result.rows.length==0)
       {
         client.query('INSERT INTO google_users (id,family_name,given_name) VALUES ($1, $2, $3);', [profile.id,profile.name.familyName,profile.name.givenName], function (err, result) {
           if (err) {
             // pass the error to the express error handler
             console.log(err)
             //return next(err)
           }

           user.name.givenName=profile.name.givenName
           user.name.familyName=profile.name.familyName
           user.id=profile.id

         })
         done() //this done callback signals the pg driver that the connection can be closed or returned to the connection pool
         return callback(null,user)
       }
       return callback(null)
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
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  findUser(user, function(err, user) {
    done(err, user);
  });
});


function initPassport () {
  passport.use(new GoogleStrategy({
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
         findUser(profile, function (err, user) {
           return done(err, user);
         });
    }
  ))
}



module.exports= initPassport
