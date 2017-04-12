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
    console.log('render note '+req.user.id)
    res.render('note/note',{
      username : req.user.username,
      notes : note
    })
  })
}

module.exports.init=init
