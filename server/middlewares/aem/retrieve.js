const debug = require('debug')('aem-board:server')
const fs = require('fs')
const util = require('util')
const path = require('path')

const readFile = util.promisify(fs.readFile)

const retrieve = (req, res,next) => {
  debug('BEGIN retrieving AEM ...')

  const dataPath = path.join(__dirname, '../../static/data.json')
  debug('      reading data file %s', dataPath)

  const {id} = req.params

  readFile(dataPath, 'utf8')
    .then(json => {
      debug('      parsing data %s', json)
      const data = JSON.parse(json)

      res.aem = data.aem.find(aem => {
        return aem.id === id
      })
      debug('     res.aem=%s', JSON.stringify(res.aem))
      next()
    })
    .catch(err => next(err))
}

module.exports = retrieve