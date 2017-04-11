// user/init.js

const passport = require("passport")



function init(app){
    app.get('/auth/google',
      passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));


    app.get('/auth/google/callback',
      passport.authenticate('google', { failureRedirect: '/' }),
      function(req, res) {
        res.redirect('/profile');
      });

    app.get('/profile',renderProfile)
    app.get('/',renderWelcome)

}

function renderWelcome(req,res)
{
  res.render('user/welcome')
}

function renderProfile(req,res)
{
  /*res.render('user/profile',{
    username : req.user.username,
    id : req.user.id
  })*/
  res.render('user/profile')
}

module.exports=init
