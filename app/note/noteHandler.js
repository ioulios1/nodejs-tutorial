const pg = require('pg')

const conString = 'postgres://ioulios:1995@localhost/ioulios'

/*
*Stores the note from the get request to DB
*/
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


/*
*Get the notes from database in html table tag format
*@req [object] : the request object from the get request
*@return cb(notes) : callback method 
*/
function getNotes(req,cb){
  var notes
  pg.connect(conString, function (err, client, done) {
    if (err) {
      return next(err)
    }

    client.query("SELECT note,created_at FROM notetions where id=$1;", [req.user.id], function (err, result) {
      done() //this done callback signals the pg driver that the connection can be closed or returned to the connection pool

      if (err) {
        console.log(err)
      }

      console.log(result.rows.length)
      if(result.rows.length==0)
      {
        notes='You dont have any notes'
        console.log(req.user.notes)
      }else
      {
        notes='<table> <tr> <th> note </th> <th> date </th> </tr>'
        for(var i=0;i<result.rows.length;i++)
        {
          notes+='<tr><td>'+result.rows[i].note+' </td><td>   '+result.rows[i].created_at+'</td></tr>'
        }
        notes+='</table>'
      }
      return cb(notes)

    })
  })

  }

module.exports.setNote=setNote
module.exports.getNotes=getNotes
