const express = require('express')
const { setData } = require('./controllers')

const router = express.Router()

router.get('/token/set-data', setData)

module.exports = router
