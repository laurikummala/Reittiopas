const asyncHandler = require('express-async-handler')
const Kommentti = require('../models/kommenttiModel')
const User = require('../models/userModel')

// @desc    Hae kommentit
// @route   GET /api/kommentit
// @access  Private
const haeKommentit = asyncHandler(async (req, res) => {
  const kommentit = await Kommentti.find()
  // const kommentit = await Kommentti.find({ user: req.user.id }) // jos tarvii hakea tietyn käyttäjän kommentit

  res.status(200).json(kommentit)
})

// @desc    Hae kommentti
// @route   GET /api/kommentit
// @access  Private
const haeKommentti= asyncHandler(async (req, res) => {
  const kommentti = await Kommentti.findById(req.params.id)

  if (!kommentti) {
    res.status(400)
    throw new Error('Kommenttia ei löytynyt')
  }

  res.status(200).json(kommentti)
})

// @desc    Luo kommentti
// @route   POST /api/kommentit
// @access  Private
const luoKommentti = asyncHandler(async (req, res) => {
  //console.log(req.body)
  if(!req.body.teksti) {
    console.log('ei ole tekstiä')
    // res.status(400).json({message: 'Please add a text field'})
    res.status(400)
      throw new Error('Anna kommentti')
  }

  const kommentti = await Kommentti.create({
    teksti: req.body.teksti,
    user: req.user.id,
  })

  res.status(200).json(kommentti)
})

// @desc    Päivitä kommentit
// @route   PUT /api/kommentit/:id
// @access  Private
const paivitaKommentti = asyncHandler(async (req, res) => {
  const kommentti = await Kommentti.findById(req.params.id)

  if(!kommentti) {
    res.status(400)
    throw new Error('Kommenttia ei löytynyt')
  }

  // check for user
  if(!req.user) {
    res.status(401)
    throw new Error('Käyttäjää ei löytynyt')
  }

  // make sure the logged in user matches the goal user
  if(kommentti.user.toString() !== req.user.id){
    res.status(401)
    throw new Error('Käyttäjällä ei ole valtuuksia')   
  }

  const paivitettyKommentti = await Kommentti.findByIdAndUpdate(req.params.id, req.
    body, {
    new: true,
  })

  res.status(200).json(paivitettyKommentti)
})

// @desc    Poista kommentti
// @route   DELETE /api/kommentit/:id
// @access  Private
const poistaKommentti = asyncHandler(async (req, res) => {
  const kommentti = await Kommentti.findById(req.params.id)

  if(!kommentti) {
    res.status(400)
    throw new Error('Kommenttia ei löytynyt')
  }

  // check for user
  if(!req.user) {
    res.status(401)
    throw new Error('Käyttäjää ei löytynyt')
  }

  // make sure the logged in user matches the kommentti user
  if(kommentti.user.toString() !== req.user.id){
    res.status(401)
    throw new Error('Käyttäjällä ei ole valtuuksia')   
  }

  await kommentti.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  haeKommentit,
  haeKommentti,
  luoKommentti,
  paivitaKommentti,
  poistaKommentti
}