const pg = require('pg')

const conString = 'postgres://ioulios:1995@localhost/ioulios'


function setNote(req,res){
  pg.connect(conString, function (err, client, done) {
    if (err) {
      return next(err)
    }

    client.query("INSERT INTO notetions (id,note) VALUES ($1, $2);", [req.user.id, req.query.note], function (err, result) {
      done() //this done callback signals the pg driver that the connection can be closed or returned to the connection pool

      if (err) {
        console.log(err)
      }

      res.redirect('http://localhost:3000/notes');

    })
  })

  }

  /*function getNotes(req,res){
    pg.connect(conString, function (err, client, done) {
      if (err) {
        return next(err)
      }

      client.query("SELECT * FROM notetions where id='$1';", [req.user.id], function (err, result) {
        done() //this done callback signals the pg driver that the connection can be closed or returned to the connection pool

        if (err) {
          console.log(err)
        }

        console.log
        if(result.rows.length==0)
        {
          req.user.notes="{username : '"+req.user.username+"', notetions : 'You dont have any notes'}"
        }else
        {
          for(var i=0;i<result.rows.length;i++)
          {

          }
        }

        res.redirect('http://localhost:3000/notes');

      })
    })

    }

  module.exports.setNote=setNote*/
  module.exports.getNotes=getNotes
