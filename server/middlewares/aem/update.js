const appRoot = require('app-root-path')
const winston = require(`${appRoot}/config/winston`)
const fs = require('fs')
const util = require('util')
const Path = require('path')

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

const update = (req, res,next) => {
  winston.debug('BEGIN updating AEM ...')

  const dataPath = Path.join(__dirname, '../../static/data.json')

  const {id} = req.params
  const {path, url, firm, startDate, endDate, hours, days, salary} = req.body

  readFile(dataPath, 'utf8')
    .then(json => {
      winston.debug(`parsing data in file ${dataPath}`)
      let data = JSON.parse(json)

      const entryIndex = data.aem.findIndex(aem => {
        return aem.id === id
      })

      if (entryIndex === -1) {
        return next(new Error('Failed to retrieve AEM n°'+id))
      }

      winston.debug(`updating entry ${entryIndex} in data collection`)
      const aem = {...data.aem[entryIndex]}

      const entry = {
        path: path || aem.path,
        url: url || aem.url,
        id,
        firm: firm || aem.firm,
        startDate: startDate || aem.startDate,
        endDate: endDate || aem.endDate,
        hours: hours || aem.hours,
        days: days || aem.days,
        salary: salary || aem.salary
      }

      data.aem[entryIndex] = entry

      data = {...data, aem: data.aem}
      winston.debug(`updated data ${JSON.stringify(data)}`)

      writeFile(dataPath, JSON.stringify(data), 'utf8')
        .then(() => {
          winston.debug(`writing new data in file ${dataPath}`)
          res.aem = entry

          winston.debug('END updating AEM')

          next()
        })
        .catch(err => next(err))
    })
    .catch(err => next(err))
}

module.exports = update