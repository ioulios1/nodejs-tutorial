// user/init.js

const passport = require("passport")



function init(app){

    app.post('/login',passport.authenticate('local', {
         successRedirect: '/profile',
         failureRedirect: '/',
         failureFlash: true })
    );

    app.get('/profile',passport.authenticationMiddleware(),renderProfile)

    app.get('/',renderWelcome)


    //calls to google+ API
      app.get('/auth/google',
        passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));


      app.get('/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/' }),
        function(req, res) {
          res.redirect('/profile');
        });


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

module.exports=init
