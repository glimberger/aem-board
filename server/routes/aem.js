const express = require('express')
const router = express.Router()

const {aemCreate, aemSend, aemList, aemRetrieve, aemUpdate, aemRemove} = require('../middlewares')

router.get('/', aemList, aemSend)
router.post('/', aemCreate, aemSend)

router.get('/:id', aemRetrieve, aemSend)
router.put('/:id', aemUpdate, aemSend)
router.delete('/:id', aemRemove, (req, res) => {
  res.status(204).end()
})

module.exports = router