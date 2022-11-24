const express = require('express')
const router = express.Router()
const {
  haeReitit,
  haeReitti,
  luoReitti, 
  paivitaReitti, 
  poistaReitti,
} = require('../controllers/reittiController')

const {protect} = require('../middleware/authMiddleware')

// router.route('/kaikki').get(haeReitit)
router.route('/').get(protect, haeReitit).post(protect, luoReitti)
router.route('/:id').get(protect, haeReitti).put(protect, paivitaReitti).delete(protect, poistaReitti)


module.exports = router