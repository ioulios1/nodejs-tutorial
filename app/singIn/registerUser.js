var bcrypt = require('bcrypt-nodejs')
const pg = require('pg')

const conString = 'postgres://ioulios:1995@localhost/ioulios'

/**
 *Register user to database with encrypted password
 */
function registerUser(req, res) {
    pg.connect(conString, function(err, client, done) {
        if (err) {
            return next(err)
        }
        if (req.body.password.trim() === '' || req.body.username.trim() === '' || req.body.name.trim() === '')
            res.redirect('http://localhost:3000/register/?err=emptyFields')
        else {
            var hash = bcrypt.hashSync(req.body.password);

            client.query("SELECT username FROM usr WHERE username = $1;", [req.body.username], function(err, result) {
                if (err) {
                    console.log(err)
                    res.redirect('http://localhost:3000/register/?err=true')
                }
                if (result.rows.length == 0) {
                    client.query("INSERT INTO usr (username,password,name) VALUES ($1, $2, $3);", [req.body.username, hash, req.body.name], function(err, result) {
                        done() //this done callback signals the pg driver that the connection can be closed or returned to the connection pool

                        if (err) {
                            console.log(err)
                            res.redirect('http://localhost:3000/register/?err=true')
                        } else
                            res.redirect('http://localhost:3000');

                    })

                } else
                    res.redirect('http://localhost:3000/register/?err=usernameExists');


            })
        }
    })

}

module.exports.registerUser = registerUser