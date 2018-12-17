var express = require('express')
var databases = require('./controller/interface')
var router = express.Router()

router.use(databases)

module.exports = router
