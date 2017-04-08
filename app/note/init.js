const passport = require('passport')

function init(app){
    app.get('/notes',passport.authenticationMiddleware(),renderNote)
}


function renderNote(req,res)
{
  res.render('note/note')
}

module.exports.init=init