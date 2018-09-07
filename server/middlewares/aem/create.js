const appRoot = require('app-root-path')
const winston = require(`${appRoot}/config/winston`)
const fs = require('fs')
const util = require('util')
const Path = require('path')

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

const create = (req, res, next) => {
  const {path, url, id, firm, startDate, endDate, hours, days, salary} = req.body

  winston.debug('BEGIN creating AEM...')

  const dataPath = Path.join(__dirname, '../../static/data.json')

  readFile(dataPath, 'utf8')
    .then(json => {
      winston.debug(`parsing data in file ${dataPath}`)
      let data = JSON.parse(json)

      const entry = {path, url, id, firm, startDate, endDate, hours, days, salary}

      const entryIndex = data.aem.findIndex(aem => {
        return aem.id === id
      })
      if (entryIndex !== -1) {
        winston.debug(`updating entry ${entryIndex} in data collection`)
        data.aem[entryIndex] = entry
      }
      else {
        winston.debug('adding new entry in data collection')
        data.aem.push(entry)
      }

      data = {...data, aem: data.aem}
      winston.debug(`updated data ${JSON.stringify(data)}`)

      writeFile(dataPath, JSON.stringify(data), 'utf8')
        .then(() => {
          winston.debug(`writing new data in file ${dataPath}`)
          res.aem = entry

          winston.debug('END creating AEM')

          next()
        })
        .catch(err => next(err))
    })
    .catch(err => next(err))
}

module.exports= create