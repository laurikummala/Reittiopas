const express = require('express')
const router = express.Router()
const {
  haeReitit, 
  luoReitti, 
  paivitaReitti, 
  poistaReitti,
} = require('../controllers/reittiController')

const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, haeReitit)
router.route('/lisaareitti').post(protect, luoReitti)
router.route('/:id').put(protect, paivitaReitti).delete(protect, poistaReitti)


module.exports = router