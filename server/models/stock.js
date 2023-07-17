const { getDB, Decimal128 } = require('../db')
const { getStockQuote } = require('../api/iex')

const getUserCash = async (email) => {
  try { 
    let res = await getDB().collection('users')
    .findOne({email: email})
    if(!res){
      throw `Error getting cash`
    }
    return parseFloat(res.cash.toString())
  } catch (e) {
    throw e
  }
}

const getUserPortfolio = async (email) => {
  try {
    let res = await getDB().collection('users')
    .findOne({email: email})
    if(!res){
      throw `Error getting portfolio`
    }
    return res.portfolio
  } catch (e) {
    throw e
  }
}

const getUserTransactions = async (email) => {
  try {
    let res = await getDB().collection('users')
    .findOne({email: email})
    if(!res){
      throw `Error getting transactions`
    }
    return res.transactions.map(v=>{
      v.price = v.price.toString()
      return v
    })
  } catch (e) {
    throw e
  }
}

const setUserShare = async(email, symbol, qty) => {
  try {
    const quote = await getStockQuote(symbol)
    const totalPriceMinus = Decimal128.fromString(`${-(qty * quote.latestPrice).toFixed(2)}`)
    const totalPricePlus = Decimal128.fromString(`${(qty * quote.latestPrice).toFixed(2)}`)
    if(quote !== "Unknown symbol"){
      await getDB().collection('users').updateOne({
        email: email
        }, {
          $inc: {
            [`portfolio.${symbol}`]: qty,
            cash: totalPriceMinus
          }
        })
      await setTransactionHistory(email, symbol, qty, totalPricePlus)
      return {
        status: 200,
        message: 'Success'
      }
    } else {
      throw `quote not found`
    }
  } catch (e) {
    console.log(e)
    return {
      status: 401,
      message: e
    }
  }
}

const setTransactionHistory = async(email, symbol, qty, price) => {
  try{
    await getDB().collection('users').updateOne({
      email: email
      }, {
        $push: {
          transactions: {
            type: 'buy',
            date: new Date(),
            symbol: symbol,
            qty: qty,
            price: price,
          }
        }
      })
  } catch (e) {
    throw e
  }
}
module.exports = { getUserCash, getUserPortfolio, getUserTransactions, setUserShare }