const debug = require('debug')('aem-board:server')
const fs = require('fs')
const util = require('util')
const Path = require('path')

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)
const unlink = util.promisify(fs.unlink)

const remove = (req,res,next) => {
  debug('BEGIN deleting AEM ...')

  const dataPath = Path.join(__dirname, '../../static/data.json')
  debug('      reading data file %s', dataPath)

  const {id} = req.params

  readFile(dataPath, 'utf8')
    .then(json => {
      debug('      parsing data %s', json)
      let data = JSON.parse(json)

      const entryIndex = data.aem.findIndex(aem => {
        return aem.id === id
      })

      if (entryIndex === -1) {
        return next(new Error('Failed to retrieve AEM n°'+id))
      }

      const aem = {...data.aem[entryIndex]}
      const path = aem.path

      debug('      deleting entry %d in data collection', entryIndex)
      data = {...data, aem: [...data.aem.slice(0, entryIndex), ...data.aem.slice(entryIndex+1)]}

      debug('      updated data %s', JSON.stringify(data))

      Promise.all([
        writeFile(dataPath, JSON.stringify(data), 'utf8'),
        unlink(path)
      ])
        .then(() => {
          debug('END   deleting AEM')

          return next()
        })
        .catch(err => next(err))
    })
    .catch(err => next(err))
}

module.exports = remove
