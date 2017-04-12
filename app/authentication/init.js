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
  username : '',
  hash : ''
}


/**
*Search user in database, if it not exist , inserts the new user
*@id : users identity name
*@callback function (err,user)
*/
function findUser (id,callback){
  pg.connect(conString,function (err, client, done) {
     if (err) {
       return console.error('error fetching client from pool', err)
     }
     client.query('SELECT * from users where id = $1;',[id], function (err, result) {
       done()
       if (err) {
         return console.error('error happened during query', err)
       }


       if(result.rows.length==1)
       {
         user.username=result.rows[0].username
         user.id=id
         user.hash=result.rows[0].password

         return callback(null,user)
       }
       return callback(null)

     })
   })
}

/*
*Register users with google account to database, if they login for the first time
*profile {object} : users info as returned by google API
*/
function registerGoogleAcc(profile,callback)
{
  pg.connect(conString,function (err, client, done) {
    console.log('insede pg.connect')
    client.query("INSERT INTO users (id,username,password) "
      +"VALUES ('"+profile.id+"', '"+profile.displayName+"', 'This account doesnt require password');"
      ,function (err, result) {
         done()
        if (err) {
          console.log(err)
        }

        user.username = profile.displayName
        user.id = profile.id

        return callback(null,user)

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
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  findUser(id, function(err, user) {
    done(err, user);
  });
});


function initPassport () {
  //implement google Strategy
  passport.use(new GoogleStrategy({
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
       findUser(profile.id, function (err, user) {
         //if the user, the google API returns, is not in the database, make a registration
         if(!user)
         {
           console.log('create user')
           registerGoogleAcc(profile,function (err,user){
             return done(err, user);
           })
         }
         return done(err, user);
       })
    }

  ))

  //implements local strategy
  passport.use(new LocalStrategy(
      function(username, password, done) {
        //check the users credentials
        findUser(username, function (err, user) {
          if (err) {
            return done(err)
          }
          if (!user) {
            return done(null, false)
          }

          //if the user exist in the database  check the password
          comparePassword(password,user.hash,function (err,res){
            if (err) {
              return done(err)
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
