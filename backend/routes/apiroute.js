const express = require("express");
const router = express.Router();
const Reitti = require("../models/reittiModel");
const user = require("../models/user");
const reittiModel = require("../models/reittiModel");
const asyncHandler = require("express-async-handler")




router.get("/", async (req, res) => {
	const reitti = await Reitti.find()
	
	res.status(200).json(reitti)
})

router.post("/", async (req, res) => {
	if(!req.body.text) {
		res.status(400).json({message: 'Lisää teksti'})
	}

	const reitti = await Reitti.create({
		text: req.body.text
	})

	res.status(200).json(reitti)
})

router.put("/:id", async (req, res) => {
	const reitti = await Reitti.findById(req.params.id)

	if(!Reitti) {
		res.status(400).json({message: 'Reitti ei löytynyt'})
	}

	const updatedReitti = await Reitti.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	})

	res.status(200).json(updatedReitti)
})

router.delete("/:id", async (req, res) => {
	const reitti = await Reitti.findById(req.params.id)

	if(!Reitti) {
		res.status(400).json({message: 'Reitti ei löytynyt'})
	}

	await reitti.remove()

	res.status(200).json({id: req.params.id})
})




module.exports = router;