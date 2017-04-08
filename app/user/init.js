// user/init.js

const passport = require("passport")


function init(app){
    app.post('/login',passport.authenticate('local', {
         successRedirect: '/profile',
         failureRedirect: '/',
         failureFlash: true })
    );
    app.get('/profile',renderProfile)
    app.get('/',renderWelcome)
}

function renderWelcome(req,res)
{
  res.render('user/welcome')
}

function renderProfile(req,res)
{
  res.render('user/profile',{
    username : req.user.username,
    id : req.user.id
  })
}

module.exports.init=init
