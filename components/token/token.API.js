const express = require('express')
const { setData } = require('./controllers')

const router = express.Router()

router.post('/token/set-data', setData)

module.exports = router
