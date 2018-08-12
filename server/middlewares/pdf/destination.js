const path = require('path')

/**
 * Set the uploaded file destination.
 *
 * @see middlewares/pdf/multer
 *
 * @param req
 * @param file
 * @param cb
 */
const destination = (req, file, cb) => {

  let dir = path.join(__dirname, '../../static/pdf')

  cb(null, dir)
}

module.exports = destination
