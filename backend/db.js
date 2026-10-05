const mongoose = require('mongoose');

require('dotenv').config(); //require dotenv to use environment variables from .env file
const mongoURI = process.env.MONGO_URI; //MongoDB connection URL from environment variables

const connectToMongo = async () => { //create connection function
    try{ //try attempts the connection, if something goes wroong , catch handles the error
        await
    mongoose.connect(mongoURI);
        console.log("Connected to Mongo Successfully"); 
    } 
    catch (error) {
        console.log("MongoDB connection error:", error);
    }
};


module.exports = connectToMongo; //this exports the function so that you can use it in another file.