const passport = require('passport')

function init(app){
    //app.get('/notes',passport.authenticationMiddleware(),renderNote)
    app.get('/notes',renderNote)
}


function renderNote(req,res)
{
  res.render('note/note')
}

module.exports.init=init
