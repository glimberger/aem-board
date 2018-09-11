const express = require('express')
const router = express.Router()

const {pushKey, pushSubscription, pushSend} = require('../middlewares')

router.get('/key', pushKey, pushSend)
router.post('/subscription', pushSubscription, pushSend)

module.exports = router