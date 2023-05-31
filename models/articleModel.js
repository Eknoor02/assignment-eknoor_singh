const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "please enter article title"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "please enter article description"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("article", articleSchema)