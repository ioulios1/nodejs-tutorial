const passport = require('passport')
const noteHandler=require('./noteHandler')

function init(app){
    app.get('/notes',passport.authenticationMiddleware(),renderNote)

    app.get('/setNote',passport.authenticationMiddleware(),noteHandler.setNote)

}


function renderNote(req,res)
{
  //noteHandler.getNotes
  //console.log('render note '+req.user.notes)
  res.render('note/note',req.user.notes)
}

module.exports.init=init
