const express = require('express')
const router = express.Router()

const { pdfMulter, pdfExtract, pdfSend } = require('../middlewares')

router.get('/', (req, res) => {
  res.send('respond with a resource')
});

router.post('/', pdfMulter, pdfExtract, pdfSend)

module.exports = router