const express = require("express");
const apiroute = require("./routes/apiroute");
const mongoose = require("mongoose");
const userModel = require("./models/user");
const reittiModel = require("./models/reitti");





let app = express();

app.use(express.json());

let port = process.env.PORT || 3001;

// const mongo_user = process.env.MONGODB_USER;
// const mongo_password = process.env.MONGODB_PASSWORD;
// const mongo_url = process.env.MONGODB_URL;

mongoose.connect("mongodb+srv://kari:testaantestaan@opiframeprojekti.tvrncei.mongodb.net/?retryWrites=true&w=majority").then(
	() => console.log("Connected to mongodb"),
	(err) => console.log("Failed to connect. Reason",err)
);

mongoose.set("toJSON",{virtuals:true});


app.use("/api",apiroute);

app.listen(port);

console.log("Running in port", port);
