const multer = require('multer') // middleware for handling multipart/form-data

const destination = require('./destination')
const filename = require('./filename')
const pdfFilter = require('./pdfFilter')

/**
 * Sets destination and filename of the uploaded file, filters pdf file.
 *
 * @see middlewares/pdf/multer
 *
 * @type {*|DiskStorage}
 */
const storage = multer.diskStorage({destination, filename})

module.exports = multer({storage: storage, fileFilter: pdfFilter}).single('aem')