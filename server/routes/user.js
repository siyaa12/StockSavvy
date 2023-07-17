const express = require('express');
const router = express.Router();
const { login, register } = require('../models/user')
const { getToken } = require('../auth')
const { findUser } = require('../models/user')

router.get('/', (req, res) => {
  res.json(res.locals.user)
})

router.post('/login', (req, res) => {
  const { email, password } = req.body
  login(email, password)
  .then( message => {
    res.json({
      success: message,
      token: getToken(email),
      user: findUser(email)
    })  
  })
  .catch( e => {
    res.status(409).send(`Error: ${e}`)
  })
})

router.post('/register', (req, res, next) => {
  const { email, name, password } = req.body
  register(email, name, password)
  .then( message => {
    res.json({
      success: message,
      token: getToken(email),
      user: findUser(email)
    })
  })
  .catch( e => {
    res.status(409).send(`Error: ${e}`)
  })
})

module.exports = router;
