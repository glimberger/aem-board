const debug = require('debug')('aem-board:server')
const fs = require('fs')
const util = require('util')
const Path = require('path')

const readFile = util.promisify(fs.readFile)

// sort descending
const compareAem = (aemA, aemB) => {
  if (aemA.startDate < aemB.startDate) return 1
  if (aemA.startDate > aemB.startDate) return -1
  return 0
}

const list = (req, res, next) => {
  debug('BEGIN listing AEM ...')

  const dataPath = Path.join(__dirname, '../../static/data.json')
  debug('      reading data file %s', dataPath)

  readFile(dataPath, 'utf8')
    .then(json => {
      debug('      parsing data %s', json)
      const data = JSON.parse(json)

      res.aem = data.aem.sort(compareAem)
      next()
    })
}

module.exports = list