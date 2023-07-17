import axios from 'axios'

axios.defaults.baseURL= '/api'

export const getStockQuotes = (symbols) =>{
  const queries = symbols.join('&')
  return axios.get(`/iex/quotes?${queries}`)
  .then( res => {
    return res.data
  })
  .catch( err => {
    throw err
  })
}

export const getStockQuote = (symbol) =>{
  return axios.get(`/iex/quote?symbol=${symbol}`)
  .then( res => {
    return res.data
  })
  .catch( err => {
    throw err
  })
}
