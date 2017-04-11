
var bcrypt = require('bcrypt-nodejs')
const pg = require('pg')

const conString = 'postgres://ioulios:1995@localhost/ioulios'

/**
*Register user to database with encrypted password
*/
function registerUser(req,res)
{
  pg.connect(conString, function (err, client, done) {
    if (err) {
      // pass the error to the express error handler
      return next(err)
    }

    var hash = bcrypt.hashSync(req.body.password);

    client.query("INSERT INTO users (id,username,password,acc_type) VALUES ($1, $2, $3,'noProvider');", [req.body.id,req.body.name, hash], function (err, result) {
      done() //this done callback signals the pg driver that the connection can be closed or returned to the connection pool

      if (err) {
        // pass the error to the express error handler
        console.log(err)
        //return next(err)
      }

      res.redirect('http://localhost:3000');

    })
  })

}

module.exports.registerUser=registerUser
