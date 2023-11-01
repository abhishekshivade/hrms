// mongoConnection.js

const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config()

// Replace '<password>' with your actual password in the MongoDB Atlas connection string
// const mongoURI = "mongodb+srv://abhishekshivade:Abhi%400037@hrms.xgr7jhd.mongodb.net/employeedatabase";
const mongoURI =process.env.MONGODB_URI

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

console.log("Connected to Database")