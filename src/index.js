const app = require('./app')

const connectToMongoDB = require('./connections/mongodb')

const PORT = process.env.PORT ?? 3000

let expressServer = null;


const start = () => {
    connectToMongoDB()
    expressServer = app.listen(PORT, () => {
        console.log("Listening on port", PORT)
    });
    
}

start()