const mongoose = require('mongoose')

const connectToMongoDB = () =>  {

    const dbURI = process.env.MONGO_URI
    console.log(dbURI)

    mongoose
        .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Connected to MongoDB successfully!")
        })
        .catch((err) => {   
            console.log('An error occured while connecting to MongoDB', err)
        })
}

module.exports = connectToMongoDB