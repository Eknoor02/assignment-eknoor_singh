const jwt = require("jsonwebtoken")
const User = require("../models/userModel.js")

const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies

    if (!token) {
        return next(res.status(401).json({ message: "no token" }))
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET)

    // here user all the data will be saved from USER model
    req.user = await User.findById(decodedData.id)

    next();


}

module.exports = isAuthenticated