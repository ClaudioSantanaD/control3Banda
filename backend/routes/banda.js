const express = require('express')
const router = express.Router()
const {findAllConcerts, findByCity} = require('../controllers/bandaControl')

router.get("/allConcerts", findAllConcerts)
router.get("concertByCity", findAllConcerts)

module.exports = router