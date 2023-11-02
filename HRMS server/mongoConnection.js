const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config()

const mongoURI =process.env.MONGODB_URI

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

console.log("Connected to Database")