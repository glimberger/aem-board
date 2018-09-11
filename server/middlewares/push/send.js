const appRoot = require('app-root-path')
const winston = require(`${appRoot}/config/winston`)

const send = (req, res) => {
  winston.debug('BEGIN push.send middleware')

  res.json(res.push)
  winston.debug(`send push: ${JSON.stringify(res.push)}`)

  winston.debug('END push.send middleware')
}

module.exports = send