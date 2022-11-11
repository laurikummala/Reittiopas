const express = require('express')
const router = express.Router()
const {
  haeKommentit, 
  luoKommentti, 
  paivitaKommentti, 
  poistaKommentti,
} = require('../controllers/kommenttiController')

const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, haeKommentit).post(protect, luoKommentti)
router.route('/:id').put(protect, paivitaKommentti).delete(protect, poistaKommentti)


module.exports = router