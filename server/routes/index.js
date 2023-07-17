const express = require('express');
const router = express.Router();
const user = require('./user')
const stock = require('./stock')
const iex = require('./iex')
const { jwtAuth, readToken } = require('../auth')
const { findUser } = require('../models/user')
router.use(jwtAuth)

router.use( async (req, res, next) => {
  const token = req.headers.authorization
  if(token){
    let user = await findUser(readToken(token))
    res.locals.user = user
  }
  next()
})

router.use('/api/user', user)

router.use('/api/stock', stock)

router.use('/api/iex', iex)

router.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

router.use((err, req, res, next) => {
  console.log(res.locals)
  if (err.name === "UnauthorizedError") {
    res.status(401).json({
      message: 'invalid token',
      error: err
    });
  } else {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  }
});



module.exports = router;
