const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken")
const { secretKey } = require('../constants');

const jwtAuth = expressJwt({secret: secretKey})
  .unless(
    { 
      path: 
      [
        "/api/user/login", 
        "/api/user/register",
        "/api/iex/quotes",
        "/api/iex/quote"
      ]
    }
  ); 

const getToken = (email) =>{
  return jwt.sign({
    name: email
  }, secretKey, {
    expiresIn: 360000
  })
}

const readToken = (token) => {
  return jwt.verify(token.replace('Bearer ', ''), secretKey, (err, decoded) => {
    if(err)
      throw err
    return decoded.name
  })
}

module.exports = {jwtAuth, getToken, readToken};
