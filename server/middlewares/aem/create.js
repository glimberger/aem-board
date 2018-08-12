const debug = require('debug')('aem-board:server')
const fs = require('fs')
const util = require('util')
const Path = require('path')

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

const create = (req, res, next) => {
  const {path, url, id, firm, startDate, endDate, hours, days, salary} = req.body

  debug('BEGIN creating AEM ...')

  const dataPath = Path.join(__dirname, '../../static/data.json')
  debug('      reading data file %s', dataPath)

  readFile(dataPath, 'utf8')
    .then(json => {
      debug('      parsing data %s', json)
      let data = JSON.parse(json)

      const entry = {path, url, id, firm, startDate, endDate, hours, days, salary}

      const entryIndex = data.aem.findIndex(aem => {
        return aem.id === id
      })
      if (entryIndex !== -1) {
        debug('      updating entry %d in data collection', entryIndex)
        data.aem[entryIndex] = entry
      }
      else {
        debug('      adding new entry in data collection')
        data.aem.push(entry)
      }

      data = {...data, aem: data.aem}
      debug('      updated data %s', JSON.stringify(data))

      writeFile(dataPath, JSON.stringify(data), 'utf8')
        .then(() => {
          debug('      writing new data in file %s', dataPath)
          res.aem = entry
          console.log(res.aem)

          debug('END   creating AEM ...')

          next()
        })
        .catch(err => next(err))
    })
    .catch(err => next(err))
}

module.exports= create