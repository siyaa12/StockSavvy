const express = require('express');
const router = express.Router();
const { getUserCash, getUserPortfolio, getUserTransactions, setUserShare } = require('../models/stock')

router.get('/cash', async(req, res) => {
  const cash = await getUserCash(res.locals.user.email)
  res.json(cash)
})

router.get('/portfolio', async(req, res) => {
  const portfolio = await getUserPortfolio(res.locals.user.email)
  res.json(portfolio)
})

router.get('/transactions', async(req, res) => {
  const transactions = await getUserTransactions(res.locals.user.email)
  res.json(transactions)
})

router.post('/buy', async (req, res) => {
  const { symbol, quantity } = req.body
  //make sure symbol is always capital
  const response = await setUserShare(res.locals.user.email, symbol.toUpperCase(), parseInt(quantity))
  res.status(response.status).send(response.message)
})

module.exports = router