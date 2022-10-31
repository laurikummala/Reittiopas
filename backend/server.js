const express = require("express");
const reittiRoute = require("./routes/reittiRoute");
const userRoute = require("./routes/userRoute")
const mongoose = require("mongoose");
const cors = require("cors")
const Reitti = require("./models/reittiModel");
const dotenv = require('dotenv').config() 	//.env tiedostolle johon voi kerätä ympäristömuuttujat / nyt sisältää jwt:n salaisen avaimen YT(11)
											



let app = express();

//middleware = funtiot jotka toimii req.res. pyynnön sisällä
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cors())

app.use('/api/reitit', require('./routes/reittiRoute')) //nimi muutettu apiroute.js:sta 30.10
app.use('/api/user', require('./routes/userRoute')) //lisätty userRoute 25.10.



let port = process.env.PORT || 3001;

const mongo_user = process.env.MONGODB_USERNAME;
const mongo_password = process.env.MONGODB_PASSWORD;
//const mongo_url = process.env.MONGODB_URL;


mongoose.connect(`mongodb+srv://${mongo_user}:${mongo_password}@opiframeprojekti.tvrncei.mongodb.net/reittiopasApp?retryWrites=true&w=majority`).then(
	() => console.log("Connected to mongodb"),
	(err) => console.log("Failed to connect. Reason",err)
);

//mongoose.set("toJSON",{virtuals:true});




app.listen(port);

console.log("Running in port", port);
