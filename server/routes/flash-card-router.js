const { Router } = require('express')

function cardsRouter(collection) {

  const router = new Router()

  router.get('/', (req, res, next) => {
    collection
      .find({})
      .toArray()
      .then(cards => res.json(cards))
      .catch(err => next(err))
  })

  return router
}

module.exports = cardsRouter
