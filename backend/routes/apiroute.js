const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {

    res.json("Hae reitit")

    return res.status(200).json(items);
})

router.post("/", (req, res) => {

    res.json("Lisää reitti")

    return res.status(201).json(item);
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