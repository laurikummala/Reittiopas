const path = require('path');
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 3001;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/reitit', require('./routes/reittiRoute'));
app.use('/api/users', require('./routes/userRoute'));

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));





// const express = require("express");
// const reittiRoute = require("./routes/reittiRoute");
// const userRoute = require("./routes/userRoute")
// const mongoose = require("mongoose");
// const cors = require("cors")
// const Reitti = require("./models/reittiModel");
// const dotenv = require('dotenv').config() 	//.env tiedostolle johon voi kerätä ympäristömuuttujat / nyt sisältää jwt:n salaisen avaimen YT(11)
// // const port = process.env.PORT || 5000 yt1 13.00		
// const connectDB = require('./config/db')								

// connectDB()

// let app = express();

// //middleware = funtiot jotka toimii req.res. pyynnön sisällä
// app.use(express.json());
// app.use(express.urlencoded({extended: false}))
// app.use(cors())

// app.use('/api/reitit', require('./routes/reittiRoute')) //nimi muutettu apiroute.js:sta 30.10
// app.use('/api/users', require('./routes/userRoute')) //lisätty userRoute 25.10.

// // Serve frontend
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../frontend/build')));

//   app.get('*', (req, res) =>
//     res.sendFile(
//       path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
//     )
//   );
// } else {
//   app.get('/', (req, res) => res.send('Please set to production'));
// }

// let port = process.env.PORT || 3001;

// const mongo_user = process.env.MONGODB_USERNAME;
// const mongo_password = process.env.MONGODB_PASSWORD;
// //const mongo_url = process.env.MONGODB_URL;



// // mongoose.connect(`mongodb+srv://${mongo_user}:${mongo_password}@opiframeprojekti.tvrncei.mongodb.net/reittiopasApp?retryWrites=true&w=majority`).then(
// // 	() => console.log("Connected to mongodb"),
// // 	(err) => console.log("Failed to connect. Reason",err)
// // );

// //mongoose.set("toJSON",{virtuals:true});




// app.listen(port);

// console.log("Running in port", port);
