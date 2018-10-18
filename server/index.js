const express = require('express')
const { MongoClient } = require('mongodb')
const cardsRouter = require('./routes/flash-card-router.js')
require('dotenv/config')

MongoClient
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(client => {
    const db = client.db()
    const collection = db.collection('cards')

    const app = express()
    app.use(express.static('server/public'))
    app.use('/cards', cardsRouter(collection))
    app.use((err, req, res, next) => {
      console.log(err)
      process.exit(1)
    })

    app.listen(process.env.PORT)
  })
