const appRoot = require('app-root-path')
const winston = require(`${appRoot}/config/winston`)
const fs = require('fs')
const util = require('util')
const Path = require('path')

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)
const unlink = util.promisify(fs.unlink)

const remove = (req,res,next) => {
  winston.debug('BEGIN deleting AEM...')

  const dataPath = Path.join(__dirname, '../../static/data.json')

  const {id} = req.params

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

      const aem = {...data.aem[entryIndex]}
      const path = aem.path

      winston.debug(`deleting entry ${entryIndex} in data collection`)
      data = {...data, aem: [...data.aem.slice(0, entryIndex), ...data.aem.slice(entryIndex+1)]}

      winston.debug(`updated data ${JSON.stringify(data)}`)

      Promise.all([
        writeFile(dataPath, JSON.stringify(data), 'utf8'),
        unlink(path)
      ])
        .then(() => {
          winston.debug('END deleting AEM')

          next()
        })
        .catch(err => next(err))
    })
    .catch(err => next(err))
}

module.exports = remove
