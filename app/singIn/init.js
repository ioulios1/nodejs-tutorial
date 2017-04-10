const passport=require("passport")
const register = require('./registerUser')


function init(app){
  app.post('/singin',register.registerUser)
  app.get('/register',renderRegister)
}


function renderRegister(req,res){
  res.render('singin/register')
}

module.exports.init=init
