const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const mongo_user = process.env.MONGODB_USERNAME;
    const mongo_password = process.env.MONGODB_PASSWORD;
    
    const conn = await mongoose.connect(`mongodb+srv://${mongo_user}:${mongo_password}@opiframeprojekti.tvrncei.mongodb.net/reittiopasApp?retryWrites=true&w=majority`)
    //const conn = await mongoose.connect(process.env.MONGO_URL)

    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(error);
    process.exit(1)
  }
}

module.exports = connectDB

/*
// tää on LearnMernistä
const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL)

    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(error);
    process.exit(1)
  }
}

module.exports = connectDB
*/