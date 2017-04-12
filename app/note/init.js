const passport = require('passport')
const noteHandler=require('./noteHandler')

function init(app){
    app.get('/notes',passport.authenticationMiddleware(),renderNote)

    app.get('/setNote',passport.authenticationMiddleware(),noteHandler.setNote)

}


function renderNote(req,res)
{
  //get the notes from the database
  noteHandler.getNotes(req,function(note){
    res.render('note/note',{
      name : req.user.name,
      notes : note
    })
  })
}

module.exports.init=init
