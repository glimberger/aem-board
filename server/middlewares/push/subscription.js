const appRoot = require('app-root-path')
const winston = require(`${appRoot}/config/winston`)
const Path = require('path')
const Datastore = require('nedb')

const dbPath = Path.join(__dirname, '../../db/push')

db = new Datastore({filename: dbPath, autoload: true})

const subscription = (req, res, next) => {
  winston.debug('BEGIN push.subscription middleware')

  const subscription = req.body
  console.log('subscription', subscription)

  if (!subscription.endpoint) {
    return next(new Error('Endpoint missing'))
  }

  if (!subscription.p256dh) {
    return next(new Error('P256DH key missing'))
  }

  if (!subscription.auth) {
    return next(new Error('Auth key missing'))
  }

  db.findOne({ _id: 'subscription' }, function (err, doc) {
    if (err) {
      winston.debug('END push.subscription middleware')

      return next(err)
    }

    if (doc) {
      winston.debug('updating subscription')

      db.update({ _id: 'subscription' }, subscription, {}, function (err) {
        if (err) {
          winston.debug('END push.subscription middleware')

          return next(err)
        }

        res.push = subscription

        winston.debug('END push.subscription middleware')

        return next()
      })
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