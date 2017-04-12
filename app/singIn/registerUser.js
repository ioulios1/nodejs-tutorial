
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
      return next(err)
    }

    var hash = bcrypt.hashSync(req.body.password);

    client.query("INSERT INTO users (id,username,password) VALUES ($1, $2, $3);", [req.body.id,req.body.name, hash], function (err, result) {
      done() //this done callback signals the pg driver that the connection can be closed or returned to the connection pool

      if (err) {
        console.log(err)
      }

      res.redirect('http://localhost:3000');

    })
  })

}

module.exports.registerUser=registerUser
