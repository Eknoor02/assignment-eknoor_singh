const app = require('./app')

const dotenv = require("dotenv")
const connectDatabase = require("./configs/database")

//config
dotenv.config({ path: "backend_assignment/configs/config.env" })

// connecting database
connectDatabase();

app.listen(process.env.PORT, () => {
    console.log(`server is listening on PORT: ${process.env.PORT}`)
})