const pdfMulter = require('./pdf/multer')
const pdfExtract = require('./pdf/extract')
const pdfSend = require('./pdf/send')

const aemCreate = require('./aem/create')
const aemSend = require('./aem/send')
const aemList = require('./aem/list')
const aemRetrieve = require('./aem/retrieve')
const aemUpdate = require('./aem/update')
const aemRemove = require('./aem/remove')

module.exports = {
  pdfMulter,
  pdfExtract,
  pdfSend,
  aemCreate,
  aemSend,
  aemList,
  aemRetrieve,
  aemUpdate,
  aemRemove
}