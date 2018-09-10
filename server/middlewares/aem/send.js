const appRoot = require('app-root-path')
const winston = require(`${appRoot}/config/winston`)

const send = (req, res) => {
  winston.debug('BEGIN aem.send middleware')

  res.json(res.aem)

  winston.debug('END aem.send middleware')
}

module.exports = send