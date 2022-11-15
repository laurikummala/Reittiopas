const asyncHandler = require('express-async-handler')
const Reitti = require('../models/reittiModel')
const User = require('../models/userModel')


// @desc    Hae reitit
// @route   GET /api/reitit
// @access  Private
const haeReitit = asyncHandler(async (req, res) => {
  const reitit = await Reitti.find()  // hakee kaikki reitit !!!
  // const reitit = await Reitti.find({ user: req.user.id })  // jos tarvii hakea tietyn käyttäjän reitit
  
  res.status(200).json(reitit)
})


// @desc    Hae reitti
// @route   GET /api/reitit
// @access  Private
const haeReitti = asyncHandler(async (req, res) => {
  const reitti = await Reitti.findById(req.params.id)
  
  if(!reitti) {
    res.status(400)
    throw new Error('Reittiä ei löytynyt')
  }

  res.status(200).json(reitti)
})


// @desc    Luo reitti
// @route   POST /api/reitit
// @access  Private
const luoReitti = asyncHandler(async (req, res) => {
  console.log(req.body)
  if(!req.body.nimi){
    console.log('ei ole annettu nimeä')
    // res.status(400).json({message: 'Please add a nimi field'})
    res.status(400)
      throw new Error('Lisää reitin nimi')  }
  if(!req.body.pituus){
    console.log('ei ole annettu pituutta')
    // res.status(400).json({message: 'Please add a nimi field'})
    res.status(400)
      throw new Error('Lisää reitin pituus')
  }  
  if(!req.body.kuvaus){
    console.log('ei ole annettu kuvausta')
    // res.status(400).json({message: 'Please add a nimi field'})
    res.status(400)
      throw new Error('Lisää reitin kuvaus')
  }

  const reitti = await Reitti.create({
    nimi: req.body.nimi,
    pituus: req.body.pituus,
    kuvaus: req.body.kuvaus,
    user: req.user.id,
    reittityypit: {melonta: req.body.melonta, pyoraily: req.body.pyoraily, vaellus: req.body.vaellus},
  })

  res.status(200).json(reitti)
})


// @desc    Päivitä reitti
// @route   PUT /api/reitit
// @access  Private
const paivitaReitti = asyncHandler(async (req, res) => {
  const reitti = await Reitti.findById(req.params.id)

  if(!reitti) {
    res.status(400)
    throw new Error('Reittiä ei löytynyt')
  }

  // check for user
  if(!req.user) {
    res.status(401)
    throw new Error('Käyttäjää ei löytynyt')
  }

  // make sure the logged in user matches the reitti user
  if(reitti.user.toString() !== req.user.id){
    res.status(401)
    throw new Error('Käyttäjällä ei ole valtuuksia')   
  }

  const paivitettyReitti = await Reitti.findByIdAndUpdate(req.params.id, req.
    body, {
    new: true,
  })

  res.status(200).json(paivitettyReitti)
})


// @desc    Poista reitti
// @route   DELETE /api/reitit
// @access  Private
const poistaReitti = asyncHandler(async (req, res) => {
  const reitti = await Reitti.findById(req.params.id)

  if(!reitti) {
    res.status(400)
    throw new Error('Reittiä ei löytynyt')
  }

  // check for user
  if(!req.user) {
    res.status(401)
    throw new Error('Käyttäjää ei löytynyt')
  }

  // make sure the logged in user matches the reitti user
  if(reitti.user.toString() !== req.user.id){
    res.status(401)
    throw new Error('Käyttäjällä ei ole valtuuksia')   
  }

  await reitti.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  haeReitit,
  haeReitti,
  luoReitti,
  paivitaReitti,
  poistaReitti
}