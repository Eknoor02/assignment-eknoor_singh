const User = require("../models/userModel.js")
const sendToken = require("../utils/jwtToken.js")

// create new user
exports.registerUser = async (req, res, next) => {
    const { name, email, password } = req.body
    try {
        const newUser = await User.create({
            name,
            email,
            password
        })

        sendToken(newUser, 201, res)
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: "no user registerd"
        })
    }
}

// login user
exports.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            res.status(400).json({ message: "credentials do not exist" })
        }

        const user = await User.findOne({ email }).select("+password")

        if (!user) {
            res.status(401).json({ message: "email do not match" })
        }
        const isPassowrdMatched = await user.comparePassword(password)

        if (!isPassowrdMatched) {
            res.status(401).json({ message: "password do not match" })
        }

        sendToken(user, 200, res)
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: "no user login"
        })
    }
}

// update user profile
exports.updateUserProfile = async (req, res, next) => {
    const { name, email } = req.body

    const newUserData = { name, email }
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: true
    })

    res.status(200).json({
        success: true,
        user
    })
}


