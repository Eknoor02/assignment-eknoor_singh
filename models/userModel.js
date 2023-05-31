const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please enter your name"],
        maxLength: [30, "name should not exceed 30 characters"],
        minLength: [4, "name should not be less than 4 characters"],
    },
    email: {
        type: String,
        required: [true, "please enter your Email"],
        unique: true,
        validate: [validator.isEmail, "please enter a valid email"],
    },
    password: {
        type: String,
        required: [true, "please enter your password"],
        minLength: [8, "password should not  be less than 8 characters"],
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})

//hash the password
userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        next()
    }

    this.password = await bcrypt.hash(this.password, 10)
})

// JWT token
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES
    })
}

// compare password
userSchema.methods.comparePassword = async function (yourPassword) {
    return await bcrypt.compare(yourPassword, this.password)
}



module.exports = mongoose.model("User", userSchema)