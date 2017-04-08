// app/authentication/init.js

'use strict'

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const pg = require('pg')

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

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  findUser(id, function(err, user) {
    done(err, user);
  });
});



const init=function initPassport () {
  passport.use(new LocalStrategy(
    function(username, password, done) {
      username='ioulios'
      password='1234'
      console.log(username)
      findUser(username, function (err, user) {
        console.log('user credentials->'+username+"====="+password+'\n')
        if (err) {
          return done(err)
        }
        if (!user) {
        //if(typeof user === 'undefined'){
          return done(null, false)
        }
        if (password !== user.password) {
          console.log('pass-> '+user.password+' ======= '+password)
          return done(null, false)
        }
        console.log('authentication succeeded')
        return done(null, user)
      })
    }
  ))
  passport.authenticationMiddleware=authenticationMiddleware
}



module.exports= init
