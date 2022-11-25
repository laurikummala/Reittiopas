const express = require('express')
const router = express.Router()
const {
  haeReitit,
  haeKaikkiReitit,
  haeReitti,
  luoReitti, 
  paivitaReitti, 
  poistaReitti,
} = require('../controllers/reittiController')

const {protect} = require('../middleware/authMiddleware')

router.route('/').get(haeKaikkiReitit).get(protect, haeReitit).post(protect, luoReitti)
router.route('/:id').get(protect, haeReitti).put(protect, paivitaReitti).delete(protect, poistaReitti)


module.exports = router