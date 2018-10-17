const { MongoClient } = require('mongodb')
require('dotenv/config')

const flashCardTest = [
  { question: 'What are the six falsy Javascript values?', answer: "Zero, NaN, null, undefined, '', and false" },
  { question: 'Is food good?', answer: 'Yes it is.' },
  { question: 'Where did the three foos walk into?', answer: 'A bar.' }
]

MongoClient
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(client => {
    const db = client.db()
    const collection = db.collection('cards')
    return collection.deleteMany({})
      .then(() => collection.insertMany(flashCardTest))
      .then(() => client.close())
  })
  .catch(err => {
    console.log(err)
    process.exit(1)
  })
