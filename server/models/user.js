const { getDB, Decimal128 } = require('../db')
const { md5, defaultCash } = require('../constants')

const login = async (email, password) => {
  try { 
    let res = await getDB().collection('users')
    .findOne({
      $and: [{
        email: email
      },{
        password: md5(password)
      }]
    })
    if(!res){
      throw `Email and Password Does not Match!`
    }
    return `Email ${email} is successfully logged in`
  } catch (e) {
    throw e
  }
}

const register = async (email, name, password) => {
  try {
    let users = await getDB().collection('users')
    let res = await users
    .findOne({
      email: email
    })
    if(res){
      throw `Email Address ${email} is already taken`
    } else {
      users.insertOne({
        name: name,
        email: email,
        password: md5(password),
        cash: Decimal128.fromString(defaultCash),
        portfolio: {},
        transactions: []
      })
      return `Email ${email} is successfully registered`
    }
  } catch (e) {
    throw e
  }
}

const findUser = async (email) => {
  try {
    let users = await getDB().collection('users')
    let res = await users
    .aggregate([
      {$match: {
        email: email
      }},
      {$project: {
        email: 1,
        name: 1
      }}
    ]).toArray()
    if(!res){
      throw `Not found!`
    } else {
      return res[0]
    }
  } catch (e) {
    throw e
  }
}



module.exports = { login, register, findUser }