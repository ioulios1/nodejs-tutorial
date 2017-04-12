/*
*Middleware for authentication that passes to the next function
*/
function authenticationMiddleware () {
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/')
  }
}

module.exports = authenticationMiddleware
