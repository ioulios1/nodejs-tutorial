// app/authentication/init.js

'use strict'

const passport = require('passport')
const LocalStrategy = require('passport-local')
const pg = require('pg')

const conString = 'postgres://ioulios@localhost/ioulios'

var user = {
  username:'',
  password:'',
  id:''
}

// γίνετε έλεγχος αν υπάρχει ο χρήστης.
var findUser = function (username,callback){
  username='ioulio'
  pg.connect(conString,function (err, client, done) {
     if (err) {
       return console.error('error fetching client from pool', err)
     }
     client.query('SELECT username,id from users where username = $1;',[username], function (err, result) {
       done()
       if (err) {
         return console.error('error happened during query', err)
       }
       //console.log(result.rows.length)
       done()
       if(result.rows.length==1)
       {
         user.username=result.rows[0].username
         user.id=result.rows[0].id

         console.log(user)
         return callback(null,user)
       }
       return callback(null)
       //process.exit(0)
     })


  })
}

module.exports.findUser = findUser
