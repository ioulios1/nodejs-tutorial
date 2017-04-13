// user/init.js

const passport = require("passport")



function init(app){

    app.post('/login',passport.authenticate('local', {
         successRedirect: '/profile',
         failureRedirect: '/?err=wrongCredentials'
        })
    );

    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });

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
  var errorMsg=''
  if(req.query.err==='wrongCredentials')
    errorMsg='<font color="red">Wrong username or password!!!</font></br>'
  res.render('user/welcome',{errMsg : errorMsg})
}

function renderProfile(req,res)
{
  res.render('user/profile',{
    name : req.user.name,
    username : req.user.username
  })
}

module.exports=init
