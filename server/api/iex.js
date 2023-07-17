const axios = require('axios')

axios.defaults.baseURL= 'https://cloud.iexapis.com/'

const head = {
  params: {token: `sk_9ea8560c42ac4d138a471382e018b082`}
}

const getStockQuotes = (symbols) => {
  let proms = symbols.map( v=>
    axios.get(`stable/stock/${v}/quote`, head)
    .then( res=> {
      return {
        symbol: res.data.symbol,
        companyName: res.data.companyName,
        latestPrice: res.data.latestPrice,
        openPrice: res.data.open
      }
    })
    .catch( err => {
      console.log(err.response.data)
      return err.response.data
    })
  )
  return axios.all(proms)
  .then( res => {
    let dataObj = {}
    res.forEach( v=>{
      dataObj[v.symbol] = {
        ...v
      }
    })
    return dataObj
  })
  .catch( err => {
    return err
  })
}

const getStockQuote = (symbol) => {
  return axios.get(`stable/stock/${symbol}/quote`, head)
  .then( res => {
    return {
      symbol: res.data.symbol,
      companyName: res.data.companyName,
      latestPrice: res.data.latestPrice,
      openPrice: res.data.open
    }
  })
  .catch( err => {
    return {
      error: err.response.data
    }
  })
}


module.exports = { getStockQuotes, getStockQuote }