const express = require("express");
const reitti = require("../models/reitti");
const user = require("../models/user");
const reittiModel = require("../models/reitti");

const router = express.Router();

router.get("/", (req, res) => {

    let query = {"user":req.session.user}
	reittiModel.find(query,function(err,reitit) {
		if(err) {
			console.log("Failed to find items. Reason",err);
			return res.status(500).json({message:"Internal server error"})
		}
		return res.status(200).json(reitit);
	})
});

router.post("/", (req, res) => {

    if(!req.body) {
		return res.status(400).json({message:"Bad request"});
	}
	if(!req.body.type) {
		return res.status(400).json({message:"Bad request"});
	}
	let reitti = new reittiModel({
		id:req.body.id,
		nimi:req.body.nimi,
		pituus:req.body.pituus,
		kuvaus:req.session.kuvaus
	})
	reitti.save(function(err) {
		if(err) {
			console.log("Failed to create item. Reason",err);
			return res.status(500).json({message:"Internal server error"})
		}
		return res.status(201).json({message:"Created"});
	})
})

router.delete("/:id", (req, res) => {

    res.json("Poista reitti")

    return res.status(200).json({ message: "Success" });
})

router.put("/:id", (req, res) => {

    res.json("Muokkaa reitti")

    return res.status(200).json({ message: "Success" });
})

module.exports = router;