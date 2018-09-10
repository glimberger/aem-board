const appRoot = require('app-root-path')
const winston = require(`${appRoot}/config/winston`)
// const fs = require('fs')
// const util = require('util')

const db = require('../../db/store')

// const readFile = util.promisify(fs.readFile)
//
// const compareAem = order => (aemA, aemB) => {
//   if (order === 'DESC') {
//     if (aemA.startDate > aemB.startDate) return -1
//     if (aemA.startDate < aemB.startDate) return 1
//     return 0
//   }
//   else {
//     if (aemA.startDate > aemB.startDate) return 1
//     if (aemA.startDate < aemB.startDate) return -1
//     return 0
//   }
// }

const list = (req, res, next) => {
  winston.debug('BEGIN middleware aem.list')

  const order = req.query.order ? req.query.order.toUpperCase() : 'ASC'

  db.find({})
    .sort({startDate: (order === 'DESC' ? -1 : 1)})
    .exec( (err, docs) => {
      if (err) {
        winston.debug('END middleware aem.list')

        return next(err)
      }

      res.aem = docs

      winston.debug(`${docs.length} item(s) retrieved`)
      winston.debug('END middleware aem.list')

      return next()
    })


  // const order = req.query.order ? req.query.order.toUpperCase() : 'ASC'
  //
  // const dataPath = Path.join(__dirname, '../../static/data.json')
  //
  // readFile(dataPath, 'utf8')
  //   .then(json => {
  //     winston.debug(`parsing data in ${dataPath}`)
  //     const data = JSON.parse(json)
  //
  //     res.aem = data.aem.sort(compareAem(order))
  //
  //     winston.debug('END listing AEM')
  //
  //     next()
  //   })
}

module.exports = list