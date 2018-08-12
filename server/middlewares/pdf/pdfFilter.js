const pdfFilter = (req, file, cb) => {

  const isPDF = file.mimetype === 'application/pdf'

  cb(null, isPDF)
}

module.exports = pdfFilter