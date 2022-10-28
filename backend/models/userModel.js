const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

    nimi: String,
    email: String // lisätään myöhemmin "unique:" jolloin eri tileihin tarvitaan eri email
    //password: String -- lisätään myöhemmin
  }, {
    timestamps: true,
  });

module.exports = mongoose.model("User",userSchema);