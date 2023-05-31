const express = require('express');
const app = express();
const cookieParser = require("cookie-parser")

app.use(express.json())
app.use(cookieParser())

// route imports
const articles = require("./routes/articleRoute.js")
const user = require("./routes/userRoutes.js")

//route path
app.use("/api", articles)
app.use("/api", user)

module.exports = app