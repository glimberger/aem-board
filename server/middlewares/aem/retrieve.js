const appRoot = require('app-root-path')
const winston = require(`${appRoot}/config/winston`)
// const fs = require('fs')
// const util = require('util')
// const path = require('path')

// const readFile = util.promisify(fs.readFile)

const db = require('../../db/store')

const retrieve = (req, res, next) => {
  winston.debug('BEGIN middleware aem.retrieve')

  const {id} = req.params

  db.findOne({id: id}, (err, doc) => {
    if (err) {
      return next(err)
    }

    res.aem = doc
    
    winston.debug(`END middleware aem.retrieve`)

    return next()
  })

  // winston.debug('BEGIN retrieving AEM ...')
  //
  // const dataPath = path.join(__dirname, '../../static/data.json')
  //
  // const {id} = req.params
  //
  // readFile(dataPath, 'utf8')
  //   .then(json => {
  //     winston.debug(`parsing data in file ${dataPath}`)
  //     const data = JSON.parse(json)
  //
  //     res.aem = data.aem.find(aem => {
  //       return aem.id === id
  //     })
  //
  //     winston.debug(`res.aem=${JSON.stringify(res.aem)}`)
  //
  //     winston.debug('END retrieving AEM')
  //
  //     next()
  //   })
  //   .catch(err => next(err))
}

module.exports = retrieve