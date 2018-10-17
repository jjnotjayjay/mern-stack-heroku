const express = require('express')
const { MongoClient } = require('mongodb')
require('dotenv/config')

const app = express()

app.use(express.static('server/public'))

app.get('/cards', (req, res) => {
  MongoClient
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
    .then(client => {
      const db = client.db()
      const collection = db.collection('cards')
      collection
        .find({})
        .toArray()
        .then(cards => res.json(cards))
    })
    .catch(err => {
      console.log(err)
      process.exit(1)
    })
})

app.listen(3000)
