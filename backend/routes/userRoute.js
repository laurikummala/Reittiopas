const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)

module.exports = router


// const express = require("express");
// const router = express.Router();
// const jwt = require('jsonwebtoken')// lisätty suojausta varten
// const bcrypt = require('bcryptjs')// lisätty suojausta varten (hashing passwords)

// const Reitti = require("../models/reittiModel");
// const user = require("../models/userModel");
// const User = require("../models/userModel");
// const reittiModel = require("../models/reittiModel");
// const asyncHandler = require("express-async-handler")


// //Joskus userRoute ja userController laitetaan erikseen. 
// //Nyt userController tiedot alla joihin on liitetty router tiedot


// //JWT protect muuttujalla suojataan routet
// const {protect} = require('../middleware/authMiddleware')

// // REKISTERÖI UUSI KÄYTTÄJÄ
// // Insomnia POST /api/user/

// router.post("/", async(req, res) => {
// 	const {name, email, password} = req.body

// 	if(!name || !email || !password) {
// 		res.status(400).json({message: 'Täytä body-tekstit'}) //muuta teksti
// 	}

// 	//Selvitä onko käyttäjä jo rekisteröitynyt email tilin perusteella
// 	const userExists = await User.findOne({email})

// 	if(userExists) {
// 		res.status(400).json({message: 'Käyttäjä on rekisteröitynyt'})
// 		return // return lisätty MongoDB:n ohjeiden mukaan..serverin kaatumisen välttämiseksi
// 	}

// 	//hash password - generoidaan salaus
// 	const salt = await bcrypt.genSalt(10)
// 	const hashedPassword = await bcrypt.hash(password, salt)

// 	// Luo käyttäjä
// 	const user = await User.create({
// 		name,
// 		email,
// 		password: hashedPassword

// 	})
// 	// jos user ok palauttaa nämä tiedot
// 	if(user) {
// 		res.status(201).json({
// 			_id: user.id,	//_id hakee MongoDB:n oman id:n tietokannasta
// 			name: user.name,
// 			email: user.email,
// 			token: generateToken(user._id) 	//palauttettujen tietojen mukana tulee token
// 		})									//token antaa käyttöoikeudet
// 	} else {
// 		res.status(400).json({message: 'Väärät kirjautumistiedot'})
// 		return // return lisätty MongoDB:n ohjeiden mukaan..serverin kaatumisen välttämiseksi
// 	}


// 	//const registerUser = await User.create()
// 	//res.status(200).json(user) 
// 	//res.json({message: 'käyttäjä rekisteröity'})
// })

// // KÄYTTÄJÄN SISÄÄNKIRJAUTUMINEN
// // Insomnia POST /api/user/login
// router.post("/login", async(req, res) => {
// 	const {email, password} = req.body
// 	if(!email || !password) {
// 		res.status(400).json({message: 'Lisää tarvittavat tiedot'}) //muuta teksti
// 		return // return lisätty MongoDB:n ohjeiden mukaan..serverin kaatumisen välttämiseksi
// 	}

// 	//Tunnistetaan email
// 	const user = await User.findOne({email})
// 	//bcrypt.compare metodi tarkistaa onko salasana sama kuin M.DB:n hashed password
// 	if(user && (await bcrypt.compare(password, user.password))) {
// 		res.json({
// 			_id: user.id,	//_id hakee MongoDB:n oman id:n tietokannasta
// 			name: user.name,
// 			email: user.email,
// 			token: generateToken(user._id), //palauttettujen tietojen mukana tulee token
			
// 		})
// 	} else {
// 		res.status(400).json({message: 'Väärät kirjautumistiedot'})
// 		return // return lisätty MongoDB:n ohjeiden mukaan..serverin kaatumisen välttämiseksi
// 	}

// 	//res.json({message: 'Login User'})
// })

// // HAE KÄYTTÄJÄN OMAT TIEDOT
// // Insominia GET /api/user/me
// router.get("/me", protect, async(req, res) => {		//protect lisätty pääsy vain omiin tietoihin //protect, 
// 	const getMe = req.body
// 	// POISTETTU 4 TUTORIAALIN OHJEEN MUKAANN const {_id, name, email} = await User.findById(req.user.id)

// 	res.status(200).json(req.user)
// 		// muutettu 4 TUTORIAALIN OHJEEN MUKAAN
// 		//id: _id,
// 		//name,
// 		//email
// 	//})

// })

// // Generate JWT -tokeni YT(26)

// const generateToken = (id) => {		//Tokenin voi generoida muunkin kuin id:n perusteella.
// 	return jwt.sign({id}, process.env.JWT_SECRET, {		//secret löytyy .env tiedostosta. En saanu toimimaan server.js:ssä
// 		expiresIn: '30d',	//Tokenille voi ja kannattaa antaa aina voimassaoloaika
// 	})

// }






// module.exports = router;