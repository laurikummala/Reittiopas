const express = require("express");
const router = express.Router();
const Reitti = require("../models/reittiModel");
const User = require("../models/userModel");
//const user = require("../models/userModel");
//const reittiModel = require("../models/reittiModel");
//const asyncHandler = require("express-async-handler")

//JWT protect muuttujalla suojataan routet
const {protect} = require('../middleware/authMiddleware')

//HAE KAIKKI REITIT ei suojattu route
router.get("/", async (req, res) => {
	const reitti = await Reitti.find()  
	
	res.status(200).json(reitti)
})

//LISÄÄ REITTI
router.post("/", protect, async (req, res) => {			//protect lisätty suojaamaan route
		
	if(!req.body) {
		res.status(400).json({message: 'Lisää teksti'})
		return // return lisätty MongoDB:n ohjeiden mukaan..serverin kaatumisen välttämiseksi
	}

	const reitti = await Reitti.create({
		nimi: req.body.nimi,
		pituus: req.body.pituus,
		kuvaus: req.body.kuvaus,
		user: req.user.id	//user: req.body.user aiemmin, nyt liitetään user-tiedot tehtyyn reittiin
	})

	res.status(200).json(reitti)
})

//MUOKKAA REITTI

router.put("/:id", protect, async (req, res) => {		//protect lisätty suojaamaan reitti
	const reitti = await Reitti.findById(req.params.id)	//ennen (req.user.id)

	if(!Reitti) {
		res.status(400).json({message: 'Reitti ei löytynyt'})
		return // return lisätty MongoDB:n ohjeiden mukaan..serverin kaatumisen välttämiseksi
	}

	const user = await User.findById(req.user.id)

	//tarkista käyttäjä
	if(!req.user) {
		res.status(401).json({message: 'Käyttäjää ei löytynyt'})
		return // return lisätty MongoDB:n ohjeiden mukaan..serverin kaatumisen välttämiseksi
	}
	//Tarkistetaan että sisäänkirjautunut käyttäjä on sama kuin reitin tekijä
	if(reitti.user.toString() !== req.user.id) {		//vaihderttu user.id
		res.status(401).json({message: 'Käyttäjällä ei ole oikeuksia muokata tietoja'})
		return // return lisätty MongoDB:n ohjeiden mukaan..serverin kaatumisen välttämiseksi
	}

	const updatedReitti = await Reitti.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	})

	res.status(200).json(updatedReitti)
})

//HAE KÄYTTÄJÄN OMAT REITIT

router.get("/:id", protect, async (req, res) => {			//protect lisätty reitin suojaamiseksi
	const reitti = await Reitti.find({user: req.user.id})	// ennen findById(req.params.id)

	if(!Reitti) {
		res.status(400).json({message: 'Reitti ei löytynyt'})
		return // return lisätty MongoDB:n ohjeiden mukaan..serverin kaatumisen välttämiseksi
	}

	
	res.status(200).json(reitti)
})

//POISTA REITTI

router.delete("/:id", protect, async (req, res) => {		//protect lisätty reitin suojaamiseksi
	const reitti = await Reitti.findById(req.params.id)

	if(!Reitti) {
		res.status(400).json({message: 'Reitti ei löytynyt'})
		return // return lisätty MongoDB:n ohjeiden mukaan..serverin kaatumisen välttämiseksi
	}

	//const user = await Reitti.findById(req.user.id)

	//tarkista käyttäjä
	if (!req.user) {						// lisätty req.
		res.status(401).json({message: 'Käyttäjää ei löytynyt'})
		return // return lisätty MongoDB:n ohjeiden mukaan..serverin kaatumisen välttämiseksi
	}
	//Tarkista että sisäänkirjautunut käyttäjä on sama kuin reitin tekijä
	if (reitti.user.toString() !== req.user.id) {			//lisätty req.
		res.status(401).json({message: 'Käyttäjällä ei ole oikeuksia poistaa tietoja'})
		return // return lisätty MongoDB:n ohjeiden mukaan..serverin kaatumisen välttämiseksi
	}
	

	await reitti.remove()

	res.status(200).json({id: req.params.id})
})




module.exports = router;