const mongoose = require("mongoose")

const connectDatabase = () => {
    mongoose.connect(process.env.MONGO_URI).then((data) => {
        console.log(`MongoDb connected with server: ${data.connection.host}`)
    }).catch((err) => {
        console.log(err)
    })
}

module.exports = connectDatabase