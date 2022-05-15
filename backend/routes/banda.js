const express = require('express')
const router = express.Router()
const {findCityConcerts, findByCity} = require('../controllers/bandaControl')

router.get("/cityWithConcerts", findCityConcerts)
router.get("/concertsByCity", findByCity)

module.exports = router