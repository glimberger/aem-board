const appRoot = require('app-root-path')
const winston = require(`${appRoot}/config/winston`)

const send = (req, res) => {
  winston.debug('BEGIN pdf.send middleware')

  res.json(res.pdf)

  winston.debug('END pdf.send middleware')
}

module.exports = send