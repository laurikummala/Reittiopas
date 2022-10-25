const express = require("express");
const router = express.Router();
const Reitti = require("../models/reittiModel");
const user = require("../models/userModel");
const User = require("../models/userModel");
const reittiModel = require("../models/reittiModel");
const asyncHandler = require("express-async-handler")




router.get("/", async (req, res) => {
	const user = await User.find()
	
	res.status(200).json(user)
})

router.post("/", async (req, res) => {
		
	if(!req.body) {
		res.status(400).json({message: 'Lisää käyttäjätiedot'})
	}

	const user = await User.create({
		nimi: req.body.nimi,
		email: req.body.email
        //password: req.body.password
	})

	res.status(200).json(user)
})

router.put("/:id", async (req, res) => {
	const user = await User.findById(req.params.id)

	if(!User) {
		res.status(400).json({message: 'Käyttäjää ei löytynyt'})
	}

	const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	})

	res.status(200).json(updatedUser)
})

router.delete("/:id", async (req, res) => {
	const user = await User.findById(req.params.id)

	if(!User) {
		res.status(400).json({message: 'Käyttäjä ei löytynyt'})
	}

	await user.remove()

	res.status(200).json({id: req.params.id})
})




module.exports = router;