const appRoot = require('app-root-path')
const winston = require(`${appRoot}/config/winston`)
// const fs = require('fs')
// const util = require('util')

const db = require('../../db/store')

// const readFile = util.promisify(fs.readFile)
// const writeFile = util.promisify(fs.writeFile)

const create = (req, res, next) => {
  const aem = req.body

  winston.debug('BEGIN middleware aem.create')

// check if the current AEM is already persisted
  db.findOne({id: aem.id}, (err, doc) => {
    if (err) {
      winston.debug('END middleware aem.create')

      return next(err)
    }

    if (doc) {
      // update
      winston.debug(`AEM n°${aem.id} already persisted - updating AEM`)

      db.update({_id: doc._id}, aem, {returnUpdatedDocs: true}, (err, numAffected, affectedDocuments) => {
        if (err) {
          winston.debug('END middleware aem.create')

          return next(err)
        }

        res.aem = affectedDocuments

        winston.debug(`AEM ${doc._id} updated: ${JSON.stringify(affectedDocuments)}`)
        winston.debug('END middleware aem.create')

        return next()
      })
    }
    else {
      // creation
      db.insert(aem, function (err, newDoc) {
        if (err) {
          winston.debug('END middleware aem.create')

          return next(err)
        }

        res.aem = newDoc

        winston.debug(`AEM inserted: ${JSON.stringify(newDoc)}`)
        winston.debug('END middleware aem.create')

        return next()
      })
    }
  })

  // const {path, url, id, firm, startDate, endDate, hours, days, salary} = req.body
  //
  // const dataPath = Path.join(__dirname, '../../static/data.json')
  //
  // readFile(dataPath, 'utf8')
  //   .then(json => {
  //     winston.debug(`parsing data in file ${dataPath}`)
  //     let data = JSON.parse(json)
  //
  //     const entry = {path, url, id, firm, startDate, endDate, hours, days, salary}
  //
  //     const entryIndex = data.aem.findIndex(aem => {
  //       return aem.id === id
  //     })
  //     if (entryIndex !== -1) {
  //       winston.debug(`updating entry ${entryIndex} in data collection`)
  //       data.aem[entryIndex] = entry
  //     }
  //     else {
  //       winston.debug('adding new entry in data collection')
  //       data.aem.push(entry)
  //     }
  //
  //     data = {...data, aem: data.aem}
  //     winston.debug(`updated data ${JSON.stringify(data)}`)
  //
  //     writeFile(dataPath, JSON.stringify(data), 'utf8')
  //       .then(() => {
  //         winston.debug(`writing new data in file ${dataPath}`)
  //         res.aem = entry
  //
  //         winston.debug('END creating AEM')
  //
  //         next()
  //       })
  //       .catch(err => next(err))
  //   })
  //   .catch(err => next(err))
}

module.exports= create