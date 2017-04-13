const passport=require("passport")
const register = require('./registerUser')


function init(app){
  app.post('/singin',register.registerUser)
  app.get('/register',renderRegister)
}


function renderRegister(req,res){
  var errorMsg=''
  if(req.query.err==='emptyFields')
    errorMsg='<font color="red">You have left empty fields!!!</font></br>'
  else if(req.query.err==='usernameExists')
    errorMsg='<font color="red">Username already exists. Please pick another username!!!</font></br>'
  else if(req.query.err)
    errorMsg='<font color="red">An error occured. Please try again!!!</font></br>'
  res.render('singin/register',{errMsg : errorMsg})
}

module.exports.init=init
