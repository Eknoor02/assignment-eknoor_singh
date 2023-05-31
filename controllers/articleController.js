const Article = require("../models/articleModel.js")



//create article
exports.createarticle = async (req, res, next) => {

    try {
        const { title, description } = req.body()

        const article = await article.create({
            title, description
        })
        res.status(200).json({
            success: true,
            article,
            message: "article creted successfully"
        })
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err
        })
    }
}

//get articles
exports.getAllarticles = async (req, res) => {
    try {
        const articles = await Article.find()
        res.status(200).json({
            success: true,
            articles
        })
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err
        })
    }
}