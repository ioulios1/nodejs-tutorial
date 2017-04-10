// app/authentication/init.js

'use strict'

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const pg = require('pg')
var bcrypt = require('bcrypt-nodejs')

const authenticationMiddleware = require('./middleware')

const conString = 'postgres://ioulios:1995@localhost/ioulios'

var user = {
  username:'',
  password:'',
  id:''
}

// γίνετε έλεγχος αν υπάρχει ο χρήστης.
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
       //console.log(result.rows.length)
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

function comparePassword(password,hash,ret){
  bcrypt.compare(password, hash, function(err, res) {
      console.log('comparison res '+res+" ---- "+err)
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



function initPassport () {
  passport.use(new LocalStrategy(
    function(username, password, done) {
      console.log(username)
      findUser(username, function (err, user) {
        comparePassword(password,user.password,function (err,res){
          //console.log('user credentials->'+username+"====="+password+'\n')
          console.log('Invalid password! '+res)
          if (err) {
            return done(err)
          }
          if (!user) {
            console.log('User not found!')
            return done(null, false)
          }
          if (!res) {
            console.log('Invalid password! '+res)
            return done(null, false)
          }
          console.log('Authentication succeeded!')
          return done(null, user)
        })
      })
    }
  ))
  passport.authenticationMiddleware=authenticationMiddleware
}



module.exports= initPassport
