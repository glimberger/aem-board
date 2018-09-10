const Path = require('path')
const Datastore = require('nedb')

const dbPath = Path.join(__dirname, 'data')

db = new Datastore({filename: dbPath, autoload: true})

module.exports = db