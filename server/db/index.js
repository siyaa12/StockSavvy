const { MongoClient, Decimal128} = require('mongodb')

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/ttp-test';

let _db

const connectDB = (cb) => {
  try {
    MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
      _db = db.db()
      return cb(err)
    })
  } catch (err) {
    throw err
  }
}

const getDB = () => _db

const disconnectDB = () => _db.close()

module.exports = {connectDB, getDB, disconnectDB, Decimal128}
