const express = require("express");
const apiroute = require("./routes/apiroute");
const userRoute = require("./routes/userRoute")
const mongoose = require("mongoose");
const cors = require("cors")
const Reitti = require("./models/reittiModel");



let app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cors())

app.use('/api/reitit', require('./routes/apiroute'))
app.use('/api/user', require('./routes/userRoute')) //lisätty userRoute 25.10.



let port = process.env.PORT || 3001;

const mongo_user = process.env.MONGODB_USERNAME;
const mongo_password = process.env.MONGODB_PASSWORD;
// const mongo_url = process.env.MONGODB_URL;

mongoose.connect(`mongodb+srv://${mongo_user}:${mongo_password}@opiframeprojekti.tvrncei.mongodb.net/reittiopasApp?retryWrites=true&w=majority`).then(
	() => console.log("Connected to mongodb"),
	(err) => console.log("Failed to connect. Reason",err)
);

//mongoose.set("toJSON",{virtuals:true});


//app.use("/api",apiroute);

app.listen(port);

console.log("Running in port", port);
