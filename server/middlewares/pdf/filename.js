/**
 * Sets the file name.
 *
 * @see middlewares/sample/multer
 *
 * @param req
 * @param file
 * @param cb
 */
const filename = (req, file, cb) => {
  const filename = file.originalname

  cb(null, filename)
}

module.exports = filename