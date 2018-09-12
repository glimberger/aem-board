const appRoot = require('app-root-path')
const winston = require(`${appRoot}/config/winston`)
const Path = require('path')
const Datastore = require('nedb')

const dbPath = Path.join(__dirname, '../../db/subscription')

db = new Datastore({filename: dbPath, autoload: true})

const subscription = (req, res, next) => {
  winston.debug('BEGIN push.subscription middleware')

  const subscription = req.body

  if (!subscription.endpoint) {
    return next(new Error('Endpoint missing'))
  }

  if (!subscription.p256dh) {
    return next(new Error('P256DH key missing'))
  }

  if (!subscription.auth) {
    return next(new Error('Auth key missing'))
  }

  db.remove({ _id: 'subscription' }, {}, function (err) {
    if (err) {
      winston.debug('END push.subscription middleware')

      return next(err)
    }

    winston.debug('storing subscription')

    const docToSave = {...subscription, _id: 'subscription'}
    db.insert(docToSave, function (err, newDoc) {
      const {endpoint, p256dh, auth} = newDoc
      res.push = {endpoint, p256dh, auth}

      winston.debug('END push.subscription middleware')

      return next()
    })
  })
}

module.exports = subscription