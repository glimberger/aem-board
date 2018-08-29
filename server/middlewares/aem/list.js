const debug = require('debug')('aem-board:server')
const fs = require('fs')
const util = require('util')
const Path = require('path')

const readFile = util.promisify(fs.readFile)

const compareAem = order => (aemA, aemB) => {
  if (order === 'DESC') {
    if (aemA.startDate > aemB.startDate) return -1
    if (aemA.startDate < aemB.startDate) return 1
    return 0
  }
  else {
    if (aemA.startDate > aemB.startDate) return 1
    if (aemA.startDate < aemB.startDate) return -1
    return 0
  }
}

const list = (req, res, next) => {
  debug('BEGIN listing AEM ...')

  const order = req.query.order ? req.query.order.toUpperCase() : 'ASC'

  const dataPath = Path.join(__dirname, '../../static/data.json')
  debug('      reading data file %s', dataPath)

  readFile(dataPath, 'utf8')
    .then(json => {
      debug('      parsing data %s', json)
      const data = JSON.parse(json)

      res.aem = data.aem.sort(compareAem(order))
      next()
    })
}

module.exports = list