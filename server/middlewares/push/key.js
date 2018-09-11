const appRoot = require('app-root-path')
const winston = require(`${appRoot}/config/winston`)
const webpPush = require('web-push')
const Path = require('path')
const Datastore = require('nedb')

const dbPath = Path.join(__dirname, '../../db/push')

db = new Datastore({filename: dbPath, autoload: true})

const key = (req, res, next) => {
  winston.debug('BEGIN push.key middleware')

  db.findOne({ _id: 'vapid' }, function (err, doc) {
    if (err) {
      winston.debug('END push.key middleware')

      return next(err)
    }

    if (doc) {
      const {publicKey} = doc
      res.push = {publicKey}

      winston.debug(`public key retrieved: ${publicKey}`)
      winston.debug('END push.key middleware')

      return next()
    }

    const vapidKeys = webpPush.generateVAPIDKeys()
    const docToSave = {
      _id: 'vapid',
      publicKey: vapidKeys.publicKey,
      privateKey: vapidKeys.privateKey
    }

    winston.debug('storing vapid keys newly generated')
    db.insert(docToSave, function (err, newDoc) {
      const {publicKey} = newDoc
      res.push = {publicKey}

      winston.debug(`public key retrieved: ${publicKey}`)
      winston.debug('END push.key middleware')

      return next()
    })
  })
}

module.exports = key