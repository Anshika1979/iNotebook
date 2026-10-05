const mongoose = require('mongoose'); //Import Mongoose
const mongoURI = "mongodb://localhost:27017/" //MongoDB connection URL as mongoDB(mongoDB protocol) localhost(mongoDB is running on your own computer) 27017(default mongoDB port)

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